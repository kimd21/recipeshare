import variables from '../stylesheets/_variables.scss';

// Enable hide on navigation bar by clicking on hamburger menu
export function loadNavbar() {
  let el = document.getElementById('main-navbar');
  let indexHeader = document.getElementById('index-header');
  if (el.style.display == 'none') {
    el.style.display = 'block';
    indexHeader.style.marginLeft = variables.navMargin;
  } else {
    el.style.display = 'none';
    indexHeader.style.marginLeft = 0; 
  }
};