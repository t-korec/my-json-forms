import JsonEditor from "./JsonEditor";
import { Button } from "../../components";
import { css } from "../../../styled-system/css";
import { Heading2, Text } from "../../components/Typography";
import i18nprep from "../../i18nprep";
import { TabContentContainer } from "../GeneratorTabs";
import { validateFormConfig, type FormConfig } from "../../schemas/formConfig";
import { parseJson } from "../../utils/jsonUtils";

export const ConfigTab = ({
  setConfig,
  inputValue,
  setInputValue,
  configError,
  setConfigError,
}: {
  setConfig: (state: FormConfig | null) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  configError: string | null;
  setConfigError: (error: string | null) => void;
}) => {
  const { handleApplyConfig } = useConfigTab(
    inputValue,
    setConfig,
    setConfigError,
  );

  return (
    <TabContentContainer
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Heading2>{i18nprep.tabs.config.title}</Heading2>
      <Text
        className={css({
          flexShrink: 0,
          marginBottom: "16px",
        })}
      >
        {i18nprep.tabs.config.description}
      </Text>
      <ConfigTabContent>
        <JsonEditor
          inputValue={inputValue}
          setInputValue={setInputValue}
          configError={configError}
          setConfigError={setConfigError}
        />
      </ConfigTabContent>
      <ConfigTabFooter>
        <Button
          onClick={handleApplyConfig}
          variant="primary"
          disabled={!inputValue || !!configError}
        >
          {i18nprep.tabs.config.buttons.apply}
        </Button>
      </ConfigTabFooter>
    </TabContentContainer>
  );
};

const useConfigTab = (
  inputValue: string,
  setConfig: (state: FormConfig | null) => void,
  setConfigError: (error: string | null) => void,
) => {
  /**
   * 1. Parse the input value as JSON
   * 2. If not valid JSON, set config error
   * 3. If valid JSON, validate the parsed JSON
   * 4. If there are warnings, console.warn the warnings
   */
  const handleApplyConfig = () => {
    const parsedJson = parseJson(inputValue);

    if (!parsedJson) {
      setConfig(null);
      setConfigError(i18nprep.jsonEditor.error);
      return;
    }
    setConfig(parsedJson);
    setConfigError(null);

    const validationResult = validateFormConfig(parsedJson);

    if (validationResult.warnings) {
      console.warn(validationResult.warnings);
    }
  };

  return { handleApplyConfig };
};

const ConfigTabContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={css({
        flex: 1,
        minHeight: 0,
        marginBottom: "16px",
      })}
    >
      {children}
    </div>
  );
};

const ConfigTabFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        flexShrink: 0,
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
        })}
      >
        {children}
      </div>
    </div>
  );
};
