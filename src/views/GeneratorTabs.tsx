import { useState, type ReactNode } from "react";
import { css, cx } from "../../styled-system/css";
import i18nprep from "../i18nprep";
import { Heading, Heading3, Text } from "../components/Typography";
import { ConfigTab } from "./ConfigTab/ConfigTab";
import { ResultTab } from "./ResultsTab/ResultsTab";
import { type FormConfig } from "../schemas/formConfig";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "../components/Tabs";
import { FileTextIcon } from "@radix-ui/react-icons";

const exampleConfig = `{
  "title": "User Registration Form",
  "items": [
    {
      "label": "Count",
      "type": "number"
    },
    {
      "label": "Caption",
      "type": "string"
    },
    {
      "label": "Description",
      "type": "multi-line"
    },
    {
      "label": "isEditable",
      "type": "boolean"
    },
    {
      "label": "First logged in",
      "type": "date"
    },
    {
      "label": "Color",
      "type": "enum",
      "options": ["Red", "Green", "Blue"]
    }
  ],
  "buttons": [
    {"label": "Ok", "type": "secondary"},
    {"label": "Cancel", "type": "secondary"},
    {"label": "Save", "type": "primary"}
  ]
}
`;

const GeneratorTabs = () => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [inputValue, setInputValue] = useState(exampleConfig);
  const [configError, setConfigError] = useState<string | null>(null);

  return (
    <PageContainer>
      <Heading>{i18nprep.heading}</Heading>

      <TabsRoot defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">{i18nprep.tabs.config.label}</TabsTrigger>
          <TabsTrigger value="tab2">{i18nprep.tabs.result.label}</TabsTrigger>
        </TabsList>

        <TabsContent value="tab1">
          <ConfigTab
            setConfig={setConfig}
            inputValue={inputValue}
            setInputValue={setInputValue}
            configError={configError}
            setConfigError={setConfigError}
          />
        </TabsContent>

        <TabsContent value="tab2">
          {config ? <ResultTab config={config} /> : <EmptyResultTab />}
        </TabsContent>
      </TabsRoot>
    </PageContainer>
  );
};

export default GeneratorTabs;

const EmptyResultTab = () => {
  return (
    <TabContentContainer
      className={css({
        padding: "40px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <div
        className={css({
          marginBottom: "16px",
          display: "flex",
          justifyContent: "center",
        })}
      >
        <FileTextIcon
          className={css({
            width: "48px",
            height: "48px",
            color: "text.secondary",
          })}
        />
      </div>
      <Heading3>{i18nprep.tabs.result.noConfiguration}</Heading3>
      <Text>{i18nprep.tabs.result.emptyMessage}</Text>
    </TabContentContainer>
  );
};

const PageContainer = ({ children }: { children: ReactNode }) => (
  <div
    className={css({
      maxWidth: "container-xl",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "fonts.sans",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    })}
  >
    {children}
  </div>
);

export const TabContentContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cx(
        css({
          backgroundColor: "surface.primary",
          borderRadius: "card",
          padding: "24px",
          border: "1px solid",
          borderColor: "border.primary",
          boxShadow: "card",
          height: "100%",
        }),
        className,
      )}
    >
      {children}
    </div>
  );
};
