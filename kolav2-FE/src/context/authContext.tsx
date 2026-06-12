"use client";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  buyerSlides,
  creditLimitAssessmentSlides,
  shopperSaleSlides,
  slides,
  slides2,
} from "../app/create-account/slides";
import {
  initialAccountDetails,
  initialBusinessProfileState,
  initialCreditLimitForm,
  initialLoginDetails,
  initialPhoneNumberCodeDetails,
  initialProfileDetails,
  initialResetPasswordDetails,
  initialSaleState,
  initialShopperProfile,
  initialShopperSaleState,
  initialAgentOrderState,
} from "@/utils/initialStates";
import { ROUTES } from "@/constants/routes";
import { useDispatch } from "react-redux";
import { logUserIn, logUserOut } from "@/Redux/features/authSlice";
import useApiRequest from "@/api/hooks/useApiRequest";
import { useAppContext } from "@/app/appContext";
import { setUserProfile } from "@/Redux/features/dashboardSlice";
import { clearAuthToken, setAuthToken } from "@/utils/auth";
import { useAuthSelector } from "@/Redux/selectors";

interface AuthContextType {
  nextSlide: () => void;
  prevSlide: () => void;
  currentSlides: ReactNode[];
  activeSlideIndex: number;
  setActiveSlideIndex: Dispatch<SetStateAction<number>>;
  nextBusinessSlide: () => void;
  skipToSupplierTypeSlide: () => void;
  createAccountData: CreateAccountProps;
  setCreateAccountData: Dispatch<SetStateAction<CreateAccountProps>>;
  createAccount: () => void;
  verifyOtp: (otp: string) => void;
  isAccountCreating: boolean;
  isOtpVerifying: boolean;
  isOtpResending: boolean;
  resendOtp: (cb: () => void) => void;
  resetPassword: (cb: () => void) => void;
  loginInputDetails: LoginDetailsProps;
  setLoginInputDetails: Dispatch<SetStateAction<LoginDetailsProps>>;
  handleLogin: (callback?: () => void) => void;
  isLoggingIn: boolean;
  mobileNumberDetails: PhoneNumberCodeProps;
  setMobileNumberDetails: Dispatch<SetStateAction<PhoneNumberCodeProps>>;
  isPassReseting: boolean;
  userProfileInputs: CreateProfileProps;
  setUserProfileInputs: Dispatch<SetStateAction<CreateProfileProps>>;
  handleProfileInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBusinessInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isProfileCreating: boolean;
  createProfile: () => void;
  resetPasswordInputs: ResetPasswordProps;
  setResetPasswordInputs: Dispatch<SetStateAction<ResetPasswordProps>>;
  setNewUserPassword: (id: string) => void;
  isResetting: boolean;
  businessProfileInputs: CreateBusinessProps;
  setBusinessProfileInputs: Dispatch<SetStateAction<CreateBusinessProps>>;
  setBusinessLogo: Dispatch<SetStateAction<File | null>>;
  businessLogo: File | null;
  handleCreateBusiness: () => void;
  isBusinessCreating: boolean;
  nextShopperSaleSlide: () => void;
  nextAgentRequestSlide: () => void;
  handleShopperSaleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  shopperProfileSaleInputs: CreateShopperSaleProps;
  setShopperProfileSaleInputs: Dispatch<SetStateAction<CreateSaleProps>>;
  shopperProfileInputs: CreateShopperProps;
  setShopperProfileInputs: Dispatch<SetStateAction<CreateShopperProps>>;
  handleShopperProfileInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  createShopper: () => void;
  isShopperCreating: boolean;
  prevCreditLimitSlide: () => void;
  activeCreditLimitSlideIndex: number;
  setActiveCreditLimitSlideIndex: Dispatch<SetStateAction<number>>;
  creditLimitFormInputs: CreditLimitFormProps;
  setCreditLimitFormInputs: Dispatch<SetStateAction<CreditLimitFormProps>>;
  handleCreditLimitFormInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nextCreditLimitAssessmentSlide: () => void;
  handleAgentOrderInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setAgentOrderInputs: Dispatch<SetStateAction<AgentOrderInputProps>>;
  agentOrderInputs: AgentOrderInputProps;

