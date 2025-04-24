window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const title = document.getElementById('title');
  const intro = document.querySelector('.intro');
  const block = document.querySelector('.block');

  // 滚动范围
  const endScroll = window.innerHeight / 2;
  const progress = Math.min(1, scrollY / endScroll);

  // #title 动态位置 + 缩放
  const top = 50 - 50 * progress;
  const scale = 1 + 1.5 * progress;
  const translateY = -50 + 50 * progress;

  // 背景 & 文字颜色渐变
  const textValue = Math.round(255 - 255 * progress); // 字体白到黑
  const bgValue = Math.round(51 + (255 - 51) * progress); // 背景深灰到白
  const textColor = `rgb(${textValue}, ${textValue}, ${textValue})`;
  const bgColor = `rgb(${bgValue}, ${bgValue}, ${bgValue})`;

  // 应用样式变化
  title.style.top = `${top}%`;
  title.style.transform = `translate(-50%, ${translateY}%) scale(${scale})`;
  title.style.color = textColor;
  document.body.style.backgroundColor = bgColor;
  document.documentElement.style.backgroundColor = bgColor;

  // intro 出现在 title 顶部对齐后
  if (progress >= 1) {
    intro.classList.add('visible');
  } else {
    intro.classList.remove('visible');
  }

  // ✅ title 淡出：滚动超过 endScroll + 200 后逐渐透明
  if (scrollY > endScroll + 200) {
    const fadeProgress = Math.min(1, (scrollY - endScroll - 200) / 200);
    title.style.opacity = 1 - fadeProgress;
  } else {
    title.style.opacity = 1;
  }

  // block 出现
  if (scrollY > endScroll + 200) {
    block.classList.add('visible');
  } else {
    block.classList.remove('visible');
  }
});
