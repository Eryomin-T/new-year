$(function() {
  function timeToEvent(eventDateTimestamp) {
  let eventDate = new Date(eventDateTimestamp * 1000);
  let today = new Date();
  today = Math.floor((eventDate - today) / 1000);

  let tsec = today%60;
  if(tsec < 10) tsec = '0' + tsec;
  today = Math.floor(today / 60);

  let tmin = today%60;
  if(tmin < 10) tmin = '0' + tmin;
  today = Math.floor(today / 60);

  let thour = today%24;
  if(thour < 10) thour = '0' + thour;
  today = Math.floor(today / 24);

  let items = document.querySelectorAll('.date__item');

  for(let i = 0; i < items.length; i++) {
    let dataValue = items[i].getAttribute('data-time-units');
    let countItem = items[i].querySelector('.date__count');

    if(dataValue === 'days') {
      if(today >= 0) {
        countItem.innerHTML = today;
      }
    }
    else if(dataValue === 'hours') {
      if(thour >= 0) {
        countItem.innerHTML = thour;
      }
    }
    else if(dataValue === 'minutes') {
      if(tmin >= 0) {
        countItem.innerHTML = tmin;
      }
    }
    else if(dataValue === 'seconds') {
      if(tsec >= 0) {
        countItem.innerHTML = tsec;
      }
    }
  }
}

setInterval(()=> {
  timeToEvent(1613830812 );
}, 1000);
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

;
  let sidebar = $('.sidebar');
let sidebarToggleBtn = $('.sidebar__toggle');
let sidebarToggleBurger = $('.sidebar__burger');

$(sidebarToggleBtn).add(sidebarToggleBurger).on('click', function() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    $('.main').toggleClass('hide');
    sidebar.toggleClass('open');
  }
  else {
    sidebar.toggleClass('open');
  }
});
  function tabs() {
  let tabsNavItem = $('.tabs__nav-item');
  let tabsNavItemActive = $('.tabs__nav-item.active');
  let tabsContentItem = $('.tabs__content-item');
  let tabsContentItemActive = $('.tabs__content-item.active');

  tabsNavItem.on('click', function() {
    let tabsNavCurrent = $(this);
    let tabsNavCurrentIndex = tabsNavCurrent.index();
    let tabsContentCurrent = tabsContentItem.eq(tabsNavCurrentIndex);

    tabsNavItemActive.removeClass('active');
    tabsContentItemActive.removeClass('active');
    tabsNavCurrent.addClass('active');
    tabsContentCurrent.addClass('active');

    tabsNavItemActive = tabsNavCurrent;
    tabsContentItemActive = tabsContentCurrent;
  })
}

tabs();;
  class CustomSelect {
  constructor(selector) {
    this._$main = document.querySelector(selector);
    this._$trigger = this._$main.querySelector('[data-select="trigger"]');
    this._addEventListener();
  }

  _isShow() {
    //берем все классы his._$main и сравниваем есть ли среди них select_show
    return this._$main.classList.contains('select_show');
  }

  _changeItem(item) {
    //если клик был по не выбранному элементу
    if (!item.classList.contains('select__item_selected')) {
      const itemSelected = this._$main.querySelector('.select__item_selected');
      if (itemSelected) {
        //убераем активный класс у ранее выбранного элемента
        itemSelected.classList.remove('select__item_selected');
      }
      // устанавливаем активный класс новому элементу
      item.classList.add('select__item_selected');
    }
  }

  _eventHandler(e) {
    let $target = e.target;
    let type = $target.dataset.select;

    if (type === 'trigger') {
      this.toggle();
    }
    else if (type === 'item') {
      this._changeItem($target);
      this.hide();
    }
    else if (type === 'backdrop') {
      // закрываем селект, если кликнули вне его
      this.hide();
    }
  }

  _addEventListener() {
    // привяжем функцию _eventHandler к контексту this
    this._eventHand = this._eventHandler.bind(this);
    // добавим слушатель
    this._$main.addEventListener('click', this._eventHand);
  }

  show() {
    this._$main.classList.add('select_show');
  }
  hide() {
    this._$main.classList.remove('select_show');
  }
  toggle() {
    this._isShow() ? this.hide() : this.show();
  }
}

