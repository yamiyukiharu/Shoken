export const unCamelCase = (data: string): string => {
  return (
    data
      // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
};

export const stringToColour = (str:string):string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    value = value > 0x88 ? value - 0x55 : value
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}