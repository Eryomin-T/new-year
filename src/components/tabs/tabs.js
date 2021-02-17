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

tabs();