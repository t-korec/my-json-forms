const i18nprep = {
  warnings: {
    enumItems:
      "Enum type items must have options array with at least one option",
    atLeastOneItem: "At least one form item is required",
    buttonLabelRequired: "Button label is required",
    labelRequired: "Label is required",
  },
  jsonEditor: {
    label: "JSON Input",
    error: "Invalid JSON",
  },
  formRenderer: {
    noAvailable: "No configuration available. Please configure the form first.",
    noItems:
      "No items configured. Please add items to your JSON configuration.",
    currentFormData: "Current Form Data:",
  },
  heading: "Dynamic Form Generator",
  tabs: {
    config: {
      label: "Config",
      title: "Form Configuration",
      description:
        "Configure your form by editing the JSON below. Click 'Apply' to generate the form.",
      buttons: {
        apply: "Apply",
      },
    },
    result: {
      label: "Result",
      title: "Generated Form",
      description: "Form generated based on your configuration:",
      emptyMessage:
        "Go to the Config tab and click 'Apply' to generate a form.",
      noConfiguration: "No Configuration Applied",
    },
  },
} as const;

export default i18nprep;
