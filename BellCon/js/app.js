const navbarItems = document.querySelector('.navbar-nav');
const navbarMenu = document.querySelector('#navbarNavAltMarkup');

navbarItems.addEventListener('click', () => {
    console.log('hi');
    navbarMenu.classList.toggle('show');
});