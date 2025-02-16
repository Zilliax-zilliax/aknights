document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".yun-nav-li");
  const contentDivs = document.querySelectorAll(".yun-nav-cont");
  const box = document.getElementById("yun-box");
  const images = box.getElementsByTagName("img");
  const buttons = document
    .getElementById("yun-btns")
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
  navItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }

      // 重置所有状态
      navItems.forEach((nav) => {
        nav.className = "yun-nav-li";
      });
      contentDivs.forEach((div) => {
        div.classList.remove("active");
      });

      // 设置当前状态
      item.className = "yun-nav-li on";
      contentDivs[index].classList.add("active");
      box.style.display = "none";
    });

    item.addEventListener("mouseleave", () => {
      // 移除当前项的激活状态
      item.className = "yun-nav-li";
      contentDivs[index].classList.remove("active");

      // 检查是否有其他项处于hover状态
      const isAnyHovered = Array.from(navItems).some((nav) =>
        nav.matches(":hover")
      );

      if (!isAnyHovered) {
        box.style.display = "block";
        autoPlay();
      }
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
