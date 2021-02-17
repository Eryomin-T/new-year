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
}, 1000)