const select1 = new CustomSelect('#select-1');;
  let actualItem = [
  {
    id: 1,
    datePublish: 1550125544,
    video: 'https://www.youtube.com/embed/vMdq07Q3qU4',
    img: 'images/master-list-card1.jpg',
    title: 'Скетч от команды “Веселые ребята”',
    text: 'Популярная церемония анонимного обмена подарками. Перед вами сайт для организации онлайн жеребьевки на Тайного Санту.'
  },
  {
    id: 2,
    datePublish: 1581315944,
    video: 'https://player.vimeo.com/video/265045525',
    img: 'images/master-list-card2.png',
    title: 'Командное выступление в Полуфинале',
    text: 'Популярная церемония анонимного обмена подарками.'
  },
  {
    id: 3,
    datePublish: 1566714344,
    video: 'https://player.vimeo.com/video/259411563',
    img: 'images/master-list-card3.png',
    title: 'Австрия никогда не хотела и не хочет войны. Она предает нас. Россия одна должна быть спасительницей Европы.',
    text: 'Наш благодетель знает свое высокое призвание и будет верен ему. Вот одно, во что я верю.'
  },
  {
    id: 4,
    datePublish: 1573107944,
    video: 'https://player.vimeo.com/video/243244233',
    img: 'images/master-list-card1.jpg',
    title: 'Мы одни должны искупить кровь праведника. ',
    text: 'Нашему доброму и чудному государю предстоит величайшая роль в мире, и он так добродетелен и хорош, что Бог не оставит его,'
  },
  {
    id: 5,
    datePublish: 1586672744,
    video: 'https://player.vimeo.com/video/243244233',
    img: 'images/master-list-card1.jpg',
    title: 'Она отказалась очистить Мальту.',
    text: 'Англия с своим коммерческим духом не поймет и не может понять всю высоту души императора Александра.'
  },
  {
    id: 6,
    datePublish: 1613111144,
    video: 'https://www.youtube.com/embed/p-5mhOgSwaY',
    img: 'images/master-list-card1.jpg',
    title: 'Что они сказали Новосильцеву?',
    text: 'Она хочет видеть, ищет заднюю мысль наших действий.'
  },
  {
    id: 7,
    datePublish: 1567923944,
    video: 'https://player.vimeo.com/video/243244233',
    img: 'images/master-list-card1.jpg',
    title: 'Скетч от команды “Веселые ребята”',
    text: 'Популярная церемония анонимного обмена подарками. Перед вами сайт для организации онлайн жеребьевки на Тайного Санту.'
  },
  {
    id: 8,
    datePublish: 1549779944,
    video: 'https://player.vimeo.com/video/243244233',
    img: 'images/master-list-card2.png',
    title: 'Командное выступление в Полуфинале',
    text: 'Популярная церемония анонимного обмена подарками.'
  },
  {
    id: 9,
    datePublish: 1583994344,
    video: 'https://www.youtube.com/embed/oi6e-6PWgiQ',
    img: 'images/master-list-card3.png',
    title: 'Австрия никогда не хотела и не хочет войны. Она предает нас. Россия одна должна быть спасительницей Европы.',
    text: 'Наш благодетель знает свое высокое призвание и будет верен ему. Вот одно, во что я верю.'
  },
  {
    id: 10,
    datePublish: 1601792744,
    video: 'https://www.youtube.com/embed/rJbuc-LxpV8',
    img: 'images/master-list-card1.jpg',
    title: 'Мы одни должны искупить кровь праведника. ',
    text: 'Нашему доброму и чудному государю предстоит величайшая роль в мире, и он так добродетелен и хорош, что Бог не оставит его,'
  },
  {
    id: 11,
    datePublish: 1554186344,
    video: 'https://www.youtube.com/embed/p-5mhOgSwaY',
    img: 'images/master-list-card1.jpg',
    title: 'Она отказалась очистить Мальту.',
    text: 'Англия с своим коммерческим духом не поймет и не может понять всю высоту души императора Александра.'
  },
  {
    id: 12,
    datePublish: 1618208744,
    video: 'https://www.youtube.com/embed/I-AVYrL1M2w',
    img: 'images/master-list-card1.jpg',
    title: 'Что они сказали Новосильцеву?',
    text: 'Она хочет видеть, ищет заднюю мысль наших действий.'
  },
]

