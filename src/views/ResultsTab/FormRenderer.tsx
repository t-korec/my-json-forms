import { useState, type FormEvent, type ReactNode } from "react";
import { css } from "../../../styled-system/css";
import {
  Input,
  Textarea,
  Checkbox,
  RadioGroup,
  Button,
  Card,
} from "../../components";
import type { RadioOption } from "../../components";
import i18nprep from "../../i18nprep";
import type {
  FormConfig,
  FormItem,
  FormButton,
} from "../../schemas/formConfig";

interface FormData {
  [key: string]: string | number | boolean | undefined;
}

interface FormRendererProps {
  config: FormConfig | null;
  initialData?: FormData;
}

export default function FormRenderer({
  config,
  initialData = {},
}: FormRendererProps) {
  const { formData, handleSubmit, renderField } = useFormRenderer(initialData);

  return (
    <FormContainer>
      <FieldForm onSubmit={handleSubmit}>
        <CustomFormHeading>{config?.title}</CustomFormHeading>

        <FormFields config={config} renderField={renderField} />

        <FormFooter>
          <FormButtons config={config} />
        </FormFooter>
      </FieldForm>

      <Card variant="secondary" className={css({ marginTop: "32px" })}>
        <FormDataHeading>
          {i18nprep.formRenderer.currentFormData}
        </FormDataHeading>
        <FormDataContent>{JSON.stringify(formData, null, 2)}</FormDataContent>
      </Card>
    </FormContainer>
  );
}

const useFormRenderer = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleInputChange = (
    label: string,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const renderField = (item: FormItem) => {
    const value = formData[item.label] || "";

    switch (item.type) {
      case "number":
        return (
          <Input
            type="number"
            value={String(value)}
            onChange={(e) => handleInputChange(item.label, e.target.value)}
          />
        );

      case "string":
        return (
          <Input
            type="text"
            value={String(value)}
            onChange={(e) => handleInputChange(item.label, e.target.value)}
          />
        );

      case "multi-line":
        return (
          <Textarea
            value={String(value)}
            onChange={(e) => handleInputChange(item.label, e.target.value)}
            rows={4}
          />
        );

      case "boolean":
        return (
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={(checked) =>
              handleInputChange(item.label, checked)
            }
          />
        );

      case "date":
        return (
          <Input
            type="date"
            value={String(value)}
            onChange={(e) => handleInputChange(item.label, e.target.value)}
          />
        );

      case "enum": {
        const options = item.options || ["Red", "Green", "Blue"];
        const radioOptions: RadioOption[] = options.map((option) => ({
          value: option,
          label: option,
        }));

        return (
          <RadioGroup
            options={radioOptions}
            value={String(value)}
            onValueChange={(value) => handleInputChange(item.label, value)}
          />
        );
      }

      default:
        return null;
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    renderField,
  };
};

/**
 * Filter out items with missing required properties or enum items without options
 * @param item - The item to filter
 * @returns True if the item is valid, false otherwise
 */
const filterBrokenItems = (item: FormItem): boolean => {
  if (!item.label || !item.type) {
    return false;
  }
  if (item.type === "enum" && (!item.options || item.options.length === 0)) {
    return false;
  }
  return true;
};

const FormFields = ({
  config,
  renderField,
}: {
  config?: FormConfig | null;
  renderField: (item: FormItem) => ReactNode;
}) => {
  return (
    <>
      {config?.items?.length ? (
        config.items
          .filter(filterBrokenItems)
          .map((item: FormItem, index: number) => (
            <FieldContainer key={index} index={index}>
              <FieldLabel>{item.label}</FieldLabel>
              {renderField(item)}
            </FieldContainer>
          ))
      ) : (
        <NoFieldsPlaceholder />
      )}
    </>
  );
};

const FormButtons = ({ config }: { config?: FormConfig | null }) => {
  return (
    <>
      {config?.buttons?.length
        ? config.buttons
            .filter((button: FormButton) => button.label && button.type)
            .map((button: FormButton, index: number) => (
              <Button key={index} type="submit" variant={button.type}>
                {button.label}
              </Button>
            ))
        : null}
    </>
  );
};

const FormFooter = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={css({
        display: "flex",
        gap: "12px",
        justifyContent: "flex-end",
      })}
    >
      {children}
    </div>
  );
};

const CustomFormHeading = ({ children }: { children: ReactNode }) => {
  return (
    <h2
      className={css({
        fontSize: "24px",
        fontWeight: "fontWeights.semibold",
        marginBottom: "16px",
        color: "text.primary",
      })}
    >
      {children}
    </h2>
  );
};

const FormDataHeading = ({ children }: { children: ReactNode }) => {
  return (
    <h3
      className={css({
        fontSize: "16px",
        fontWeight: "fontWeights.medium",
        marginBottom: "12px",
        color: "text.primary",
      })}
    >
      {children}
    </h3>
  );
};

const FormDataContent = ({ children }: { children: ReactNode }) => {
  return (
    <pre
      className={css({
        fontSize: "12px",
        color: "text.tertiary",
        whiteSpace: "pre-wrap",
      })}
    >
      {children}
    </pre>
  );
};

const FormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={css({
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      })}
    >
      {children}
    </div>
  );
};

const NoFieldsPlaceholder = () => {
  return (
    <Card variant="secondary">
      <div
        className={css({
          textAlign: "center",
          color: "text.tertiary",
          fontSize: "14px",
        })}
      >
        {i18nprep.formRenderer.noItems}
      </div>
    </Card>
  );
};

const FieldLabel = ({ children }: { children: ReactNode }) => {
  return (
    <label
      className={css({
        fontSize: "14px",
        fontWeight: "fontWeights.medium",
        color: "text.primary",
      })}
    >
      {children}
    </label>
  );
};

const FieldContainer = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => {
  return (
    <div
      key={index}
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      })}
    >
      {children}
    </div>
  );
};

const FieldForm = ({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void;
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      })}
    >
      {children}
    </form>
  );
};
