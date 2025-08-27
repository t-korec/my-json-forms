import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import { css, cx } from "../../styled-system/css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, disabled, className, ...props }, ref) => {
    const baseStyles = css({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "12px 24px",
      border: "none",
      borderRadius: "button",
      fontSize: "14px",
      fontWeight: "fontWeights.medium",
      cursor: "pointer",
      transition: "all 0.2s ease",
      _focus: {
        outline: "none",
        boxShadow: "focus",
      },
      _disabled: {
        opacity: 0.6,
        cursor: "not-allowed",
        transform: "none !important",
      },
    });

    const variantStyles = {
      primary: css({
        backgroundColor: "primary.500",
        color: "text.inverse",
        _hover: {
          backgroundColor: "primary.600",
          transform: "translateY(-1px)",
          boxShadow: "button-hover",
        },
        _active: {
          transform: "translateY(0)",
          boxShadow: "button",
        },
      }),
      secondary: css({
        backgroundColor: "surface.secondary",
        color: "text.secondary",
        border: "1px solid",
        borderColor: "border.primary",
        _hover: {
          backgroundColor: "surface.tertiary",
          color: "text.primary",
        },
      }),
    };

    return (
      <button
        ref={ref}
        className={cx(baseStyles, variantStyles[variant], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
