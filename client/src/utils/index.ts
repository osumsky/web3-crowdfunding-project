// deadline: ms
export const daysLeft = (deadline: number): number => {
  const diff = deadline - Date.now();
  const remainDays = diff / (1000 * 60 * 60 * 24);
  return Number(remainDays.toFixed(0));
};

export const calculateBarPercentage = (
  target: number,
  amountCollected: number
): number => {
  return Math.round((amountCollected * 100) / target);
};

export const checkIfImage = (url: string, cb: Function) : void => {
  const image = new Image();
  image.src = url;
  if (image.complete) cb(true);
  image.onload = () => cb(true);
  image.onerror = () => cb(false);
}

// async function loadImage(url: string, elem: HTMLImageElement): Promise<any> {
//   return new Promise((resolve, reject) => {
//     elem.onload = () => resolve(elem);
//     elem.onerror = reject;
//     elem.src = url;
//   });
// }