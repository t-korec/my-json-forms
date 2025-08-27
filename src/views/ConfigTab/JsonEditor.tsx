import { type ChangeEvent, type ReactNode } from "react";
import { Label, ScrollArea } from "radix-ui";
import { css } from "../../../styled-system/css";
import i18nprep from "../../i18nprep";
import { theme } from "../../theme";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export default function JsonEditor({
  inputValue,
  setInputValue,
  configError,
  setConfigError,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  configError: string | null;
  setConfigError: (error: string | null) => void;
}) {
  const { handleChange, handleBlur } = useJsonEditor({
    inputValue,
    setInputValue,
    setConfigError,
  });

  return (
    <JsonEditorContainer>
      <JsonLabel>{i18nprep.jsonEditor.label}</JsonLabel>

      <JsonScrollArea>
        <JsonTextArea
          inputValue={inputValue}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </JsonScrollArea>

      {configError && <ErrorSpan error={configError} />}
    </JsonEditorContainer>
  );
}

const useJsonEditor = ({
  inputValue,
  setInputValue,
  setConfigError,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  setConfigError: (error: string | null) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputValue(text);

    try {
      JSON.parse(text);
      setConfigError(null);
    } catch {
      setConfigError(i18nprep.jsonEditor.error);
    }
  };

  const handleBlur = () => {
    try {
      const parsed = JSON.parse(inputValue);
      const pretty = JSON.stringify(parsed, null, 2);
      setInputValue(pretty);
      setConfigError(null);
    } catch {
      // keep invalid input as-is
    }
  };
  return { handleChange, handleBlur };
};

const ErrorSpan = ({ error }: { error: string }) => {
  return (
    <span
      className={css({
        color: "red",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      })}
    >
      <CrossCircledIcon
        className={css({
          width: "14px",
          height: "14px",
        })}
      />
      {error}
    </span>
  );
};

const JsonEditorContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
        height: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      })}
    >
      {children}
    </div>
  );
};

const JsonLabel = ({ children }: { children: ReactNode }) => {
  return (
    <Label.Root
      htmlFor="json"
      className={css({
        fontSize: "14px",
        fontWeight: "500",
      })}
    >
      {children}
    </Label.Root>
  );
};

const JsonTextArea = ({
  inputValue,
  handleChange,
  handleBlur,
}: {
  inputValue: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: () => void;
}) => (
  <textarea
    id="json"
    value={inputValue}
    onChange={handleChange}
    onBlur={handleBlur}
    className={css({
      width: "100%",
      height: "98%",
      padding: "8px",
      fontFamily: "monospace",
      fontSize: "14px",
      lineHeight: "1.4",
      resize: "none",
      outline: "none",
      boxSizing: "border-box",
    })}
  />
);

const JsonScrollArea = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollArea.Root
      className={css({
        height: "100%",
        width: "100%",
        border: `1px solid ${theme.colors.border.secondary}`,
        borderRadius: "6px",
        overflow: "hidden",
      })}
    >
      <ScrollArea.Viewport
        className={css({
          width: "100%",
          height: "100%",
          "& > div": {
            height: "100%",
          },
        })}
      >
        {children}
        <ScrollArea.Scrollbar
          orientation="vertical"
          className={css({
            display: "flex",
            userSelect: "none",
            touchAction: "none",
            padding: "2px",
            background: theme.colors.background.scrollbar,
          })}
        >
          <ScrollArea.Thumb
            className={css({
              flex: "1",
              background: theme.colors.background.thumb,
              borderRadius: "4px",
            })}
          />
        </ScrollArea.Scrollbar>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
};
