import React from "react";
import { css, cx } from "../../styled-system/css";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 11)}`;

    const containerStyles = css({
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      width: "100%",
    });

    const inputStyles = css({
      width: "100%",
      padding: "12px 16px",
      border: "1px solid",
      borderColor: "border.primary",
      borderRadius: "input",
      fontSize: "14px",
      backgroundColor: "surface.primary",
      color: "text.primary",
      transition: "all 0.2s ease",
      _placeholder: {
        color: "text.muted",
      },
      _focus: {
        outline: "none",
        borderColor: "border.focus",
        boxShadow: "focus",
      },
      _disabled: {
        backgroundColor: "surface.secondary",
        color: "text.muted",
        cursor: "not-allowed",
      },
    });

    return (
      <div className={containerStyles}>
        <input
          ref={ref}
          id={inputId}
          className={cx(inputStyles, className)}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
