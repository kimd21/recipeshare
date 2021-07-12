import variables from '../stylesheets/_variables.scss';

// Create gallery of images with buttons for scrolling
export function gallery(filenames, urls) {
  let view = $('.gallery');
  const moveTime = 600;
  const len = filenames.length;
  const gridGap = parseInt(variables.gridGap, 10);
  const move = String(parseInt(variables.galleryDivSize, 10) + gridGap) + 'px';
  const galleryDivSize = parseInt(variables.galleryDivSize, 10);
  const galleryCols = parseInt(variables.galleryCols, 10);
  const galleryRows = parseInt(variables.galleryRows, 10);
  const gallerySize = galleryCols * galleryRows;
  let sliderLimit = -(gridGap + galleryDivSize) * ((1.0*galleryRows*Math.ceil(len/(1.0*galleryRows)))/gallerySize - 1) + gridGap;

  // Hide arrows if images do not fill up container, remove sliding function
  if (len <= gallerySize) {
    sliderLimit = 1;
    $('#left-arrow').hide();
    $('#right-arrow').hide();
  } else {
    $('#left-arrow').show();
    $('#right-arrow').show();
  }

  // Append divs up to size of gallery
  for (let i = 0; i < gallerySize; i++) {
    let div = $('<div class="gallery-img"></div>');
    view.append(div);
  }

  // Append more divs to container if there are more than gallery Size
  if (len > gallerySize) {
    for (let i = len; i > gallerySize; i-=galleryRows) {
      let div = $('<div class="gallery-img"></div>');
      view.append(div);
      view.append(div.clone());
    }
  }

  for (let i = 0; i < len; i++) {
    let a = $(`<a href=${urls[i]}></a>`);
    let img = $(`<img src='/image/${filenames[i]}' alt='Recipe'></img>`);
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
}

