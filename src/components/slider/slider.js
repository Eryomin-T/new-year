function customSlider() {
  let sliderTop = $('.slider__top');
  let sliderTopCurrentSlide = $('.slider__top .slider__slide');
  let sliderControlsCurrentSlide = $('.slider__controls .slider__slide');
  let sliderTopSlideWidth = sliderTopCurrentSlide.width();
  let tmp = sliderTopCurrentSlide.length - 1
  let sliderTopWidth = sliderTopSlideWidth * tmp;
  let sliderSlidingWidth = 0;
  let sliderBtnPrev = $('.slider__btn-prev');
  let sliderBtnNext = $('.slider__btn-next');
  let i = 0;
  $(sliderTopCurrentSlide[i]).addClass('active');
  $(sliderControlsCurrentSlide[i]).addClass('active');

  function slidePrev() {
    sliderSlidingWidth -= sliderTopSlideWidth;
    $(sliderTopCurrentSlide[i]).removeClass('active');
    $(sliderControlsCurrentSlide[i]).removeClass('active');
    i--;
    if(i < 0) {
      i = sliderTopCurrentSlide.length - 1;
    }
    $(sliderTopCurrentSlide[i]).addClass('active');
    $(sliderControlsCurrentSlide[i]).addClass('active');

    if (sliderSlidingWidth < 0) {
      $(sliderTop).css({
        transform: `translateX(${-sliderTopWidth}px)`
      })
      sliderSlidingWidth = sliderTopWidth;
    }
    else {
      $(sliderTop).css({
        transform: `translateX(${-sliderSlidingWidth}px)`
      })
    }
  }

  function slideNext() {
    sliderSlidingWidth += sliderTopSlideWidth;
    $(sliderTopCurrentSlide[i]).removeClass('active');
    $(sliderControlsCurrentSlide[i]).removeClass('active');
    i++;
    if(i > sliderTopCurrentSlide.length - 1) {
      i = 0;
    }
    $(sliderTopCurrentSlide[i]).addClass('active');
    $(sliderControlsCurrentSlide[i]).addClass('active');

    if (sliderSlidingWidth > sliderTopWidth) {
      $(sliderTop).css({
        transform: `translateX(${0}px)`
      })
      sliderSlidingWidth = 0;
    }
    else {
      $(sliderTop).css({
        transform: `translateX(${-sliderSlidingWidth}px)`
      })
    }
  }

  sliderBtnPrev.on('click', function () {
    slidePrev();
  })

  sliderBtnNext.on('click', function () {
    slideNext();
  })

  sliderTopCurrentSlide.on('touchstart', function (e) {
    let touchStartPosition = e.changedTouches[0].clientX;

    $(this).on('touchend', function(e) {
      let touchendPosition = e.changedTouches[0].clientX;

      if(touchendPosition < touchStartPosition) {
        slideNext();
      }
      else if (touchendPosition > touchStartPosition) {
        slidePrev();
      }
    })
  })
}


customSlider();

