import React from "react";
import { css, cx } from "../../styled-system/css";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, ...props }, ref) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).slice(2, 11)}`;

    const containerStyles = css({
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      width: "100%",
    });

    const textareaStyles = css({
      width: "100%",
      padding: "12px 16px",
      border: "1px solid",
      borderColor: "border.primary",
      borderRadius: "input",
      fontSize: "14px",
      backgroundColor: "surface.primary",
      color: "text.primary",
      fontFamily: "inherit",
      lineHeight: "1.4",
      resize: "vertical",
      minHeight: "100px",
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
        <textarea
          ref={ref}
          id={textareaId}
          className={cx(textareaStyles, className)}
          {...props}
        />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
