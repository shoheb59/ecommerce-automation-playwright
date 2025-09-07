import * as fs from "fs";

export const fileExists = (path: string): boolean => {
  return fs.existsSync(path);
};

export const fileSize = (path: string): number => {
  const stats = fs.statSync(path);
  return stats.size;
};
