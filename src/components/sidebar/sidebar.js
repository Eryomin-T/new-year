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
})