import axios from 'axios';

// export const LOOKS_API = 'http://localhost:8082/looks';
export const LOOKS_API = 'https://pnp-arsenal.herokuapp.com/looks';

export const applyMakeup = async (data) => {
  const url = `${LOOKS_API}/applymakeup/v2`;
  return await axios.post(url, data);
};

export const applyLipColor = async (data) => {
  const url = `${LOOKS_API}/applyProfileLipColor`;
  return await axios.post(url, data);
};