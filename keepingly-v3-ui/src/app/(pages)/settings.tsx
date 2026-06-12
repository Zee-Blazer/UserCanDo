"use client";
import usePostRequest from "@/api/hooks/usePost";
import DisplayImage from "@/components/Dashboard/propertyDetails/propertyImage";
import Profileimage from "@/components/Dashboard/settings/profileimage";
import ProfileSettings from "@/components/Dashboard/settings/profileSettings";
import SecuritySettings from "@/components/Dashboard/settings/securitySettings";
import SettingsHeader from "@/components/Dashboard/settings/settingsHeader";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { AuthorisedUserProps, UserProps } from "@/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppContext } from "../context";
import UploadDocumentModal from "@/components/Dashboard/documents/uploadDocumentModal";
import AuthorisedUser from "@/components/Dashboard/settings/authorisedUser";
import useApiRequest from "@/api/hooks/useApiRequest";

const SettingsPage = () => {
	const { profileUser } = useAuthSelector();
	const { authorisedUser } = useDashboardSelector();
	const { getUser, getAuthorisedUser } = useAppContext();
	const [profileData, setProfileData] = useState<UserProps | null>(profileUser);
	const [authorisedUserData, setAuthorisedUserData] =
		useState<AuthorisedUserProps | null>(authorisedUser);
	const {
		loading: isPhotoUploading,
		postRequest: uploadProfileImageReq,
		isSuccess: isProfilePhotoUploaded,
	} = usePostRequest();

	const {
		isSuccess: isProfileUpdated,
		loading: isProfileUpdating,
		postRequest: updateProfileReq,
	} = usePostRequest();

	const {
		isSuccess: isImageRemoved,
		loading: isImageRemoving,
		postRequest: removeImageReq,
	} = usePostRequest();

	const {
		loading: isAuthorisedUserUpdating,
		postRequest: updateAuthorisedUserReq,
	} = useApiRequest();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEdit, setisEdit] = useState(false);
	const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

	const removeProfilePhoto = async () =>
		await removeImageReq("/delete_profile_picture", {});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setProfileData({ ...profileData, [e.target.name]: e.target.value });
	};

	const handleAuthorisedUserInputChange = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		setAuthorisedUserData({
			...authorisedUserData,
			[e.target.name]: e.target.value,
		});
	};

	const updateAuthorisedUser = async () => {
		updateAuthorisedUserReq(
			"/add_authorized_user",
			authorisedUserData,
			(_, isSuccess) => {
				if (isSuccess) {
					getAuthorisedUser();
				}
			}
		);
	};

	const updateProfilePhoto = async () => {
		let formData = new FormData();
		formData.append("profile_image", profilePhoto as File);
		uploadProfileImageReq("/update_profile_image", formData);
	};

	const updateProfile = async () =>
		updateProfileReq("/update_user_profile", profileData);

	useEffect(() => {
		if (isProfileUpdated || isProfilePhotoUploaded || isImageRemoved) {
			setisEdit(false);
			getUser();
			setIsModalOpen(false);
			if (isImageRemoved) {
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}
		}
	}, [isProfileUpdated, isProfilePhotoUploaded, isImageRemoved]);

	return (
		<div className='p-4'>
			<SettingsHeader deleteAction={() => {}} />
			<div className='flex flex-col md:flex-row gap-4'>
				<div className='w-full md:max-w-[340px]'>
					<DisplayImage
						loading={isPhotoUploading || isImageRemoving}
						removePhoto={removeProfilePhoto}
						openModal={() => setIsModalOpen(true)}
						imageUrl={profileUser?.profile_url ?? ""}
						label='Upload Profile Image'
					/>
				</div>
				<div className='w-full'>
					<ProfileSettings
						profileData={profileData}
						makeEditable={() => setisEdit(true)}
						action={updateProfile}
						role={profileUser?.role || ""}
						handleInputChange={handleInputChange}
						loading={isProfileUpdating}
					/>
					<AuthorisedUser
						authorisedUserData={authorisedUserData}
						handleInputChange={handleAuthorisedUserInputChange}
						loading={isAuthorisedUserUpdating}
						action={updateAuthorisedUser}
					/>
					<SecuritySettings />
					<UploadDocumentModal
						open={isModalOpen}
						closeModal={() => setIsModalOpen(false)}
						disabled
						disableSubCategory
						hideCategory
						category=''
						subCategory=''
						file={profilePhoto}
						setFile={setProfilePhoto}
						handleUpload={updateProfilePhoto}
						loading={isPhotoUploading}
						handleOpen={() => setIsModalOpen(!isModalOpen)}
					/>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
