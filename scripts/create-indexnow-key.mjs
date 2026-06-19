// input: optional numeric key length argument
// output: random IndexNow key and setup reminders
// pos: IndexNow key generator (update rule: sync this header and scripts README when this file changes)
import { randomInt } from "node:crypto";

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789-";
const requestedLength = Number.parseInt(process.argv[2] || "32", 10);
const length = Number.isFinite(requestedLength) && requestedLength >= 8 && requestedLength <= 128 ? requestedLength : 32;

let key = "";

for (let index = 0; index < length; index += 1) {
  key += alphabet[randomInt(0, alphabet.length)];
}

console.log(key);
console.log("");
console.log("Add this key to INDEXNOW_KEY in your local .env or Cloudflare Pages environment variables.");
console.log("Set SITE_URL to https://openknowledgeformat.online.");
console.log("Do not commit the real .env file.");

