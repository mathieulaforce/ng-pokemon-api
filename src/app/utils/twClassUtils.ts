import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function twClassUtil(...inputs: ClassValue[]) {
 
	return twMerge(clsx(inputs));
}