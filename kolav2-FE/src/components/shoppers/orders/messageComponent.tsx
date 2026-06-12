import React, { useState, useEffect, useRef, useMemo } from "react";
import { CancelIcon, SendIcon } from "@/assets/svg";
import { HorizontalDivider } from "@/components/General/divider";
import { IMessage } from "@/types";
import { useShopperSelector } from "@/Redux/selectors";
import { useShopper } from "@/context/shopperContext";
import Message from "./message";
import VendorMessagingSelector from "./VendorMessagingSelector";

interface IMessageComponentProps {
  onClose: () => void;
  orderId?: string;
}

// Vendot type definition
interface Vendor {
  id: string;
  name: string;
  isOnline: boolean;
}

const MessageComponent = ({ onClose, orderId }: IMessageComponentProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [vendorsList, setVendorsList] = useState<Vendor[]>([]);
  const [showVendorSelector, setShowVendorSelector] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { orders, orderMessages } = useShopperSelector();
  const {
    getOrderMessages,
    isOrderMessagesLoading,
    sendOrderMessage,
    isSendingMessage,
  } = useShopper();

  const currentOrder = useMemo(
    () => orders.find((order) => order.id === orderId),
    [orderId, orders]
  );

  // Extract unique vendors from the current order
  useEffect(() => {
    if (!orderId || !currentOrder?.order_items?.length) return;

    const vendorsMap = new Map();

    for (const item of currentOrder.order_items) {
      if (!vendorsMap.has(item.business_user_id)) {
        vendorsMap.set(item.business_user_id, {
          id: item.business_user_id,
          name: item.business_name || "Vendor",
          isOnline: true,
        });
      }
    }

    const uniqueVendors = Array.from(vendorsMap.values());
    setVendorsList(uniqueVendors);
    if (uniqueVendors.length === 1) {
      setSelectedVendor(uniqueVendors[0]);
      setShowVendorSelector(false);
    } else if (uniqueVendors.length > 1) {
      setShowVendorSelector(true);
    }
  }, [orderId, currentOrder]);

  // Fetch messages for this order when a vendor is selected
  useEffect(() => {
    if (orderId && selectedVendor) {
      getOrderMessages(orderId, selectedVendor.id);
    }
  }, [orderId, selectedVendor]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [orderMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !orderId || !selectedVendor?.id) return;

    const messageData = {
      message: newMessage.trim(),
      order_id: orderId,
      receiver_id: selectedVendor.id,
    };

    await sendOrderMessage(messageData, () => {
      setNewMessage("");
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowVendorSelector(false);
  };

  const formatMessages = (): IMessage[] => {
    const currentUserId = currentOrder?.user;
    return (orderMessages || []).map((msg) => ({
      content: msg.message,
      sender:
        msg.sender_id === currentUserId
          ? "You"
          : selectedVendor?.name || "Vendor",
      time: new Date(msg.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  };

  const messages = formatMessages();

  // Render vendor selection screen
  if (showVendorSelector) {
    return (
      <VendorMessagingSelector
        vendorsList={vendorsList}
        onSelectVendor={handleVendorSelect}
        onClose={onClose}
      />
    );
  }

  // Render chat interface when vendor is selected
  return (
    <div className="w-full max-w-[840px] rounded-[24px] bg-white h-full drop-shadow-sm flex flex-col">
      <div className="w-full">
        <div className="flex flex-row items-center justify-between gap-3 px-5 py-4">
          <div className="flex flex-row items-center gap-3">
            <div className="h-[40px] w-[40px] rounded-full bg-gray flex items-center justify-center text-white font-bold">
              {selectedVendor?.name.charAt(0)}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-black_0 font-[600]">{selectedVendor?.name}</p>
              <p
                className={`text-[12px] font-[400] ${
                  selectedVendor?.isOnline ? "text-green_sec" : "text-gray-400"
                }`}
              >
                {selectedVendor?.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {vendorsList.length > 1 && (
              <button
                className="text-blue_pry text-sm font-medium"
                onClick={() => setShowVendorSelector(true)}
              >
                Change Vendor
              </button>
            )}
            <button
              title="cancel"
              className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-gray_1"
              onClick={onClose}
            >
              <CancelIcon />
            </button>
          </div>
        </div>
        <HorizontalDivider color="#F1F1F1" />
      </div>

      <div className="px-5 py-4 flex flex-col gap-2 h-[calc(100vh-390px)] overflow-y-auto">
        {isOrderMessagesLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">
              No messages yet. Start a conversation with {selectedVendor?.name}!
            </p>
          </div>
        ) : (
          messages.map((msg, index) => <Message key={index} msg={msg} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-row p-5 mt-auto">
        <div className="border-[#D2D5DA] border-solid border-[1px] bg-[#F9FAFB] rounded-[6px] w-full flex flex-row items-center justify-between">
          <input
            type="text"
            className="flex-1 h-full w-full bg-transparent p-3 outline-none text-black_1"
            placeholder={`Message ${selectedVendor?.name}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSendingMessage || !selectedVendor}
          />
          <button
            title="send_message"
            type="button"
            className={`mr-3 ${
              !newMessage.trim() || isSendingMessage || !selectedVendor
                ? "opacity-50"
                : ""
            }`}
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isSendingMessage || !selectedVendor}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
