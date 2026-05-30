export const clamp01 = (value: number): number => Math.min(Math.max(value, 0), 1);
export const easeInOut = (progress: number): number => progress * progress * (3 - 2 * progress);
export const easeOut = (progress: number): number => Math.sqrt(progress);
