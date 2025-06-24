import { ButtonGroup, Button } from "@mui/material";
import { useState } from "react";

const ButtonGroupComponent = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const handleClear = () => {
    setClickCount(0);
  };

  const handleDisableToggle = () => {
    setIsDisabled(!isDisabled);
  };
  return (
    <ButtonGroup
      variant="outlined"
      orientation="vertical"
      aria-label="outlined primary button group"
    >
      <Button onClick={handleClick} disabled={isDisabled}>
        CLICK:{clickCount}
      </Button>
      <Button onClick={handleClear}>CLEAR</Button>
      <Button onClick={handleDisableToggle}>
        {isDisabled ? "ABLE" : "DISABLE"}
      </Button>
    </ButtonGroup>
  );
};

export default ButtonGroupComponent;
