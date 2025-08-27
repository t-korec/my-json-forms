import React from "react";
import { css, cx } from "../../styled-system/css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "primary", children, className, ...props }, ref) => {
    const baseStyles = css({
      backgroundColor: "surface.primary",
      borderRadius: "card",
      border: "1px solid",
      borderColor: "border.primary",
      boxShadow: "card",
      padding: "24px",
      transition: "all 0.2s ease",
    });

    const variantStyles = {
      primary: css({
        backgroundColor: "surface.primary",
        borderColor: "border.primary",
      }),
      secondary: css({
        backgroundColor: "surface.tertiary",
        borderColor: "border.secondary",
      }),
    };

    return (
      <div
        ref={ref}
        className={cx(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