let pastMasterClassesArticles = [
  {
    id: 1,
    img: 'images/master-list-card-past1.jpg',
    date: '21.12.2020',
    time: '18:00 МСК',
    title: 'Декор новогоднего носка',
    text: 'Из самых обычных шерстяных ниток можно создавать оригинальные праздничные украшения и новогодние елочные игрушки. Нитки — это безопасный материал, с которым смогут работать даже дошкольники. Мы покажем вам несколько способов изготовления игрушек из шерстяных ниток.',
    contentTitle: 'Что нам понадобится?',
    contentSubtitle: 'Для изготовления елочных игрушек из шерстяных ниток нам понадобятся простые подручные материалы:',
    contentList: ['нитки', 'шерстяные нити', 'клей и картон', 'проволока', 'фурнитура для декора', 'шнуры и ленты', 'блестки и снежный спрей'],
  },
  {
    id: 2,
    img: 'images/master-list-card-past2.jpg',
    date: '10.11.1991',
    time: '14:00 МСК',
    title: 'развал ССР',
    text: 'процессы системной дезинтеграции в социальной структуре, народном хозяйстве',
    contentTitle: 'Причины распада',
    contentSubtitle: 'В настоящее время нет единой оценки и исчерпывающего анализа причин, приведших к распаду СССР. Среди многочисленных факторов, повлиявших на этот процесс, называют следующие:',
    contentList: ['крах прежней идеологии', 'распространение новых идеологических ценностей', 'ослабление союзной власти', 'неблагоприятная динамика цен на нефть', 'государственная цензура,'],
  },
  {
    id: 3,
    img: 'images/master-list-card-past3.jpg',
    date: '05.03.2055',
    time: '18:00 МСК',
    title: 'Киберпанк',
    text: 'Из самых обычных шерстяных ниток можно создавать оригинальные праздничные украшения и новогодние елочные игрушки. Нитки — это безопасный материал, с которым смогут работать даже дошкольники. Мы покажем вам несколько способов изготовления игрушек из шерстяных ниток.',
    contentTitle: 'Что нам понадобится?',
    contentSubtitle: 'Для изготовления елочных игрушек из шерстяных ниток нам понадобятся простые подручные материалы:',
    contentList: ['нитки', 'шерстяные нити', 'клей и картон', 'проволока', 'фурнитура для декора', 'шнуры и ленты', 'блестки и снежный спрей'],
  },
  {
    id: 4,
    img: 'images/master-list-card-past1.jpg',
    date: '05.03.2055',
    time: '18:00 МСК',
    title: 'Киберпанк',
    text: 'Из самых обычных шерстяных ниток можно создавать оригинальные праздничные украшения и новогодние елочные игрушки. Нитки — это безопасный материал, с которым смогут работать даже дошкольники. Мы покажем вам несколько способов изготовления игрушек из шерстяных ниток.',
    contentTitle: 'Что нам понадобится?',
    contentSubtitle: 'Для изготовления елочных игрушек из шерстяных ниток нам понадобятся простые подручные материалы:',
    contentList: ['нитки', 'шерстяные нити', 'клей и картон', 'проволока', 'фурнитура для декора', 'шнуры и ленты', 'блестки и снежный спрей'],
  },
  {
    id: 5,
    img: 'images/master-list-card-past2.jpg',
    date: '10.11.1991',
    time: '14:00 МСК',
    title: 'развал ССР',
    text: 'процессы системной дезинтеграции в социальной структуре, народном хозяйстве',
    contentTitle: 'Причины распада',
    contentSubtitle: 'В настоящее время нет единой оценки и исчерпывающего анализа причин, приведших к распаду СССР. Среди многочисленных факторов, повлиявших на этот процесс, называют следующие:',
    contentList: ['крах прежней идеологии', 'распространение новых идеологических ценностей', 'ослабление союзной власти', 'неблагоприятная динамика цен на нефть', 'государственная цензура,'],
  },
  {
    id: 6,
    img: 'images/master-list-card-past3.jpg',
    date: '05.03.2055',
    time: '18:00 МСК',
    title: 'Киберпанк',
    text: 'Из самых обычных шерстяных ниток можно создавать оригинальные праздничные украшения и новогодние елочные игрушки. Нитки — это безопасный материал, с которым смогут работать даже дошкольники. Мы покажем вам несколько способов изготовления игрушек из шерстяных ниток.',
    contentTitle: 'Что нам понадобится?',
    contentSubtitle: 'Для изготовления елочных игрушек из шерстяных ниток нам понадобятся простые подручные материалы:',
    contentList: ['нитки', 'шерстяные нити', 'клей и картон', 'проволока', 'фурнитура для декора', 'шнуры и ленты', 'блестки и снежный спрей'],
  },
]

