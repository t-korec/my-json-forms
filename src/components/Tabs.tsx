import { Tabs } from "radix-ui";
import { css } from "../../styled-system/css";

export const TabsRoot = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue: string;
}) => {
  const tabRootStyle = css({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
    minHeight: 0,
  });

  return (
    <Tabs.Root defaultValue={defaultValue} className={tabRootStyle}>
      {children}
    </Tabs.Root>
  );
};

export const TabsList = ({ children }: { children: React.ReactNode }) => {
  const tabListStyle = css({
    display: "flex",
    backgroundColor: "surface.tertiary",
    borderRadius: "8px",
    padding: "4px",
    gap: "4px",
    border: "1px solid",
    borderColor: "border.primary",
    flexShrink: 0,
    maxWidth: "300px",
  });

  return <Tabs.List className={tabListStyle}>{children}</Tabs.List>;
};

export const TabsTrigger = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  const tabTriggerStyle = css({
    flex: "1",
    padding: "12px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "fontWeights.medium",
    border: "none",
    backgroundColor: "transparent",
    color: "text.tertiary",
    cursor: "pointer",
    transition: "all 0.2s ease",
    _hover: {
      backgroundColor: "surface.secondary",
      color: "text.secondary",
    },
    _focus: {
      outline: "none",
      boxShadow: "focus",
    },
    "&[data-state=active]": {
      backgroundColor: "surface.primary",
      color: "text.primary",
      boxShadow: "card",
    },
  });

  return (
    <Tabs.Trigger className={tabTriggerStyle} value={value}>
      {children}
    </Tabs.Trigger>
  );
};

export const TabsContent = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  const tabContentStyle = css({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    maxWidth: "800px",
  });

  return (
    <Tabs.Content className={tabContentStyle} value={value}>
      {children}
    </Tabs.Content>
  );
};
