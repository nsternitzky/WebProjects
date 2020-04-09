const navbarList = document.querySelector('.navbar-nav');
const navbarMenu = document.querySelector('#navbarNavAltMarkup');
const highlightsList = document.querySelector('#highlights-list');
const forms = document.getElementsByClassName('needs-validation');

const validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
});

navbarList.addEventListener('click', () => {
    if (navbarMenu.classList.contains('show')) {
        navbarMenu.classList.toggle('show');
    }
});

highlightsList.addEventListener('click', (e) => {
    const talkId = e.target.getAttribute('href');
    const speaker = talkId.split('-')[0];
    const talkDescriptionId = `${speaker}-desc`;
    const talkDescription = document.querySelector(talkDescriptionId);
    console.log(talkDescription);
    if (talkDescription && !talkDescription.classList.contains('show')) {
        talkDescription.classList.toggle('show');
    }
});