let listActual = $('.master-list__items--actuals');
let loadMoreActual = $('.master-list__show-more--actuals');
let currentStepActual = 0;
let stepActual = 3;

let listPast = $('.master-list__items--past');
let loadMorePast = $('.master-list__show-more--past');
let currentStepPast = 0;
let stepPast = 3;

let sortSelectItem = $('.select__dropdown .select__item');

function printItemActual(step, rerender = false) {
  if(rerender){
    listActual.html('');
    currentStepActual = 0;
  }

  if(actualItem.length) {
    let maxStep = currentStepActual + step;
    for(let i = currentStepActual; i < maxStep; i++) {
///////////////ЧТОБЫ БЫЛА ВИДНА ДАТА ДЛЯ СОРТИРОВКИ(в макете ее нет)//////////////
let datePub = actualItem[i].datePublish;
var date = new Date(datePub * 1000);
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var formattedTime = year+'-'+month+'-'+day+'_'+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
///////////////////////////////////////////////////////////////////////
      let template = `
        <div class="master-list__item">
          <div class="actual-card" data-video="${actualItem[i].video}">
            <a href="#" class="actual-card__img">
              <img src="${actualItem[i].img}">
            </a>
            <div class="actual-card__text">${formattedTime}</div>
            <div class="actual-card__title">${actualItem[i].title}</div>
            <div class="actual-card__text">${actualItem[i].text}</div>
          </div>
        </div>`;
      listActual.append(template);
    }
    currentStepActual += step;
  }

  if(currentStepActual >= actualItem.length) {
    loadMoreActual.hide();
  }
  else {
    loadMoreActual.show();
  }
}


function printItemPast(step) {
  if(pastMasterClassesArticles.length) {
    let maxStep = currentStepPast + step;
    for(let i = currentStepPast; i < maxStep; i++) {
      let template = `
        <div class="master-list__item">
          <div class="past-card" data-card-post-id="0">
            <a href="#" class="past-card__img">
              <img src="${pastMasterClassesArticles[i].img}">
            </a>
            <div class="past-card__info">
              <span class="past-card__info-date">${pastMasterClassesArticles[i].date}</span>
              <span class="past-card__info-time">${pastMasterClassesArticles[i].time}</span>
            </div>
            <div class="past-card__title">${pastMasterClassesArticles[i].title}</div>
            <div class="past-card__text">${pastMasterClassesArticles[i].text}</div>
            <div class="past-card__watch">
              <a href="#" class="btn-more">Смотреть запись</a>
            </div>
          </div>
        </div>`;
      listPast.append(template);
    }
    currentStepPast += step;
  }

  if(currentStepPast >= pastMasterClassesArticles.length) {
    loadMorePast.hide();
  }
}

