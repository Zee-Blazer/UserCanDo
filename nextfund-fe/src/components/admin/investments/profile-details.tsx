
interface Props {
    name?: string,
}

const ProfileDetails = ({ name }: Props) => {

    return (
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
                {name ? name.charAt(0) : "OS"}
            </div>
            <p className="text-xl font-semibold">{name || "Oladipo Sodipo"}</p>
        </div>
    )
}

export default ProfileDetails;
