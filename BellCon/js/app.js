const navbarList = document.querySelector('.navbar-nav');
const navbarMenu = document.querySelector('#navbarNavAltMarkup');

navbarList.addEventListener('click', () => {
    navbarMenu.classList.toggle('show');
});