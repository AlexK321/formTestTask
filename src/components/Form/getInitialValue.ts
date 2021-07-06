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

const getInitialValues = (formData: FormData): FormData => {
  let finalFormData = formData;
  const url = new URL(window.location.href);
  const filled = Number(url.searchParams.get(FILLED));
  const maxItems = Object.entries(formData).length;

  if (filled > 0 && filled <= maxItems) {
    finalFormData = changeInitialValue(formData, filled);
  } else if (url.searchParams.has(FILLED)) {
    url.searchParams.delete(FILLED);
    window.location.href = url.toString();
  }

  return finalFormData;
};

export default getInitialValues;
