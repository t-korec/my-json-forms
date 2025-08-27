import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { css, cx } from "../../styled-system/css";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onValueChange,
      name,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const groupName =
      name || `radio-group-${Math.random().toString(36).slice(2, 11)}`;

    const containerStyles = css({
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    });

    const optionsContainerStyles = css({
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    });

    const radioItemStyles = css({
      all: "unset",
      backgroundColor: "surface.primary",
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      border: "2px solid",
      borderColor: "border.primary",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.15s ease",
      flexShrink: 0,
      _hover: {
        borderColor: "border.secondary",
      },
      _focus: {
        outline: "none",
        boxShadow: "focus",
      },
      _disabled: {
        opacity: 0.6,
        cursor: "not-allowed",
      },
      "&[data-state=checked]": {
        borderColor: "primary.500",
        backgroundColor: "primary.500",
      },
    });

    const radioIndicatorStyles = css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      position: "relative",
      "&::after": {
        content: '""',
        display: "block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: "white",
        transform: "scale(0)",
        transition: "transform 0.15s ease",
      },
      "&[data-state=checked]::after": {
        transform: "scale(1)",
      },
    });

    const optionStyles = css({
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
    });

    const optionLabelStyles = css({
      fontSize: "14px",
      fontWeight: "fontWeights.normal",
      color: "text.primary",
      cursor: disabled ? "not-allowed" : "pointer",
      userSelect: "none",
      lineHeight: "1.4",
    });

    return (
      <div ref={ref} className={cx(containerStyles, className)} {...props}>
        <RadioGroupPrimitive.Root
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          name={groupName}
        >
          <div className={optionsContainerStyles}>
            {options.map((option, index) => (
              <div key={index} className={optionStyles}>
                <RadioGroupPrimitive.Item
                  value={option.value}
                  className={radioItemStyles}
                  disabled={disabled}
                >
                  <RadioGroupPrimitive.Indicator
                    className={radioIndicatorStyles}
                  />
                </RadioGroupPrimitive.Item>
                <span className={optionLabelStyles}>{option.label}</span>
              </div>
            ))}
          </div>
        </RadioGroupPrimitive.Root>
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
