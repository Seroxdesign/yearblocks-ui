export function generateID(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortId += characters[randomIndex];
  }

  return shortId;
}

export function generateNumberID(length) {
  const characters = "0123456789";
  let shortId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortId += characters[randomIndex];
  }

  return parseInt(shortId);
}
