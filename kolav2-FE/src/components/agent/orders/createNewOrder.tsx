import usePreventRefresh from "@/api/hooks/usePreventRefresh";
import { agentOrderSlides } from "./slides";
import { useAgent } from "@/context/agentContext";

const CreateNewOrder = () => {
  const { activeOrderSaleSlideIndex } = useAgent();
  usePreventRefresh(true);

  return (
    <div className="h-screen pb-12">
      <div className="relative h-full w-full mb-4">
        {agentOrderSlides?.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out ${
              index === activeOrderSaleSlideIndex
                ? "translate-x-0 opacity-100"
                : index < activeOrderSaleSlideIndex
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            } p-4`}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateNewOrder;
