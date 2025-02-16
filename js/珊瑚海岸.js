document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.getElementsByClassName("sanhu-nav-li");
  const contentDivs = document.getElementsByClassName("sanhu-nav-cont");
  const box = document.getElementById("sanhu-box");
  const images = box.getElementsByTagName("img");
  const buttons = document
    .getElementById("sanhu-btns")
    .getElementsByTagName("button");

  let currentIndex = 0;
  let timer = null;
  const INTERVAL = 3000;

  // 初始化显示状态
  const init = () => {
    images[0].style.opacity = "1";
    buttons[0].className = "hover";
    box.style.display = "block";
  };

  // 切换图片函数
  const switchImage = (index) => {
    Array.from(images).forEach((img, i) => {
      img.style.opacity = "0";
      buttons[i].className = "";
    });
    images[index].style.opacity = "1";
    buttons[index].className = "hover";
    currentIndex = index;
  };

  // 自动播放函数
  const autoPlay = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      switchImage(currentIndex);
    }, INTERVAL);
  };

  // 初始化
  init();
  autoPlay();

  // 鼠标进入停止轮播
  box.addEventListener("mouseenter", () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  });

  // 鼠标离开继续轮播
  box.addEventListener("mouseleave", () => {
    autoPlay();
  });

  // 导航菜单交互
  Array.from(navItems).forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }

      // 重置所有状态
      Array.from(navItems).forEach((nav, i) => {
        nav.className = "sanhu-nav-li";
        contentDivs[i].classList.remove("active");
      });

      // 设置当前状态
      item.className = "sanhu-nav-li on";
      contentDivs[index].classList.add("active");
      box.style.display = "none";
    });

    item.addEventListener("mouseleave", () => {
      item.className = "sanhu-nav-li";
      contentDivs[index].classList.remove("active");
      box.style.display = "block";
      autoPlay();
    });
  });

  // 底部按钮切换图片
  Array.from(buttons).forEach((button, index) => {
    button.addEventListener("click", () => {
      switchImage(index);
      autoPlay();
    });
  });
});
