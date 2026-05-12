// Centralized Theme Colors
export const themeColors = {
  primary: {
    light: "#3b82f6", // blue-500
    main: "#2563eb", // blue-600
    dark: "#1d4ed8", // blue-700
  },
  secondary: {
    light: "#fbbf24", // amber-400
    main: "#f59e0b", // amber-500
    dark: "#d97706", // amber-600
  },
  tertiary: {
    light: "#6366f1", // indigo-500
    main: "#4f46e5", // indigo-600
    dark: "#4338ca", // indigo-700
  },
  neutral: {
    white: "#ffffff",
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray700: "#374151",
    gray900: "#111827",
    zinc300: "#d4d4d8",
  },
  status: {
    success: "#10b981", // green-500
    error: "#ef4444", // red-500
    warning: "#f59e0b", // amber-500
    info: "#3b82f6", // blue-500
  },
};

// CSS Custom Properties for Tailwind
export const cssVariables = `
:root {
  --color-primary-light: ${themeColors.primary.light};
  --color-primary-main: ${themeColors.primary.main};
  --color-primary-dark: ${themeColors.primary.dark};
  
  --color-secondary-light: ${themeColors.secondary.light};
  --color-secondary-main: ${themeColors.secondary.main};
  --color-secondary-dark: ${themeColors.secondary.dark};
  
  --color-tertiary-light: ${themeColors.tertiary.light};
  --color-tertiary-main: ${themeColors.tertiary.main};
  --color-tertiary-dark: ${themeColors.tertiary.dark};
}
`;
