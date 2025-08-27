/**
 * Parse the input value as JSON
 * @param inputValue - The input value to parse
 * @returns The parsed JSON or null if the input value is not valid JSON
 */
export const parseJson = (inputValue: string) => {
  try {
    return JSON.parse(inputValue);
  } catch {
    return null;
  }
};
