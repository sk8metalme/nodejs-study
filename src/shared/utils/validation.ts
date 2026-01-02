// Validation Utilities
// バリデーション関連のユーティリティ関数

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // 最低8文字、1つ以上の大文字、小文字、数字を含む
  return password.length >= 8;
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};
