'use strict'
// side-menu overlay
    const menuOpenBtn = document.querySelector('.showMenu-btn');
    const sideMenu = document.querySelector('.side__menu-wrapper');
    const overlay = document.getElementById("overlay");

    menuOpenBtn.addEventListener('click', showMenu);
    overlay.addEventListener('click', hideMenu);

    function showMenu() {
        sideMenu.classList.add('menu-visible');
        sideMenu.classList.add('show');
        overlay.style.display = ('block');
    }

    function hideMenu() {
        if (!event.target.matches('.side__menu-wrapper')) {
            sideMenu.classList.remove('menu-visible');
            sideMenu.classList.remove('show');
            overlay.style.display = ('none');
        }
    }
// end side-menu overlay