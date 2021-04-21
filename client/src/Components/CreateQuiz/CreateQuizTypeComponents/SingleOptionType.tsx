import { DeleteIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { Radio } from "@chakra-ui/radio";
import * as React from "react";

export interface SingleOptionTypeProps {
  optionText: string;
  handleTextChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  index: number;
  isCorrect: boolean;
  changeOption: (e: number) => void;
  deleteOption: (e: number) => void;
  openModal: (m: string) => void;
}

/**
 * This component is for the radio button, the next next to it, and the delete button for the option on the right
 */

const SingleOptionType: React.FC<SingleOptionTypeProps> = (props) => {
  const {
    optionText,
    handleTextChange,
    index,
    isCorrect,
    changeOption,
    deleteOption,
    openModal,
  } = props;

  return (
    <>
      <HStack marginBottom="10px" width="95%">
        {/* This is wrapped in a box, because by default, Radio is a span */}
        <Radio
          display="inline-block"
          isChecked={isCorrect}
          onClick={() => changeOption(index)}
        ></Radio>
        <Input
          type="text"
          display="inline-block"
          value={optionText}
          onChange={(e) => handleTextChange(e, index)}
        />
        <DeleteIcon
          display={index > 1 ? "inherit" : "none"}
          cursor="pointer"
          onClick={(e) => {
            if (isCorrect === true) {
              openModal("You cannot delete the option which you have selected");
            } else {
              deleteOption(index);
            }
          }}
        />
      </HStack>
    </>
  );
};

export default SingleOptionType;
