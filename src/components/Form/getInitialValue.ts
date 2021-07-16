import { FILLED_SEARCH_QUERY } from './constants';
import { FormData } from '../../Types/interfaces';

export const changeInitialValue = (formData: FormData, filled: number): FormData => {
  const filteredFormData = Object.entries(formData).slice(0, filled);

  return Object.fromEntries(filteredFormData);
};

const getInitialValues = (formData: FormData): FormData => {
  let finalFormData = formData;
  const url = new URL(window.location.href);
  const filled = Number(url.searchParams.get(FILLED_SEARCH_QUERY));
  const maxItems = Object.entries(formData).length;

  if (filled > 0 && filled <= maxItems) {
    finalFormData = changeInitialValue(formData, filled);
  } else if (url.searchParams.has(FILLED_SEARCH_QUERY)) {
    url.searchParams.delete(FILLED_SEARCH_QUERY);
    window.location.href = url.toString();
  }

  return finalFormData;
};

export default getInitialValues;
