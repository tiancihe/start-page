export function getTime() {
  return new Date(Date.now());
}

export function getToday() {
  return getTime().toLocaleDateString();
}
