import { createCipher, createDecipher } from 'crypto';

const ALGORITHM = 'aes192';
const HASH_FORMAT = 'hex';
const ENCODING = 'utf8';

/**
 * Creates a AES192 cipher from given content string and password.
 * 
 * @param content String to be enchipered.
 * @param password Password key to encipher string.
 * 
 * @returns {string} Cipher hash.
 */
export const cipher = (content: string, email: string, password: string): string => {
  const cipher = createCipher(ALGORITHM, email + password);

  let encrypted = cipher.update(content, ENCODING, HASH_FORMAT);
  encrypted += cipher.final(HASH_FORMAT);

  return encrypted;
}

/**
 * Deciphers given AES192 cipher hash with given password.
 * 
 * @param hash Hash string to be dechipered.
 * @param password Password key to decipher hash.
 * 
 * @returns {string} Deciphered data or null if wrong password.
 */
export const decipher = (hash: string, email: string, password: string): string => {
  const decipher = createDecipher(ALGORITHM, email + password);

  let decrypted = decipher.update(hash, HASH_FORMAT, ENCODING);
  decrypted += decipher.final(ENCODING);

  return decrypted;
}
