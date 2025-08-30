import crypto from "crypto";
import { ENCRYPTION_KEY } from "@/services/api/baseApi";
const key = ENCRYPTION_KEY;
const encrypKey = Buffer.from(key, "hex");
const ivLength = 16;

export function encrypt(text) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv("aes-256-cbc", encrypKey, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text) {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encrypKey),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export function encryptObject(obj) {
  const encryptedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      encryptedObj[key] = encrypt(obj[key]);
    }
  }
  return encryptedObj;
}

export function decryptObject(obj) {
  const decryptedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      decryptedObj[key] = decrypt(obj[key]);
    }
  }
  return decryptedObj;
}
