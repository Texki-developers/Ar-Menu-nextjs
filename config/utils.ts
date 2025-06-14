export const debounce = <T extends (...args: never[]) => void>(
  func: T,
  delay: number
) => {
  let timer: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
