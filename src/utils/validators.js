export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone) => {
  return /^01[3-9]\d{8}$/.test(phone);
};

export const isRequired = (value) => {
  return value.trim().length > 0;
};