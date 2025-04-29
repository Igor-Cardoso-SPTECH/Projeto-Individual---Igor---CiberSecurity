const fps = 60;
const color = "rgba(0, 255, 0, 0.1)";
const charset = "0123456789ABCDEF";
const size = 20;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h, p;

const resize = () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  p = Array(Math.ceil(w / size)).fill(0);
};

window.addEventListener("resize", resize);
resize();

const draw = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = color;
  ctx.font = `${size}px monospace`;

  p.forEach((y, i) => {
    const text = charset.charAt(Math.floor(Math.random() * charset.length));
    const x = i * size;
    ctx.fillText(text, x, y);
    p[i] = y > h + Math.random() * 10000 ? 0 : y + size;
  });
};

setInterval(draw, 1000 / fps);
