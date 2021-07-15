const handleChange = (formData: FormData): void => {
  const formDataEntries = Object.entries(formData);
  const [key, value] = formDataEntries[0];

  localStorage.setItem(key, value);
};

export default handleChange;
