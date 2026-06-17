// input: INDEXNOW_KEY from process.env or local .env
// output: public/{INDEXNOW_KEY}.txt when the key is valid
// pos: IndexNow build helper (update rule: sync this header and scripts README when this file changes)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const keyPattern = /^[A-Za-z0-9_-]+$/;

function loadDotEnv() {
  const envPath = join(cwd(), ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const name = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (name && process.env[name] === undefined) {
      process.env[name] = value;
    }
  });
}

function maskKey(key) {
  if (key.length <= 8) {
    return `${key.slice(0, 2)}***${key.slice(-2)}`;
  }

  return `${key.slice(0, 4)}***${key.slice(-4)}`;
}

loadDotEnv();

const indexNowKey = process.env.INDEXNOW_KEY?.trim();

if (!indexNowKey) {
  console.warn("INDEXNOW_KEY is not set. Skip IndexNow key file generation.");
  process.exit(0);
}

if (!keyPattern.test(indexNowKey)) {
  console.warn("INDEXNOW_KEY contains unsupported characters. Use only letters, numbers, hyphen, and underscore. Skip IndexNow key file generation.");
  process.exit(0);
}

if (indexNowKey.length < 8 || indexNowKey.length > 128) {
  console.warn("INDEXNOW_KEY length should be between 8 and 128 characters. Skip IndexNow key file generation.");
  process.exit(0);
}

const publicDir = join(cwd(), "public");
const keyFilePath = join(publicDir, `${indexNowKey}.txt`);

mkdirSync(publicDir, { recursive: true });
writeFileSync(keyFilePath, indexNowKey, "utf8");

console.log(`Generated IndexNow key file for key ${maskKey(indexNowKey)}.`);
