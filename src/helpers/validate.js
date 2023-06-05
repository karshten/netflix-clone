export const validateEmail = (email) => {
  const emailRegExp = new RegExp(/\S+@\S+\.\S+/);
  return emailRegExp.test(email);
}