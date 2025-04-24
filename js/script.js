window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const title = document.getElementById('title');
  const intro = document.querySelector('.intro');
  const block = document.querySelector('.block');

  // 滚动控制点
  const endScroll = window.innerHeight / 2;
  const progress = Math.min(1, scrollY / endScroll);

  // top, scale, translate
  const top = 50 - 50 * progress;
  const scale = 1 + 1.5 * progress;
  const translateY = -50 + 50 * progress;

  // 渐变颜色：字体白→黑，背景深→白
  const textValue = Math.round(255 - 255 * progress);
  const bgValue = Math.round(51 + (255 - 51) * progress);
  const textColor = `rgb(${textValue}, ${textValue}, ${textValue})`;
  const bgColor = `rgb(${bgValue}, ${bgValue}, ${bgValue})`;

  // 应用样式
  title.style.top = `${top}%`;
  title.style.transform = `translate(-50%, ${translateY}%) scale(${scale})`;
  title.style.color = textColor;
  document.body.style.backgroundColor = bgColor;
  document.documentElement.style.backgroundColor = bgColor;

  // intro 显示 + 动态定位
  if (progress >= 1) {
    intro.classList.add('visible');

    // 获取 title 当前底部位置，定位 intro
    const titleHeight = title.offsetHeight * scale; // 放大后的 title 高度
    intro.style.top = `${scrollY + titleHeight + 5}px`;

  } else {
    intro.classList.remove('visible');
    intro.style.top = '160vh';
    intro.style.position = 'absolute';
  }

  // block 漂浮显现
  if (scrollY > endScroll + 200) {
    const fadeProgress = Math.min(1, (scrollY - endScroll - 200) / 200);
    title.style.opacity = 1 - fadeProgress;
    block.classList.add('visible');
  } else {
    title.style.opacity = 1;
    block.classList.remove('visible');
  }
});

