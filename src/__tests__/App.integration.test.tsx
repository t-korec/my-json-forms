import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import GeneratorTabs from "../views/GeneratorTabs";
import i18nprep from "../i18nprep";

describe("App Integration Tests", () => {
  it("validates JSON formatting on blur", async () => {
    render(<GeneratorTabs />);

    const textarea = screen.getByRole("textbox");

    const unformattedJson =
      '{"title":"Test","fields":[{"label":"Name","type":"string"}]}';
    fireEvent.change(textarea, { target: { value: unformattedJson } });

    fireEvent.blur(textarea);

    await waitFor(() => {
      const formattedValue = (textarea as HTMLTextAreaElement).value;
      expect(formattedValue).toContain("\n");
      expect(formattedValue).toContain("  ");
    });
  });

  it("trigger invalid JSON message", async () => {
    render(<GeneratorTabs />);

    const textarea = screen.getByRole("textbox");

    const invalidJson =
      '{"title":"Test","fields":[{"label":"Name","type":"string"}]';
    fireEvent.change(textarea, { target: { value: invalidJson } });

    await waitFor(() => {
      expect(screen.getByText(i18nprep.jsonEditor.error)).toBeInTheDocument();
    });

    const applyButton = screen.getByRole("button", { name: /apply/i });

    expect(applyButton).toBeDisabled();
  });

  it("See empty placeholder after clicking on result tab", async () => {
    const user = userEvent.setup();
    render(<GeneratorTabs />);

    const resultTab = screen.getByRole("tab", { name: /result/i });
    await user.click(resultTab);

    expect(resultTab).toHaveAttribute("data-state", "active");

    expect(
      screen.getByText(i18nprep.tabs.result.noConfiguration),
    ).toBeInTheDocument();
  });

  it("Click apply with default configuration then clicking on result tab should see generated form", async () => {
    const user = userEvent.setup();
    render(<GeneratorTabs />);

    const applyButton = screen.getByRole("button", { name: /apply/i });
    await user.click(applyButton);

    const resultTab = screen.getByRole("tab", { name: /result/i });
    await user.click(resultTab);

    expect(resultTab).toHaveAttribute("data-state", "active");

    expect(screen.getByText("Generated Form")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("Maintain error state when switching between tabs", async () => {
    const user = userEvent.setup();
    render(<GeneratorTabs />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: { value: "invalid json { missing quote" },
    });

    expect(screen.getByText(i18nprep.jsonEditor.error)).toBeInTheDocument();

    const configTab = screen.getByRole("tab", { name: /config/i });
    await user.click(configTab);

    expect(screen.getByText(i18nprep.jsonEditor.error)).toBeInTheDocument();
  });
});
