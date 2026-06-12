import { useAuth } from "@/context/authContext";
import usePreventRefresh from "@/api/hooks/usePreventRefresh";
import { addSalesRequestSlides } from "../slides";
 
const AddSalesRequest = () => {
  const { activeSlideIndex } = useAuth();
  usePreventRefresh(true);

  return (
    <div className="h-screen">
      <div className="relative h-full w-full overflow-x-hidden">
        {addSalesRequestSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out ${
              index === activeSlideIndex
                ? "translate-x-0 opacity-100"
                : index < activeSlideIndex
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

export default AddSalesRequest;
