export const compressString = (str, min = "5", max = "99999") =>
  str.replace(
    new RegExp(`(.)\\1{${min},${max}}`, "g"),
    chars => `(${chars.charAt(0)}*${chars.length})`
  );
