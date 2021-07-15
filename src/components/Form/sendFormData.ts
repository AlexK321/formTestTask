import React from 'react';
import axios from 'axios';
import { POST_URL } from './constants';
import { FormData } from './interface';

const sendFormData = async (
  formData: FormData,
  setHasError: React.Dispatch<React.SetStateAction<boolean | null>>
): Promise<void> => {
  try {
    await axios.post(POST_URL, formData);
    setHasError(false);
  } catch (err) {
    setHasError(true);
  }
};

export default sendFormData;
