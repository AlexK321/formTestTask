import { FILLED } from './constants';

interface FormData {
  email?: string;
  phoneNumber?: string;
  userName?: string;
}

export const changeInitialValue = (formData: FormData, filled: number): FormData => {
  const filteredFormData = Object.entries(formData).slice(0, filled);

  return Object.fromEntries(filteredFormData);
};

const getInitialValues = (formData: FormData): any => {
  const url = new URL(window.location.href);
  const filled = Number(url.searchParams.get(FILLED));
  const maxItems = Object.entries(formData).length;

  if (url.searchParams.has(FILLED) && (filled === 0 || filled > maxItems)) {
    url.searchParams.delete(FILLED);
    window.location.href = url.toString();
  } else if (filled > 0 && filled <= maxItems) {
    return changeInitialValue(formData, filled);
  }

  return formData;
};

export default getInitialValues;
