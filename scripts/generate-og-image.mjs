// input: siteConfig brand and accent colors
// output: 1200x630 OG share image PNG written to public/og-image.png
// pos: OG image generator (update rule: sync this header and scripts README when this file changes)
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { siteConfig } from "../site.config.mjs";

// 画布尺寸遵循 Open Graph 推荐比例 1.91:1
const WIDTH = 1200;
const HEIGHT = 630;

const brandColor = siteConfig.brandColor || "#0f172a";
const accentColor = siteConfig.accentColor || "#38bdf8";
const siteName = siteConfig.name || "Open Knowledge Format Guide";
const shortName = siteConfig.shortName || "OKF Guide";

const root = process.cwd();
const publicDir = path.join(root, "public");
fs.mkdirSync(publicDir, { recursive: true });

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16)
  ];
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

// 纯像素手绘：品牌色背景 + 渐变光晕 + 中央几何图标 + 右侧留白
// 字体无法在零依赖下手绘，因此用与 favicon 一致的几何符号（三角形 + 横条）作为主视觉
function createOgPng(width, height, brandHex, accentHex) {
  const [br, bg, bb] = hexToRgb(brandHex);
  const [ar, ag, ab] = hexToRgb(accentHex);
  // 输出 RGBA 原始像素，每行前加 filter 字节 0
  const raw = Buffer.alloc((width * 4 + 1) * height);

  const cx = width / 2;
  const cy = height / 2;

  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    for (let x = 0; x < width; x += 1) {
      const offset = rowStart + 1 + x * 4;

      // 背景基底：品牌色叠加从左上到右下的径向高光
      const dx = (x - width * 0.25) / width;
      const dy = (y - height * 0.3) / height;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const glow = Math.max(0, 1 - dist * 2.2) * 0.18;

      let r_val = Math.min(255, Math.round(br + 255 * glow));
      let g_val = Math.min(255, Math.round(bg + 255 * glow));
      let b_val = Math.min(255, Math.round(bb + 255 * glow));

      // 右侧大尺寸圆角矩形画板，承载主视觉
      // 画板范围：x [680, 1100], y [115, 515]
      const plateLeft = 680;
      const plateRight = 1100;
      const plateTop = 115;
      const plateBottom = 515;
      const plateR = 36;
      const inPlate =
        x >= plateLeft + plateR || x <= plateRight - plateR ? y >= plateTop && y <= plateBottom : true;
      const plateCornerOk =
        (x < plateLeft + plateR && y < plateTop + plateR
          ? (x - plateLeft - plateR) ** 2 + (y - plateTop - plateR) ** 2 <= plateR * plateR
          : true) &&
        (x > plateRight - plateR && y < plateTop + plateR
          ? (x - plateRight + plateR) ** 2 + (y - plateTop - plateR) ** 2 <= plateR * plateR
          : true) &&
        (x < plateLeft + plateR && y > plateBottom - plateR
          ? (x - plateLeft - plateR) ** 2 + (y - plateBottom + plateR) ** 2 <= plateR * plateR
          : true) &&
        (x > plateRight - plateR && y > plateBottom - plateR
          ? (x - plateRight + plateR) ** 2 + (y - plateBottom + plateR) ** 2 <= plateR * plateR
          : true);
      const onPlate = x >= plateLeft && x <= plateRight && y >= plateTop && y <= plateBottom && plateCornerOk;

      if (onPlate) {
        // 画板用更亮的品牌色
        const lift = 14;
        r_val = Math.min(255, br + lift);
        g_val = Math.min(255, bg + lift);
        b_val = Math.min(255, bb + lift);

        // 画板上的几何图标：与 favicon 一致的中空三角形 + 底部横条
        // 三角形顶点 (cx_plate, plateTop+90)，底边在 plateBottom-150
        const pcx = (plateLeft + plateRight) / 2;
        const triTopY = plateTop + 100;
        const triBottomY = plateBottom - 150;
        const triH = triBottomY - triTopY;
        if (y >= triTopY && y <= triBottomY) {
          const t = (y - triTopY) / triH;
          const halfW = 130 * t;
          const innerHalfW = 52 * t;
          const ddx = Math.abs(x - pcx);
          if (ddx <= halfW) {
            // 内层挖空，形成中空感
            const inHollow = ddx <= innerHalfW && y >= triTopY + triH * 0.35;
            if (!inHollow) {
              r_val = ar;
              g_val = ag;
              b_val = ab;
            }
          }
        }
        // 底部横条
        const barTop = plateBottom - 110;
        const barBottom = plateBottom - 70;
        if (y >= barTop && y <= barBottom && x >= pcx - 150 && x <= pcx + 150) {
          r_val = ar;
          g_val = ag;
          b_val = ab;
        }
      }

      // 左侧细分隔线，强化双栏结构（x = 600 附近）
      if (x >= 596 && x <= 600 && y >= 180 && y <= 450) {
        r_val = ar;
        g_val = ag;
        b_val = ab;
      }

      // 底部品牌色横条，做底边收口
      if (y >= height - 8) {
        r_val = ar;
        g_val = ag;
        b_val = ab;
      }

      raw[offset] = r_val;
      raw[offset + 1] = g_val;
      raw[offset + 2] = b_val;
      raw[offset + 3] = 255;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 位深
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const idat = zlib.deflateSync(raw);
  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0))
  ]);
}

const png = createOgPng(WIDTH, HEIGHT, brandColor, accentColor);
fs.writeFileSync(path.join(publicDir, "og-image.png"), png);

console.log(`Generated OG share image: public/og-image.png (${WIDTH}x${HEIGHT})`);
console.log(`  site: ${siteName} | short: ${shortName}`);
