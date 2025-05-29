import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ApiError } from '@/schema';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export const isApiError = (err: unknown): err is ApiError => {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as any).message === "string"
  );
}