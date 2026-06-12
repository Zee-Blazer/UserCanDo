import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  Radio,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function MenuWithCheckbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Today");

  const timeOptions = [
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "Last Year",
  ];

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Menu
      open={isOpen}
      handler={setIsOpen}
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        <Button
          variant="outlined"
          className="normal-case font-semibold flex items-center text-sm rounded-xl py-2"
        >
          {selectedOption}
          <ChevronDown size={20} strokeWidth={0.5} color="black" />
        </Button>
      </MenuHandler>
      <MenuList className="grid grid-cols-1 border-none border mt-3 items-center">
        <List className="border border-none">
          {timeOptions.map((option, index) => (
            <ListItem key={index} className="p-0">
              <label
                htmlFor={`vertical-list-${index}`}
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Radio
                    name="vertical-list"
                    id={`vertical-list-${index}`}
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                    color="blue"
                    style={{
                      color: "#5E73FB",
                    }}
                    checked={selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                    crossOrigin={undefined}
                  />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className="font-medium text-blue-gray-400"
                >
                  {option}
                </Typography>
              </label>
            </ListItem>
          ))}
          <div className="flex px-4 mt-4 pt-3 border-t border-gray-200 text-[#5E73FB] justify-between items-center">
            <span
              className="cursor-pointer hover:opacity-70"
              onClick={handleCancel}
            >
              Cancel
            </span>
            <span
              className="cursor-pointer hover:opacity-70"
              onClick={handleOk}
            >
              Ok
            </span>
          </div>
        </List>
      </MenuList>
    </Menu>
  );
}
