const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// 初始化画笔
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000';

// 开始绘制
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
});

// 绘制中
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  const [x, y] = getPosition(e);
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
});

// 结束绘制
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

// 触摸设备支持
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // 阻止移动端滚动
  isDrawing = true;
  const touch = e.touches[0];
  [lastX, lastY] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop];
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (!isDrawing) return;
  const touch = e.touches[0];
  const [x, y] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop];
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
});

// 清除签名
document.getElementById('clear-btn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 保存签名（转为图片下载）
document.getElementById('save-btn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'signature_' + Date.now() + '.png';
  link.click();
});

// 获取相对于canvas的坐标
function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  return [e.clientX - rect.left, e.clientY - rect.top];
}