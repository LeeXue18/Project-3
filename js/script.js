window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const title = document.getElementById('title');
  const intro = document.querySelector('.intro');
  const block = document.querySelector('.block');
  const v1 = document.querySelector('.v1');
  const v2 = document.querySelector('.v2');

  const endScroll = window.innerHeight / 2;
  const progress = Math.min(1, scrollY / endScroll);

  // title 动态样式
  const top = 50 - 50 * progress;
  const scale = 1 + 1.5 * progress;
  const translateY = -50 + 50 * progress;
  const textValue = Math.round(255 - 255 * progress);
  const bgValue = Math.round(51 + (255 - 51) * progress);
  const textColor = `rgb(${textValue}, ${textValue}, ${textValue})`;
  const bgColor = `rgb(${bgValue}, ${bgValue}, ${bgValue})`;

  title.style.top = `${top}%`;
  title.style.transform = `translate(-50%, ${translateY}%) scale(${scale})`;
  title.style.color = textColor;
  document.body.style.backgroundColor = bgColor;
  document.documentElement.style.backgroundColor = bgColor;

  // intro 显示
  if (progress >= 1) {
    intro.classList.add('visible');
  } else {
    intro.classList.remove('visible');
  }

  // title 淡出
  if (scrollY > endScroll + 200) {
    const fadeProgress = Math.min(1, (scrollY - endScroll - 200) / 200);
    title.style.opacity = 1 - fadeProgress;
  } else {
    title.style.opacity = 1;
  }

  // block（如仍在页面中）
  if (scrollY > endScroll + 200 && block) {
    block.classList.add('visible');
  } else if (block) {
    block.classList.remove('visible');
  }

  // ✅ v1 出现：当它进入视口时
  const v1Rect = v1.getBoundingClientRect();
  if (v1Rect.top < window.innerHeight) {
    v1.classList.add('visible');
  }

  // ✅ v2 出现：当它进入视口时
  const v2Rect = v2.getBoundingClientRect();
  if (v2Rect.top < window.innerHeight) {
    v2.classList.add('visible');
  }
});
