import React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import { css, cx } from "../../styled-system/css";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  children?: React.ReactNode;
  name?: string;
  "data-testid"?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, onCheckedChange, disabled, id, className, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;

    const containerStyles = css({
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    });

    const wrapperStyles = css({
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      cursor: "pointer",
    });

    const checkboxRootStyles = css({
      all: "unset",
      backgroundColor: "surface.primary",
      width: "18px",
      height: "18px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid",
      borderColor: "border.primary",
      cursor: "pointer",
      transition: "all 0.15s ease",
      flexShrink: 0,
      _hover: {
        backgroundColor: "surface.secondary",
        borderColor: "border.secondary",
      },
      _focus: {
        outline: "none",
        boxShadow: "focus",
      },
      _disabled: {
        opacity: 0.6,
        cursor: "not-allowed",
        backgroundColor: "surface.secondary",
      },
      "&[data-state=checked]": {
        backgroundColor: "primary.500",
        borderColor: "primary.500",
        color: "white",
      },
      "&[data-state=checked]:hover": {
        backgroundColor: "primary.600",
        borderColor: "primary.600",
      },
    });

    const checkboxIndicatorStyles = css({
      color: "currentColor",
      width: "12px",
      height: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });

    return (
      <div className={containerStyles}>
        <div className={wrapperStyles}>
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            className={cx(checkboxRootStyles, className)}
            {...props}
          >
            <CheckboxPrimitive.Indicator className={checkboxIndicatorStyles}>
              <CheckIcon />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        </div>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