  selectedProducts: Product[];
  setSelectedProducts: Dispatch<SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  toggleProduct: (product: Product) => void;
  resetSalesRequestState: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const { loginData } = useAuthSelector();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeCreditLimitSlideIndex, setActiveCreditLimitSlideIndex] =
    useState(0);
  const [createAccountData, setCreateAccountData] =
    useState<CreateAccountProps>({
      ...initialAccountDetails,
      use_case: "vendor",
    });
  const [loginInputDetails, setLoginInputDetails] =
    useState<LoginDetailsProps>(initialLoginDetails);
  const [mobileNumberDetails, setMobileNumberDetails] =
    useState<PhoneNumberCodeProps>(initialPhoneNumberCodeDetails);
  const [userProfileInputs, setUserProfileInputs] =
    useState<CreateProfileProps>(initialProfileDetails);
  const [resetPasswordInputs, setResetPasswordInputs] =
    useState<ResetPasswordProps>(initialResetPasswordDetails);
  const [businessProfileInputs, setBusinessProfileInputs] =
    useState<CreateBusinessProps>(initialBusinessProfileState);
  const [shopperProfileSaleInputs, setShopperProfileSaleInputs] =
    useState<CreateShopperSaleProps>(initialShopperSaleState);
  const [businessLogo, setBusinessLogo] = useState<File | null>(null);
  const [currentSlides, setCurrentSlides] = useState(slides);
  const [shopperProfileInputs, setShopperProfileInputs] =
    useState<CreateShopperProps>(initialShopperProfile);
  const [creditLimitFormInputs, setCreditLimitFormInputs] =
    useState<CreditLimitFormProps>(initialCreditLimitForm);
  const [agentOrderInputs, setAgentOrderInputs] =
    useState<AgentOrderInputProps>(initialAgentOrderState);

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const resetSalesRequestState = () => {
    setShopperProfileSaleInputs(initialShopperSaleState);
    setAgentOrderInputs(initialAgentOrderState);
    setSelectedProducts([]);
  };

  const dispatch = useDispatch();
  const { getCountryRegions, getRegionCities } = useAppContext();
  const { loading: isProfileFetching, getRequest } = useApiRequest();

  const { loading: isAccountCreating, postRequest: createAccountReq } =
    useApiRequest();

  const { loading: isPassReseting, postRequest: forgotPasswordReq } =
    useApiRequest();

  const { loading: isOtpVerifying, postRequest: verifyOtpReq } =
    useApiRequest();

  const { loading: isOtpResending, postRequest: resendOtpReq } =
    useApiRequest();

  const { loading: isProfileCreating, postRequest: createProfileReq } =
    useApiRequest();

  const { loading: isBusinessCreating, postRequest: createBusiness } =
    useApiRequest();

  const { loading: isLoggingIn, postRequest: loginReq } = useApiRequest();

  const { loading: isResetting, postRequest: resetPasswordReq } =
    useApiRequest();

  const { loading: isShopperCreating, postRequest: createShopperReq } =
    useApiRequest();

  const handleShopperProfileInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setShopperProfileInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreditLimitFormInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setCreditLimitFormInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSetCreateAccountData = (
    data: SetStateAction<CreateAccountProps>
  ) => {
    const newData = typeof data === "function" ? data(createAccountData) : data;

    if (newData.use_case !== createAccountData.use_case) {
      switch (newData.use_case) {
        case "vendor":
          setCurrentSlides(slides);
          break;
        case "buyer":
          setCurrentSlides(buyerSlides);
          break;
        case "both":
          // Default to vendor flow, but you could create a combined flow
          setCurrentSlides(slides);
          break;
        default:
          setCurrentSlides(slides);
      }
      // Reset slide index when changing flow
      setActiveSlideIndex(0);
    }

    setCreateAccountData(newData);
  };

  const handleProfileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserProfileInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBusinessInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusinessProfileInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAgentOrderInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgentOrderInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShopperSaleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShopperProfileSaleInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createAccount = async () =>
    await createAccountReq("/signup", createAccountData, (data) => {
      if (data.is_success) {
        nextSlide();
      }
    });

  const createShopper = async () => {
    await createShopperReq(
      "/shopper/create",
      { ...shopperProfileInputs, use_case: "buyer" },
      (data) => {
        if (data.is_success) {
          nextSlide();
        }
      }
    );
  };

  useEffect(() => {
    if (businessProfileInputs.country) {
      getCountryRegions(businessProfileInputs.country);
    }
  }, [businessProfileInputs.country]);

  useEffect(() => {
    if (businessProfileInputs.country && businessProfileInputs.region) {
      getRegionCities(
        businessProfileInputs.country,
        businessProfileInputs.region
      );
    }
  }, [businessProfileInputs.region]);

  const createProfile = async () => {
    const formData = new FormData();
    const body = {
      payload: JSON.stringify(userProfileInputs),
      file: userProfileInputs?.file,
    };
    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }
    await createProfileReq("/create_profile", formData, (data) => {
      if (data.is_success) {
        nextSlide();
      }
    });
  };

  const handleCreateBusiness = async () => {
    const formData = new FormData();
    const body = {
      payload: JSON.stringify(businessProfileInputs),
      business_logo: businessLogo,
    };
    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }
    await createBusiness("/create/business", formData, (data) => {
      if (data.is_success) {
        setBusinessProfileInputs(initialBusinessProfileState);
        nextBusinessSlide();
      }
    });
  };

  const verifyOtp = async (otp: string) => {
    await verifyOtpReq("/verify_otp", { token: otp }, (data) => {
      if (data.is_success) {
        setUserProfileInputs((prevState) => ({
          ...prevState,
          user_id: data.payload?.user_id?.user_id,
        }));
        router.push(
          `${ROUTES.createAccount}?user_id=${data.payload?.user_id?.user_id}`
        );
        nextSlide();
      }
    });
  };

  const handleLogin = async (callback?: () => void) => {
    try {
      await loginReq("/login", loginInputDetails, async (data) => {
        if (data.is_success) {
          setAuthToken(data.payload.access_token);
          dispatch(logUserIn(data.payload));

          try {
            const profilePromise = getRequest(
              "/view_profile",
              (profileData) => {
                if (profileData.is_success) {
                  dispatch(setUserProfile(profileData.payload));
                  callback?.();
                }
              }
            );

            await Promise.race([
              profilePromise,
              new Promise((_, reject) =>
                setTimeout(
                  () => reject(new Error("Profile fetch timeout")),
                  5000
                )
              ),
            ]);
          } catch (profileError) {
            callback?.();
          }
        }
      });
    } catch (error) {
      dispatch(logUserOut());
      clearAuthToken();
    }
  };

  const resetPassword = async (cb: () => void) => {
    await forgotPasswordReq(
      `/request_forgot_password?country_code=${mobileNumberDetails.country_code}&phone_number=${mobileNumberDetails.phone_number}`,
      mobileNumberDetails,
      (data) => {
        if (data.is_success) {
          router.push(
            `${ROUTES.resetPassword}?user_id=${data?.payload?.user_id}`
          );
          cb();
        }
      }
    );
  };

  const setNewUserPassword = async (id: string) => {
    await resetPasswordReq(
      "/reset_password",
      { ...resetPasswordInputs, user_id: id },
      (data) => {
        if (data.is_success) {
          router.push(ROUTES.login);
        }
      }
    );
  };

  const resendOtp = async (cb: () => void) => {
    await resendOtpReq(
      `/resend_activation_token`,
      {
        country_code: createAccountData.country_code,
        phone_number: createAccountData.phone_number,
      },
      (data) => {
        if (data.is_success) {
          cb();
        }
      }
    );
  };

  const nextSlide = () => {
    if (activeSlideIndex < currentSlides.length - 1) {
      setActiveSlideIndex((prevIndex) => prevIndex + 1);
    }
  };

  const nextBusinessSlide = () => {
    if (activeSlideIndex < slides2.length - 1) {
      setActiveSlideIndex((prevIndex) => prevIndex + 1);
    }
  };

  const nextShopperSaleSlide = () => {
    if (activeSlideIndex <= shopperSaleSlides.length - 1) {
      setActiveSlideIndex((prevIndex) => prevIndex + 1);
    }
  };

  const nextAgentRequestSlide = () => {
    if (activeSlideIndex < shopperSaleSlides.length - 1) {
      setActiveSlideIndex((prevIndex) => prevIndex + 1);
    }
  };

  const nextCreditLimitAssessmentSlide = () => {
    if (activeCreditLimitSlideIndex < creditLimitAssessmentSlides.length - 1) {
      setActiveCreditLimitSlideIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex((prevIndex) => prevIndex - 1);
    }
  };

  const skipToSupplierTypeSlide = () => {
    setActiveSlideIndex((prev) => prev + 2);
  };

  const prevCreditLimitSlide = () => {
    if (activeCreditLimitSlideIndex > 0) {
      setActiveCreditLimitSlideIndex((prevIndex) => prevIndex - 1);
    }
  };

  const value: AuthContextType = {
    nextSlide,
    prevSlide,
    skipToSupplierTypeSlide,
    currentSlides,
    activeSlideIndex,
    setActiveSlideIndex,
    createAccountData,
    setCreateAccountData: handleSetCreateAccountData,
    createAccount,
    isAccountCreating,
    isOtpVerifying,
    verifyOtp,
    isOtpResending,
    resendOtp,
    handleLogin,
    isLoggingIn,
    loginInputDetails,
    setLoginInputDetails,
    mobileNumberDetails,
    setMobileNumberDetails,
    isPassReseting,
    resetPassword,
    handleProfileInputChange,
    setUserProfileInputs,
    userProfileInputs,
    createProfile,
    isProfileCreating,
    resetPasswordInputs,
    setResetPasswordInputs,
    isResetting,
    setNewUserPassword,
    businessProfileInputs,
    handleBusinessInputChange,
    nextBusinessSlide,
    setBusinessProfileInputs,
    setBusinessLogo,
    businessLogo,
    handleCreateBusiness,
    isBusinessCreating,
    nextShopperSaleSlide,
    shopperProfileSaleInputs,
    handleShopperSaleInputChange,
    setShopperProfileSaleInputs,
    shopperProfileInputs,
    setShopperProfileInputs,
    handleShopperProfileInputChange,
    createShopper,
    isShopperCreating,
    nextCreditLimitAssessmentSlide,
    prevCreditLimitSlide,
    activeCreditLimitSlideIndex,
    setActiveCreditLimitSlideIndex,
    creditLimitFormInputs,
    setCreditLimitFormInputs,
    handleCreditLimitFormInputChange,
    handleAgentOrderInputChange,
    agentOrderInputs,
    setAgentOrderInputs,
    nextAgentRequestSlide,

    selectedProducts,
    setSelectedProducts,
    addProduct,
    removeProduct,
    toggleProduct,
    resetSalesRequestState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export default AuthProvider;
