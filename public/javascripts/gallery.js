let view = $('.gallery');
const move = '500px';
const sliderLimit = -750;
const moveTime = 600;
const gallerySize = 4;

$(document).ready(function() {
  const len = filenames.length;

  // Append more divs to container if there are more than 6 images
  if (len > gallerySize) {
    for (let i = len; i > gallerySize; i-=2) {
      div = $('<div class="gallery-img"></div>');
      view.append(div);
      view.append(div.clone());
    }
  }

  for (let i = 0; i < len; i++) {
    a = $(`<a href=${urls[i]}></a>`);
    img = $(`<img src='/image/${filenames[i]}' alt='Recipe' width=200 height=200></img>`);
    a.append(img);
    view.children().eq(i).append(a);
  }

  $('.left-arrow').click(function() {
    let currentPosition = parseInt(view.css('left'));
    if (currentPosition < 0) view.stop(false, true).animate({left:'+='+move},{duration: moveTime});
  })

  $('.right-arrow').click(function() {
    let currentPosition = parseInt(view.css('left'));
    if (currentPosition >= sliderLimit) view.stop(false, true).animate({left:'-='+move},{duration: moveTime});
  })
})
