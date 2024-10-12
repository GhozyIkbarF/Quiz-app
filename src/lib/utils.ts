import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const decodeHtmlEntities = (text: string): string => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html")
    .documentElement.textContent;
  return decodedString || "";
};

const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getItem = (key: string) => {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
}

const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

export const storage = {
  setItem,
  getItem,
  removeItem,
}