// ========== 滚动控制动画 ==========
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const title = document.getElementById('title');
  const intro = document.querySelector('.intro');
  const block = document.querySelector('.block');
  const v1 = document.querySelector('.v1');
  const v2 = document.querySelector('.v2');
  const v3 = document.querySelector('.v3');
  const v4 = document.querySelector('.v4');

  const endScroll = window.innerHeight / 2;
  const progress = Math.min(1, scrollY / endScroll);

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

  if (progress >= 1) {
    intro.classList.add('visible');
  } else {
    intro.classList.remove('visible');
  }

  if (scrollY > endScroll + 200) {
    const fadeProgress = Math.min(1, (scrollY - endScroll - 200) / 200);
    title.style.opacity = 1 - fadeProgress;
  } else {
    title.style.opacity = 1;
  }

  if (scrollY > endScroll + 200 && block) {
    block.classList.add('visible');
  } else if (block) {
    block.classList.remove('visible');
  }

  [v1, v2, v3, v4].forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});

// ========== 自定义鼠标逻辑，仅限 .v3 .img 区域 ==========
const customCursor = document.createElement('div');
customCursor.id = 'custom-cursor';
customCursor.innerHTML = `<img src="images/v3.png" alt="cursor">`;
document.body.appendChild(customCursor);

const cursorImg = customCursor.querySelector('img');
const v3Image = document.querySelector('.v3 .img');

// 初始样式设置
customCursor.style.position = 'fixed';
customCursor.style.pointerEvents = 'none';
customCursor.style.zIndex = '9999';
customCursor.style.transform = 'translate(-50%, -50%)';
customCursor.style.display = 'none';
cursorImg.style.transition = 'width 0.1s ease, height 0.1s ease';
cursorImg.style.display = 'block';
cursorImg.style.width = `240px`;
cursorImg.style.height = `300px`;

// 全局鼠标跟随（仅在显示时生效）
document.addEventListener('mousemove', (e) => {
  customCursor.style.left = e.clientX + 'px';
  customCursor.style.top = e.clientY + 'px';
});

// 鼠标进入 v3 图片区域 → 显示自定义鼠标 + 隐藏系统鼠标
v3Image.addEventListener('mouseenter', () => {
  customCursor.style.display = 'block';
  document.body.style.cursor = 'none';
});

// 鼠标在 v3 图片内移动 → 根据鼠标位置动态改变宽高
v3Image.addEventListener('mousemove', (e) => {
  const rect = v3Image.getBoundingClientRect();
  const relativeX = e.clientX - rect.left;
  const relativeY = e.clientY - rect.top;
  const percentX = relativeX / rect.width;
  const percentY = relativeY / rect.height;
  const offsetX = (percentX - 0.5) * 6;
  const offsetY = (percentY - 0.5) * 6;

  const baseWidth = 240;
  const baseHeight = 300;
  const maxStretch = 120;

  const newWidth = baseWidth + (-offsetX * maxStretch);
  const newHeight = baseHeight + (offsetY * maxStretch);

  cursorImg.style.width = `${newWidth}px`;
  cursorImg.style.height = `${newHeight}px`;
});

// 鼠标离开 v3 图片区域 → 隐藏自定义光标 + 恢复系统鼠标
v3Image.addEventListener('mouseleave', () => {
  customCursor.style.display = 'none';
  document.body.style.cursor = 'default';
  cursorImg.style.width = `240px`;
  cursorImg.style.height = `300px`;
});

