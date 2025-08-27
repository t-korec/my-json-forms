import FormRenderer from "./FormRenderer";
import { TabContentContainer } from "../GeneratorTabs";
import { css } from "../../../styled-system/css";
import { Heading2, Text } from "../../components/Typography";
import i18nprep from "../../i18nprep";
import type { FormConfig } from "../../schemas/formConfig";

export const ResultTab = ({ config }: { config: FormConfig | null }) => {
  return (
    <TabContentContainer
      className={css({
        overflow: "auto",
      })}
    >
      <Heading2>{i18nprep.tabs.result.title}</Heading2>
      <Text
        className={css({
          marginBottom: "20px",
        })}
      >
        {i18nprep.tabs.result.description}
      </Text>
      <FormRenderer config={config} />
    </TabContentContainer>
  );
};
