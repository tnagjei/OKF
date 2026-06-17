import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { siteConfig } from "../site.config.mjs";

const root = process.cwd();
const publicDir = path.join(root, "public");
fs.mkdirSync(publicDir, { recursive: true });

function gameInitials(name) {
  const words = String(name || "OKF")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "OK";
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function themeShape(accentColor) {
  // 抽象的三角形和横条（知识库/Astro风格）
  return `<path d="M160 284 256 120l96 164h-58l-38-70-38 70h-58Z" fill="${accentColor}" /><path d="M170 342h172v42H170z" fill="#ffffff" opacity="0.92" />`;
}

function buildSvg({ siteName, gameName, brandColor, accentColor }) {
  const initials = gameInitials(gameName);
  const safeTitle = `${siteName} icon`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="${safeTitle}">
  <rect width="512" height="512" rx="112" fill="${brandColor}" />
  <circle cx="256" cy="256" r="170" fill="#ffffff" opacity="0.08" />
  ${themeShape(accentColor)}
  <rect x="154" y="360" width="204" height="70" rx="35" fill="${brandColor}" opacity="0.88" />
  <text x="256" y="412" text-anchor="middle" font-family="Arial, sans-serif" font-size="50" font-weight="800" fill="#ffffff">${initials}</text>
</svg>
`;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
}

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

// 绘制具有圆角和中心三角形的 PNG
function createPng(size, brandColor, accentColor) {
  const [br, bg, bb] = hexToRgb(brandColor);
  const [ar, ag, ab] = hexToRgb(accentColor);
  const raw = Buffer.alloc((size * 4 + 1) * size);

  // 检查是否在中心等腰三角形中
  function checkTriangle(x, y) {
    // 抽象三角形
    // 顶点：(size*0.5, size*0.25)
    // 左底：(size*0.3, size*0.6)
    // 右底：(size*0.7, size*0.6)
    const cy = size * 0.25;
    const h = size * 0.35;
    if (y >= cy && y <= cy + h) {
      const t = (y - cy) / h;
      const halfW = size * 0.2 * t;
      const dx = Math.abs(x - size * 0.5);
      if (dx <= halfW) {
        // 内层挖空，形成中空的感觉
        const innerHalfW = size * 0.08 * t;
        if (dx <= innerHalfW && y >= cy + h * 0.3) {
          return false;
        }
        return true;
      }
    }
    // 底部的横条
    if (y >= size * 0.68 && y <= size * 0.76 && x >= size * 0.32 && x <= size * 0.68) {
      return true;
    }
    return false;
  }

  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0;
    for (let x = 0; x < size; x += 1) {
      const offset = rowStart + 1 + x * 4;

      let r_val = br, g_val = bg, b_val = bb;

      // 检查圆角矩形背景
      const cx = size * 0.5;
      const cy = size * 0.5;
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const r_limit = size * 0.5;

      const cornerR = size * 0.22;
      const limitX = r_limit - cornerR;
      const limitY = r_limit - cornerR;
      
      let isInsideBg = true;
      if (dx > limitX && dy > limitY) {
        const dist = Math.sqrt((dx - limitX) ** 2 + (dy - limitY) ** 2);
        if (dist > cornerR) {
          isInsideBg = false;
        }
      }

      if (isInsideBg) {
        if (checkTriangle(x, y)) {
          r_val = ar;
          g_val = ag;
          b_val = ab;
        }
      } else {
        raw[offset + 3] = 0;
        continue;
      }

      raw[offset] = r_val;
      raw[offset + 1] = g_val;
      raw[offset + 2] = b_val;
      raw[offset + 3] = 255;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const idat = zlib.deflateSync(raw);
  return Buffer.concat([signature, pngChunk("IHDR", ihdr), pngChunk("IDAT", idat), pngChunk("IEND", Buffer.alloc(0))]);
}

const siteName = siteConfig.name || "Open Knowledge Format Guide";
const gameName = siteConfig.shortName || "OKF Guide";
const brandColor = siteConfig.brandColor || "#0f172a";
const accentColor = siteConfig.accentColor || "#38bdf8";

const svg = buildSvg({ siteName, gameName, brandColor, accentColor });
const webmanifest = {
  name: siteName,
  short_name: gameName.slice(0, 24),
  start_url: "/",
  display: "standalone",
  background_color: brandColor,
  theme_color: brandColor,
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "/icon-192.webp", sizes: "192x192", type: "image/webp" },
    { src: "/icon-512.webp", sizes: "512x512", type: "image/webp" }
  ]
};

for (const file of ["favicon.svg", "icon.svg"]) {
  fs.writeFileSync(path.join(publicDir, file), svg);
}

for (const size of [16, 32, 48, 96, 192, 512]) {
  fs.writeFileSync(path.join(publicDir, `icon-${size}.png`), createPng(size, brandColor, accentColor));
}

fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), createPng(180, brandColor, accentColor));
fs.writeFileSync(path.join(publicDir, "favicon.ico"), createPng(32, brandColor, accentColor));
fs.writeFileSync(path.join(publicDir, "icon-192.webp"), createPng(192, brandColor, accentColor));
fs.writeFileSync(path.join(publicDir, "icon-512.webp"), createPng(512, brandColor, accentColor));
fs.writeFileSync(path.join(publicDir, "site.webmanifest"), `${JSON.stringify(webmanifest, null, 2)}\n`);

console.log("Generated themed favicon assets in public/.");
