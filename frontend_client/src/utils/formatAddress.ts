export default (
  address: string,
  startingCharacters = 4,
  endingCharacters = 4
): string => {
  return (
    address.slice(0, startingCharacters) +
    "..." +
    address.slice(address.length - endingCharacters)
  );
};
