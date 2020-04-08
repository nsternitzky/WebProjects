const navbarList = document.querySelector('.navbar-nav');
const navbarMenu = document.querySelector('#navbarNavAltMarkup');

navbarList.addEventListener('click', () => {
    if (navbarMenu.classList.contains('show')) {
        navbarMenu.classList.toggle('show');
    }
});