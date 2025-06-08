import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const PRIVATE_KEY_PATH = path.resolve('src/keys/private.pem');
const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH, 'utf-8');

export function decrypt(encryptedDataB64) {
    const buffer = Buffer.from(encryptedDataB64, 'base64');

    const decrypted = crypto.privateDecrypt(
        {
            key: PRIVATE_KEY,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        },
        buffer
    );

    return decrypted.toString('utf-8');
}