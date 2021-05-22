function loadNavbar() {
  let el = document.getElementById('main-navbar');
  if (el.style.display == 'none') {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}