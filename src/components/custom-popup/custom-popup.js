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

customPopup();