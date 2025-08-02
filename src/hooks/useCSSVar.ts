import { useMemo } from "react";

export const useCSSVar = (variableName: string) => {
  const value = useMemo(() => {
    return getCssVariable(variableName);
  }, [variableName]);

  return value;
};
export const getCssVariable = (variableName: string) => {
  if (typeof variableName !== "string") return null;
  if (typeof window !== "undefined") {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const variableValue = rootStyles.getPropertyValue(variableName);

    return variableValue.trim();
  }
  return null;
};
