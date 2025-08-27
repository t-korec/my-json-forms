import { css, cx } from "../../styled-system/css";

export const Heading = ({ children }: { children: React.ReactNode }) => (
  <h1
    className={css({
      fontSize: "32px",
      fontWeight: "fontWeights.bold",
      textAlign: "center",
      marginBottom: "24px",
      color: "text.primary",
      flexShrink: 0,
    })}
  >
    {children}
  </h1>
);

export const Heading2 = ({ children }: { children: React.ReactNode }) => (
  <h2
    className={css({
      fontSize: "20px",
      fontWeight: "fontWeights.semibold",
      marginBottom: "8px",
      color: "text.primary",
      flexShrink: 0,
    })}
  >
    {children}
  </h2>
);

export const Heading3 = ({ children }: { children: React.ReactNode }) => (
  <h3
    className={css({
      fontSize: "18px",
      fontWeight: "fontWeights.semibold",
      marginBottom: "8px",
      color: "text.primary",
    })}
  >
    {children}
  </h3>
);

export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cx(
        css({
          fontSize: "14px",
          color: "text.tertiary",
          lineHeight: "1.5",
        }),
        className,
      )}
    >
      {children}
    </div>
  );
};
