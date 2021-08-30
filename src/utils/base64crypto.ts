import CryptoJS from 'crypto';

export const base64crypto = (password: string): string =>
  CryptoJS.createHash('sha512').update(password).digest('base64');
