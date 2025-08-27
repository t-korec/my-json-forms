import { z } from "zod";
import i18nprep from "../i18nprep";

const formItemTypeSchema = z.enum([
  "number",
  "string",
  "multi-line",
  "boolean",
  "date",
  "enum",
]);

const buttonTypeSchema = z.enum(["primary", "secondary"]);

const formItemSchema = z.object({
  label: z.string().min(1, i18nprep.warnings.labelRequired),
  type: formItemTypeSchema,
  options: z.array(z.string()).optional(),
});

const formButtonSchema = z.object({
  label: z.string().min(1, i18nprep.warnings.buttonLabelRequired),
  type: buttonTypeSchema,
});

export const formConfigSchema = z
  .object({
    title: z.string().optional(),
    items: z.array(formItemSchema).min(1, i18nprep.warnings.atLeastOneItem),
    buttons: z.array(formButtonSchema).optional(),
  })
  .refine(
    (data) => {
      const enumItems = data.items.filter((item) => item.type === "enum");
      return enumItems.every((item) => item.options && item.options.length > 0);
    },
    {
      message: i18nprep.warnings.enumItems,
      path: ["items"],
    },
  );

export type FormConfig = z.infer<typeof formConfigSchema>;
export type FormItem = z.infer<typeof formItemSchema>;
export type FormButton = z.infer<typeof formButtonSchema>;

/**
 * Validate the form configuration.
 * @param parsedJson - The parsed JSON string
 * @returns The validated data and warnings
 */
export const validateFormConfig = (parsedJson: string) => {
  const result = formConfigSchema.safeParse(parsedJson);

  if (result.success) {
    return {
      data: result.data,
      warnings: null,
    };
  } else {
    const warnings = result.error.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    const warningMessages =
      warnings.map((warning) => `${warning.path}: ${warning.message}`) || [];

    return {
      data: parsedJson,
      warnings: warningMessages,
    };
  }
};
