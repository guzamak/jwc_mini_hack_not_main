import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function toUTC7(dateStr: string | Date) {
  const date = new Date(dateStr);
  const utc7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return utc7Date;
}

