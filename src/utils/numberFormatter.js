const sanitizeNumber = (number) => {
  if (!number) return null;

  // remove + if exists
  if (number.startsWith("+")) {
    number = number.slice(1);
  }

  return number;
}

module.exports = sanitizeNumber;