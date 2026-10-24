export const isValidEmail = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isRequired = value => {
  return value !== undefined &&
    value !== null &&
    value.trim() !== '';
};

export const isValidPassword = password => {
  return password && password.length >= 6;
};