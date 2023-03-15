class Slider {
    constructor(elemSelector) {
      this.currentSlide = 0;
      this.sliderSelector = elemSelector;
      this.elem = null;
      this.slider = null;
      this.sliders = null;
      this.prev = null;
      this.next = null;
      this.dots = [];

      this.generateSlider();
      this.changeSlide(this.currentSlide);
      this.handleMouseEnter();
      this.handleMouseMove();
    }

    generateSlider() {
      this.slider = document.querySelector(this.sliderSelector);
      this.slider.classList.add("slider");
      this.slider.style.opacity = "1";

      const slidesCnt = document.createElement("div");
      slidesCnt.classList.add("slider-slides-cnt");

      this.slides = this.slider.children;

      while (this.slides.length) {
        this.slides[0].classList.add("slider-slide");
        slidesCnt.append(this.slides[0]);
      }

      this.slides = slidesCnt.querySelectorAll(".slider-slide");
      this.slider.append(slidesCnt);

      this.createPrevNext();
      this.createPagination();
    }

    changeSlide(index) {
      this.slides.forEach((slide) => {
        slide.classList.remove("slider-slide-active");
        slide.setAttribute("aria-hidden", true);
      });
      this.slides[index].classList.add("slider-slide-active");
      this.slides[index].setAttribute("aria-hidden", false);

      this.dots.forEach((dot) => {
        dot.classList.remove("slider-pagination-element-active");
      });
      this.dots[index].classList.add("slider-pagination-element-active");
      this.cuttentSlide = index;
      clearTimeout(this.time);
      this.time = setTimeout(() => this.slideNext(), 5000);
    }

    createPrevNext() {
      this.prev = document.createElement("button");
      this.prev.type = "button";
      this.prev.classList.add("slider-button");
      this.prev.classList.add("slider-button-prev");
      this.prev.addEventListener("click", this.slidePrev.bind(this));

      this.next = document.createElement("button");
      this.next.type = "button";
      this.next.classList.add("slider-button");
      this.next.classList.add("slider-button-next");
      this.next.addEventListener("click", this.slideNext.bind(this));

      const nav = document.createElement("div");
      nav.classList.add("slider-nav");
      nav.appendChild(this.prev);
      nav.appendChild(this.next);
      this.slider.appendChild(nav);
    }

    createPagination() {
      const ulDots = document.createElement("ul");
      ulDots.classList.add("slider-pagination");

      for (let i = 0; i < this.slides.length; i++) {
        const li = document.createElement("li");
        li.classList.add("slider-pagination-element");

        const btn = document.createElement("button");
        btn.classList.add("slider-pagination-button");
        btn.type = "button";
        btn.innerText = i + 1;
        btn.setAttribute("aria-label", `Ustaw slajd ${i + 1}`);
        btn.addEventListener("click", () => this.changeSlide(i));
        li.appendChild(btn);
        ulDots.appendChild(li);
        this.dots.push(li);
      }
      this.slider.appendChild(ulDots);
    }

    slidePrev() {
      this.currentSlide--;
      if (this.currentSlide < 0) {
        this.currentSlide = this.slides.length - 1;
      }
      this.changeSlide(this.currentSlide);
    }

    slideNext() {
      this.currentSlide++;
      if (this.currentSlide > this.slides.length - 1) {
        this.currentSlide = 0;
      }
      this.changeSlide(this.currentSlide);
    }

    handleMouseEnter() {
      this.slider.addEventListener("mouseover", () => {
        clearTimeout(this.time);
      });
      this.slider.addEventListener("mouseleave", () => {
        clearTimeout(this.time);
        this.time = setTimeout(() => this.slideNext(), 5000);
      });
    }
    handleMouseMove() {
      let touchstartX = 0;
      let touchendX = 0;

      const handleNext = this.slideNext.bind(this);
      const handlePrev = this.slidePrev.bind(this);

      function checkDirection() {
        // if (touchendX != touchstartX) {
        //   document.body.style.overflow = "hidden";
        if (touchendX < touchstartX) {
          handleNext();
        }
        if (touchendX > touchstartX) {
          handlePrev();
        }
        // } else {
        //   document.body.style.overflow = "initial";
        // }
      }
      this.slider.addEventListener("touchstart", (e) => {
        touchstartX = e.changedTouches[0].screenX;
        document.body.style.overflow = "hidden";
      });

      this.slider.addEventListener("touchend", (e) => {
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
        document.body.style.overflow = "auto";
      });
    }
  }

  const mainSliderUniversal = document.getElementById("mainSliderUniversal");
  const mainSliderSpecial = document.getElementById("mainSliderSpecial");
  const mainSliderMainPage = document.querySelector(".shop_index #mainSlider");

  mainSliderUniversal
    ? (triggerSliderUniwersal = true)
    : (triggerSliderUniwersal = false);
  mainSliderSpecial
    ? (triggerSliderSpecial = true)
    : (triggerSliderSpecial = false);
  mainSliderMainPage
    ? (triggerMainSliderMainPage = true)
    : (triggerMainSliderMainPage = false);

  // box_bestsellers ? (triggerOn2 = true) : (triggerOn2 = false);

  if (!mainSliderSpecial && triggerSliderUniwersal) {
    const mainSliderUniversalOn = new Slider("#mainSliderUniversal");
    mainSliderUniversal.classList.add("active");
  } else if (triggerSliderSpecial) {
    const triggermainSliderSpecialOn = new Slider("#mainSliderSpecial");
  }
  if (mainSliderMainPage) {
    const mainSliderMainPage = new Slider("#mainSlider");
  }
