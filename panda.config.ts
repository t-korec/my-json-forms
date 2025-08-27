import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  jsxFramework: "react",
  include: ["./src/**/*.{ts,tsx,js,jsx}"],
  exclude: [],
  outdir: "styled-system",

  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            50: { value: "#eff6ff" },
            100: { value: "#dbeafe" },
            200: { value: "#bfdbfe" },
            300: { value: "#93c5fd" },
            400: { value: "#60a5fa" },
            500: { value: "#3b82f6" },
            600: { value: "#2563eb" },
            700: { value: "#1d4ed8" },
            800: { value: "#1e40af" },
            900: { value: "#1e3a8a" },
            950: { value: "#172554" },
          },
          secondary: {
            50: { value: "#f8fafc" },
            100: { value: "#f1f5f9" },
            200: { value: "#e2e8f0" },
            300: { value: "#cbd5e1" },
            400: { value: "#94a3b8" },
            500: { value: "#64748b" },
            600: { value: "#475569" },
            700: { value: "#334155" },
            800: { value: "#1e293b" },
            900: { value: "#0f172a" },
            950: { value: "#020617" },
          },
          success: {
            50: { value: "#f0fdf4" },
            100: { value: "#dcfce7" },
            200: { value: "#bbf7d0" },
            300: { value: "#86efac" },
            400: { value: "#4ade80" },
            500: { value: "#22c55e" },
            600: { value: "#16a34a" },
            700: { value: "#15803d" },
            800: { value: "#166534" },
            900: { value: "#14532d" },
            950: { value: "#052e16" },
          },
          warning: {
            50: { value: "#fffbeb" },
            100: { value: "#fef3c7" },
            200: { value: "#fde68a" },
            300: { value: "#fcd34d" },
            400: { value: "#fbbf24" },
            500: { value: "#f59e0b" },
            600: { value: "#d97706" },
            700: { value: "#b45309" },
            800: { value: "#92400e" },
            900: { value: "#78350f" },
            950: { value: "#451a03" },
          },
          error: {
            50: { value: "#fef2f2" },
            100: { value: "#fee2e2" },
            200: { value: "#fecaca" },
            300: { value: "#fca5a5" },
            400: { value: "#f87171" },
            500: { value: "#ef4444" },
            600: { value: "#dc2626" },
            700: { value: "#b91c1c" },
            800: { value: "#991b1b" },
            900: { value: "#7f1d1d" },
            950: { value: "#450a0a" },
          },
          surface: {
            primary: { value: "#ffffff" },
            secondary: { value: "#f9fafb" },
            tertiary: { value: "#f3f4f6" },
            muted: { value: "#f1f5f9" },
          },
          text: {
            primary: { value: "#1f2937" },
            secondary: { value: "#4b5563" },
            tertiary: { value: "#6b7280" },
            muted: { value: "#9ca3af" },
            inverse: { value: "#ffffff" },
          },
          border: {
            primary: { value: "#e5e7eb" },
            secondary: { value: "#d1d5db" },
            tertiary: { value: "#f3f4f6" },
            focus: { value: "#3b82f6" },
          },
        },
        spacing: {
          "container-sm": { value: "640px" },
          "container-md": { value: "768px" },
          "container-lg": { value: "1024px" },
          "container-xl": { value: "1200px" },
          "container-2xl": { value: "1400px" },
        },
        radii: {
          card: { value: "8px" },
          button: { value: "6px" },
          input: { value: "6px" },
        },
        shadows: {
          card: {
            value:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          },
          "card-hover": {
            value:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
          button: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
          "button-hover": {
            value:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
          focus: { value: "0 0 0 3px rgba(59, 130, 246, 0.2)" },
        },
      },
    },
  },
});
