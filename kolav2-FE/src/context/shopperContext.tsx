"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useDispatch } from "react-redux";
import {
  setCategories,
  setVendors,
  setNewDeals,
  setOrders,
  setBNPLOrders,
  setFavouriteCartItems,
  setOrderMessages,
} from "@/Redux/features/shopperSlice";
import useApiRequest from "@/api/hooks/useApiRequest";
import { generateUUID, getUserLocation } from "@/utils/helpers";
import { useAuthSelector } from "@/Redux/selectors";
import { setCartItems } from "@/Redux/features/shopperSlice";
import { initialCheckoutForm } from "@/utils/initialStates";
import { useRouter } from "next/navigation";
import { logUserOut } from "@/Redux/features/authSlice";

interface ShopperContextType {
  // Loading states
  isProductsLoading: boolean;
  isVendorsLoading: boolean;
  isNewDealsLoading: boolean;
  isCategoriesLoading: boolean;
  isTrendingLoading: boolean;
  isPopularLoading: boolean;
  isProductLoading: boolean;
  isAddingToCart: boolean;
  isCartLoading: boolean;
  isFavoritesLoading: boolean;
  isOrderMessagesLoading: boolean;
  isSendingMessage: boolean;
  creditPaymentLoading: boolean;
  // Data states
  trendingProducts: ProductResponse;
  popularProducts: ProductResponse;
  product: Product | null;
  isNotificationEnabling: boolean;

  // Functions
  getNewDeals: (page?: number, limit?: number) => void;
  getCategoryProducts: (
    categoryId: string,
    page?: number,
    limit?: number
  ) => void;
  getProductById: (orderId: string) => void;
  creditPayment: (paymentId: string, callback?: () => void) => void;
  addToCart: (
    productId: string,
    quantity: number,
    type?: "cart" | "favourite"
  ) => Promise<void>;
  updateCartItemQuantity: (
    productId: string,
    quantity: number
  ) => Promise<void>;
  removeFromCart: (cartItemId: string, callback?: () => void) => Promise<void>;
  removeFavoriteItem: (
    favoriteItemId: string,
    callback?: () => void
  ) => Promise<void>;
  removeVendorItems: (vendorId: string, callback: () => void) => Promise<void>;
  removeVendorFavouriteItems: (
    vendorId: string,
    callback: () => void
  ) => Promise<void>;
  isCartDeleting: boolean;
  updateCartQuantity: (
    cartItemId: string,
    type: "increment" | "decrement",
    amount?: number,
    callback?: () => void
  ) => Promise<void>;
  isUpdatingCart: boolean;
  checkoutForm: CheckoutFormProps;
  setCheckoutForm: Dispatch<SetStateAction<CheckoutFormProps>>;
  checkout: (id: string, callback?: (data: any) => void) => Promise<void>;
  isCheckingOut: boolean;
  getOrderMessages: (order_id: string, receiver_id: string) => Promise<void>;
  sendOrderMessage: (
    messageData: { message: string; order_id: string; receiver_id: string },
    callback?: () => void
  ) => Promise<void>;
  handleToggleNotification: (enabled: boolean, cb: () => void) => void;
  getNotificationStatus: () => Promise<void>;
  notificationStatus: boolean;
}

const ShopperContext = createContext<ShopperContextType | undefined>(undefined);

const ShopperProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const { loading: isProductsLoading, getRequest: getProductsReq } =
    useApiRequest();
  const { getRequest: getCategoriesReq, loading: isCategoriesLoading } =
    useApiRequest();
  const { loading: isVendorsLoading, getRequest: getVendorsReq } =
    useApiRequest();
  const { loading: isNewDealsLoading, getRequest: getNewDealsReq } =
    useApiRequest();
  const { loading: isTrendingLoading, getRequest: getTrendingReq } =
    useApiRequest();
  const { loading: isPopularLoading, getRequest: getPopularReq } =
    useApiRequest();
  const { loading: isProductLoading, getRequest: getProductReq } =
    useApiRequest();
  const { loading: isAddingToCart, postRequest: postCartReq } = useApiRequest();
  const { loading: isCartLoading, getRequest: getCartReq } = useApiRequest();
  const { loading: isFavoritesLoading, getRequest: getFavoritesReq } =
    useApiRequest();
  const { deleteRequest, loading: isCartDeleting } = useApiRequest();
  const { loading: isUpdatingCart, postRequest: updateCartReq } =
    useApiRequest();
  const { loading: isCheckingOut, postRequest: checkoutReq } = useApiRequest();
  const { getRequest: getOrdersReq, loading: isOrdersLoading } =
    useApiRequest();
  const { getRequest: fetchBNPLOrders, loading: isBNPLOrdersLoading } =
    useApiRequest();
  const { getRequest: fetchOrderMessages, loading: isOrderMessagesLoading } =
    useApiRequest();

  const { postRequest: postOrderMessage, loading: isSendingMessage } =
    useApiRequest();

  const { postRequest: installmentalPayment, loading: creditPaymentLoading } =
    useApiRequest();

  const { loading: isNotificationEnabling, patchRequest: toggleNotification } =
    useApiRequest();

  const {
    getRequest: getNotificationStatus,
    loading: isNotificationStatusLoading,
  } = useApiRequest();

  const [notificationStatus, setNotificationStatus] = useState(false);

  const [trendingProducts, setTrendingProducts] = useState<ProductResponse>({
    count: 0,
    limit: 50,
    page: 1,
    products: [],
  });
  const [popularProducts, setPopularProducts] = useState<ProductResponse>({
    count: 0,
    limit: 50,
    page: 1,
    products: [],
  });
  const [product, setProduct] = useState<Product | null>(null);
  const [checkoutForm, setCheckoutForm] =
    useState<CheckoutFormProps>(initialCheckoutForm);

  const { loginData } = useAuthSelector();

  const getAllCategories = async () => {
    await getCategoriesReq("/get_all_categories", (data) => {
      if (data.is_success) {
        dispatch(setCategories(data.payload));
      }
    });
  };

  const getAllVendors = async () => {
    try {
      const location = await getUserLocation().catch(() => ({
        latitude: 0,
        longitude: 0,
      }));

      await getVendorsReq(
        `/all_vendors?latitude=${location.latitude}&longitude=${location.longitude}`,
        (data) => {
          if (data.is_success) {
            dispatch(setVendors(data.payload));
          }
        }
      );
    } catch (error) {
      await getVendorsReq("/all_vendors?latitude=0&longitude=0", (data) => {
        if (data.is_success) {
          dispatch(setVendors(data.payload));
        }
      });
    }
  };

  const getNewDeals = async (page: number = 1, limit: number = 10) => {
    await getNewDealsReq(`/new_deals?page=${page}&limit=${limit}`, (data) => {
      if (data.is_success) {
        dispatch(setNewDeals(data.payload));
      }
    });
  };

  const getCategoryProducts = async (
    categoryId: string,
    page: number = 1,
    limit: number = 50
  ) => {
    await getTrendingReq(
      `/shop_by_trending/${categoryId}?page=${page}&limit=${limit}`,
      (data) => {
        if (data.is_success) {
          setTrendingProducts(data.payload);
        } else {
          setTrendingProducts({
            count: 0,
            limit: 50,
            page: 1,
            products: [],
          });
        }
      }
    );

    await getPopularReq(
      `/shop_by_popular/${categoryId}?page=${page}&limit=${limit}`,
      (data) => {
        if (data.is_success) {
          setPopularProducts(data.payload);
        } else {
          setPopularProducts({
            count: 0,
            limit: 50,
            page: 1,
            products: [],
          });
        }
      }
    );
  };

  const getProductById = async (productId: string) => {
    await getProductReq(`/product_by_id?product_id=${productId}`, (data) => {
      if (data.is_success) {
        setProduct(data.payload);
      }
    });
  };

  const getCartId = useCallback(() => {
    let cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      cartId = generateUUID();
      localStorage.setItem("cart_id", cartId);
    }
    return cartId;
  }, []);

  const getFavoriteId = useCallback(() => {
    let favoriteId = localStorage.getItem("favorite_id");
    if (!favoriteId) {
      favoriteId = generateUUID();
      localStorage.setItem("favorite_id", favoriteId);
    }
    return favoriteId;
  }, []);

  const addToCart = async (
    productId: string,
    quantity: number,
    type: "cart" | "favourite" = "cart"
  ): Promise<void> => {
    const id = type === "cart" ? getCartId() : getFavoriteId();
    const userId = loginData?.user_id;

    const endpoint = userId
      ? `/shopper/cart/${id}?type=${type}&user_id=${userId}`
      : `/shopper/cart/${id}?type=${type}`;

    const payload = {
      items: [
        {
          product_id: productId,
          quantity: quantity,
        },
      ],
    };

    await postCartReq(endpoint, payload, (data) => {
      if (data.is_success) {
        if (type === "cart") {
          getCartItems();
        } else {
          getFavouriteCartItems();
        }
      }
    });
  };

  const getCartItems = async () => {
    const cartId = getCartId();

    await getCartReq(`/shopper/cart/${cartId}`, (data) => {
      if (data.is_success) {
        dispatch(setCartItems(data.payload));
      }
    });
  };

  const getFavouriteCartItems = async () => {
    const favoriteId = getFavoriteId();

    await getFavoritesReq(
      `/shopper/cart/${favoriteId}?type=favourite`,
      (data) => {
        if (data.is_success) {
          dispatch(setFavouriteCartItems(data.payload));
        }
      }
    );
  };

  const getOrders = async () => {
    await getOrdersReq("/orders", (data) => {
      if (data.is_success) {
        dispatch(setOrders(data.payload));
      }
    });
  };

  const getBNPLOrders = async () => {
    await fetchBNPLOrders("/bnpl_orders", (data) => {
      if (data.is_success) {
        dispatch(setBNPLOrders(data.payload));
      }
    });
  };

  const updateCartItemQuantity = async (
    productId: string,
    quantity: number
  ) => {
    const cartId = getCartId();
    const endpoint = `/shopper/cart/${cartId}/update`;

    await postCartReq(
      endpoint,
      {
        product_id: productId,
        quantity: quantity,
      },
      (data) => {
        if (data.is_success) {
          getCartItems();
        }
      }
    );
  };

  const removeFromCart = async (cartItemId: string, callback?: () => void) => {
    await deleteRequest(`/delete?cart_item_id=${cartItemId}`, (data) => {
      if (data.is_success) {
        getCartItems();
        getFavouriteCartItems();
        callback && callback();
      }
    });
  };

  const creditPayment = async (paymentId: string, callback?: () => void) => {
    await installmentalPayment(
      `/bnpl/checkout/?bnpl_id=${paymentId}`,
      {},
      (data) => {
        if (data.is_success) {
          if (data?.payload?.data?.checkoutUrl) {
            window.open(data.payload.data.checkoutUrl, "_blank");
          } else if (data?.payload?.data?.checkoutDirectUrl) {
            window.open(data.payload.data.checkoutDirectUrl, "_blank");
          }

          getCartItems();

          callback && callback();
        }
      }
    );
  };

  const removeFavoriteItem = async (
    favoriteItemId: string,
    callback?: () => void
  ) => {
    await deleteRequest(
      `/remove_from_favourite?cart_item_id=${favoriteItemId}`,
      (data) => {
        if (data.is_success) {
          getFavouriteCartItems();
          getCartItems();
          callback && callback();
        }
      }
    );
  };

  const removeVendorItems = async (vendorId: string, callback: () => void) => {
    await deleteRequest(`/bulk/delete?vendor_id=${vendorId}`, (data) => {
      if (data.is_success) {
        getCartItems();
        getFavouriteCartItems();
        callback();
      }
    });
  };

  const removeVendorFavouriteItems = async (
    vendorId: string,
    callback: () => void
  ) => {
    await deleteRequest(
      `/bulk/favourite/delete/?vendor_id=${vendorId}`,
      (data) => {
        if (data.is_success) {
          getFavouriteCartItems();
          getCartItems();
          callback();
        }
      }
    );
  };

  const updateCartQuantity = async (
    cartItemId: string,
    type: "increment" | "decrement",
    amount?: number,
    callback?: () => void
  ) => {
    let url = `/cart/quantity_update?type=${type}&cart_item_id=${cartItemId}`;
    if (typeof amount === "number") {
      url += `&amount=${amount}`;
    }
    await updateCartReq(url, {}, (data) => {
      if (data.is_success) {
        getCartItems();
        callback && callback();
      }
    });
  };

  const checkout = async (id: string, callback?: (data: any) => void) => {
    const filteredForm = Object.entries(checkoutForm).reduce(
      (acc, [key, value]) => {
        if (
          value !== "" &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          acc[key as keyof CheckoutFormProps] = value;
        }
        return acc;
      },
      {} as Partial<CheckoutFormProps>
    );

    await checkoutReq(
      `/shopper/checkout/`,
      { ...filteredForm, cart_id: id },
      (data) => {
        if (data.is_success) {
          setCheckoutForm(initialCheckoutForm);
          localStorage.removeItem("cart_id");
          localStorage.removeItem("favorite_id");
          dispatch(setCartItems([]));
          dispatch(setFavouriteCartItems([]));
          getOrders();
          getBNPLOrders();
          callback?.(data);
        } else {
          //@ts-ignore
          if (data.code === "token_not_valid") {
            dispatch(logUserOut());
          }
        }
      }
    );
  };

  const getOrderMessages = async (order_id: string, receiver_id: string) => {
    await fetchOrderMessages(
      `/messaging/${order_id}/${receiver_id}`,
      (data) => {
        if (data?.payload) {
          dispatch(setOrderMessages(data.payload));
        } else {
          dispatch(setOrderMessages([]));
        }
      }
    );
  };

  const fetchNotificationStatus = async () => {
    await getNotificationStatus("/notifications/status", (data) => {
      if (data.is_success) {
        setNotificationStatus(data.payload.is_notifications_enabled);
      }
    });
  };

  const handleToggleNotification = async (enabled: boolean, cb: () => void) => {
    await toggleNotification("/notifications/toggle", (data: any) => {
      if (data.is_success) {
        setNotificationStatus(enabled);
        cb();
      }
    });
  };

  const sendOrderMessage = async (
    messageData: { message: string; order_id: string; receiver_id: string },
    callback?: () => void
  ) => {
    await postOrderMessage(`/messaging`, messageData, (data) => {
      if (!data.is_success) return;

      getOrderMessages(messageData.order_id, messageData.receiver_id);
      callback?.();
    });
  };

  // Load data on auth
  const loadAuthData = () => {
    if (loginData?.access_token) {
      getOrders();
      getBNPLOrders();
      fetchNotificationStatus();
    }
  };

  const loadData = () => {
    getAllCategories();
    getAllVendors();
    getNewDeals();
    getCartItems();
    getFavouriteCartItems();
  };

  useEffect(() => {
    loadData();
    loadAuthData();
  }, [loginData?.access_token]);

  const value: ShopperContextType = {
    isProductsLoading,
    isVendorsLoading,
    isNewDealsLoading,
    isCategoriesLoading,
    isTrendingLoading,
    isPopularLoading,
    isProductLoading,
    isAddingToCart,
    isCartLoading,
    isFavoritesLoading,
    isOrderMessagesLoading,
    isSendingMessage,
    trendingProducts,
    popularProducts,
    product,
    getNewDeals,
    getCategoryProducts,
    getProductById,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    removeFavoriteItem,
    removeVendorItems,
    removeVendorFavouriteItems,
    isCartDeleting,
    updateCartQuantity,
    isUpdatingCart,
    checkoutForm,
    setCheckoutForm,
    checkout,
    isCheckingOut,
    getOrderMessages,
    sendOrderMessage,
    isNotificationEnabling,
    handleToggleNotification,
    notificationStatus,
    creditPayment,
    creditPaymentLoading,
    getNotificationStatus: fetchNotificationStatus,
  };

  return (
    <ShopperContext.Provider value={value}>{children}</ShopperContext.Provider>
  );
};

export const useShopper = () => {
  const context = useContext(ShopperContext);
  if (context === undefined) {
    throw new Error("useShopper must be used within a ShopperProvider");
  }
  return context;
};

export default ShopperProvider;