function sortCard(sortMethod) {
  if(sortMethod === 'new'){
    actualItem.sort((a, b) => {
      return new Date(b.datePublish) - new Date(a.datePublish);
    })
  }
  else if(sortMethod === 'old') {
    actualItem.sort((a, b) => {
      return new Date(a.datePublish) - new Date(b.datePublish);
    })
  }
  else {
    return false;
  }
  printItemActual(stepActual, true);
  customPopup();
}

printItemActual(stepActual);
loadMoreActual.on('click', function(e){
  e.preventDefault();
  printItemActual(stepActual);
})

printItemPast(stepPast);
loadMorePast.on('click', function(e){
  e.preventDefault();
  printItemPast(stepPast)
})

sortSelectItem.on('click', function() {
  if($(this).attr('data-select-value') === 'new') {
    sortCard('new');
  }
  else if($(this).attr('data-select-value') === 'old') {
    sortCard('old');
  }
});
  function customPopup() {
  let popup = $('.custom-popup');
  let popupContent = $('.custom-popup__content');
  let popupCloseBtn = $('.custom-popup__close');
  let popupOverlay = $('.custom-popup__overlay');

  popupCloseBtn.add(popupOverlay).on('click', function() {
    popup.removeClass().addClass('custom-popup');
    popupContent.children().remove();
  })

  function popupVideoTeamplate(src, modClass) {
    popup.addClass(modClass);

    let template = `
    <div class="video-proportion-16x9">
      <iframe class="video-iframe" src="${src}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`;
    popupContent.html(template);
    popup.addClass('active');
  }

  function popupArticleTeamplate(id, modClass) {
    popup.addClass(modClass);
    let list = pastMasterClassesArticles[id].contentList;
    let listResult = '';

    for(let i = 0; i < list.length; i++) {
      let listItem = `<li>${list[i]}</li>`;
      listResult += listItem;
    }

    let template = `
    <div class="popup-card">
      <a href="#" class="popup-card__img">
        <img src="images/master-list-card-past2.jpg">
      </a>
      <div class="popup-card__body">
        <div class="popup-card__info">
          <span class="popup-card__info-date">${pastMasterClassesArticles[id].date}</span>
          <span class="popup-card__info-time">${pastMasterClassesArticles[id].time}</span>
        </div>
        <div class="popup-card__title">${pastMasterClassesArticles[id].title}</div>
        <div class="popup-card__text">${pastMasterClassesArticles[id].text}</div>
        <div class="popup-card__content">
          <div class="popup-card__content-title">${pastMasterClassesArticles[id].contentTitle}</div>
          <div class="popup-card__content-subtitle">${pastMasterClassesArticles[id].contentSubtitle}</div>
          <ul class="popup-card__content-list">${listResult}</ul>
        </div>
        <div class="popup-card__watch">
          <a href="#" class="btn-more">Смотреть запись</a>
        </div>
      </div>
    </div>`;

    popupContent.html(template);
    popup.addClass('active');
  }

  let cardVideo = $('.actual-card');
  let cardCarticle = $('.past-card');

  cardVideo.on('click', function(e) {
    e.preventDefault();
    let src = $(this).attr('data-video');
    popupVideoTeamplate(src, 'custom-popup--video')
  })

  cardCarticle.on('click', function(e) {
    e.preventDefault();
    let postId = $(this).attr('data-card-post-id');
    popupArticleTeamplate(postId, 'custom-popup--article');
  })
}

customPopup();;
});

