// menu
const menu = document.querySelector('.menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});

// logo
const logo = document.querySelector('.logo'); // Select the logo <div>

logo.addEventListener('click', scrollToTop);

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}