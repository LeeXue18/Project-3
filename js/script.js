window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const title = document.getElementById('title');
  const content = document.querySelector('.content');
  const block = document.querySelector('.block');

  // 滚动区间设置（视觉窗口内移动的最大距离）
  const startScroll = 0;
  const endScroll = window.innerHeight / 2; // 让它移到视觉顶部时正好完成

  const progress = Math.min(1, scrollY / endScroll);

  // 动态 top、scale
  const top = 50 - 50 * progress; // 从50%变到0%
  const scale = 1 + 1.5 * progress; // 从1到2.5

  // 动态颜色
  const textValue = Math.round(255 - (255 - 0) * progress); // 字体从白变 #333
  const bgValue = Math.round(0 + (255 - 0) * progress);    // 背景从 #333 变白
  const textColor = `rgb(${textValue}, ${textValue}, ${textValue})`;
  const bgColor = `rgb(${bgValue}, ${bgValue}, ${bgValue})`;

  // 应用变换
  title.style.top = `${top}%`;
  const translateY = -50 + 50 * progress;
  title.style.transform = `translate(-50%, ${translateY}%) scale(${scale})`;
  title.style.color = textColor;
  document.body.style.backgroundColor = bgColor;
  document.documentElement.style.backgroundColor = bgColor;


  // 出现内容和方块
  if (scrollY > endScroll + 200) {
    content.classList.add('visible');
  } else {
    content.classList.remove('visible');
  }

  if (scrollY > endScroll + 400) {
    const fadeProgress = Math.min(1, (scrollY - endScroll - 400) / 200);
    title.style.opacity = 1 - fadeProgress;
    block.classList.add('visible');
  } else {
    title.style.opacity = 1;
    block.classList.remove('visible');
  }
});

