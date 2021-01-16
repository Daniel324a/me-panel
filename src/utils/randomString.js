export const randomString = size => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const { length } = chars;
  let result = "";

  for (let i = 0; i < size; i++) {
    result += chars.charAt(Math.floor(Math.random() * length));
  }
  return result;
};
