const prevButton = document.querySelector('.offer__slider-prev');
const nextButton = document.querySelector('.offer__slider-next');
const totalSlides = document.querySelectorAll('.offer__slide').length;
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.offer__slide');
    slides.forEach((slide, idx) => {
        if (idx === index) {
            slide.style.display = 'flex'; 
        } else {
            slide.style.display = 'none';
        }
    });
    document.getElementById('current').textContent = index + 1;
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}


showSlide(currentSlideIndex);


nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);


const tabs = document.querySelectorAll('.tabcontent');
const tabs_btn = document.querySelectorAll('.tabheader__item');

function tabsShow(idx) {
    tabs.forEach((tab) => tab.classList.add('hide', 'fade'));
    tabs[idx].classList.remove('hide');
}
tabsShow(0);

tabs_btn.forEach((btn, idx) => {
    btn.onclick = () => {
        tabsShow(idx);
        document.querySelector('.tabheader__item_active').classList.remove('tabheader__item_active');
        btn.classList.add('tabheader__item_active');
    };
});

let deadline1 = "2024-12-31 00:00";
let deadline2 = "2024-06-17 14:30";

function getRemainingTime(endTime) {
    const t = Date.parse(endTime) - Date.now(),
        days = Math.floor((t / 1000) / 60 / 60 / 24),
        hours = Math.floor((t / 1000) / 60 / 60 % 24),
        minutes = Math.floor((t / 1000) / 60 % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        t,
        days,
        hours,
        minutes,
        seconds
    };
}

function setTimer(endTime, selector) {
    const t = document.querySelector(selector),
        days = t.querySelector('#days'),
        hours = t.querySelector('#hours'),
        minutes = t.querySelector('#minutes'),
        seconds = t.querySelector('#seconds'),
        interval = setInterval(updateTimer, 1000);

    function updateTimer() {
        const t = getRemainingTime(endTime);

        if (t.t <= 0) {
            clearInterval(interval);
            days.innerHTML = 0;
            hours.innerHTML = 0;
            minutes.innerHTML = 0;
            seconds.innerHTML = 0;
            return;
        }

        days.innerHTML = t.days;
        hours.innerHTML = t.hours;
        minutes.innerHTML = t.minutes;
        seconds.innerHTML = t.seconds;
    }
}

setTimer(deadline1, '.one');
setTimer(deadline2, '.two');

const gender_btns = document.querySelectorAll('#gender .calculating__choose-item');
const acts = document.querySelectorAll('.calculating__choose-item[data-act]'); 
const inputs = document.querySelectorAll('.calculating__choose_medium input');
const res_view = document.querySelector('#res_view');

const user_data = {
    gender: 'woman',
    act: 'small'
};

gender_btns.forEach(btn => {
    btn.onclick = () => {
        user_data.gender = btn.getAttribute('data-gender');
        gender_btns.forEach(el => el.classList.remove('calculating__choose-item_active'));
        btn.classList.add('calculating__choose-item_active');
    }
});

inputs.forEach(inp => {
    inp.onkeyup = () => {
        user_data[inp.id] = +inp.value; 
    }
});

acts.forEach(act => {
    act.onclick = () => {
        acts.forEach(item => item.classList.remove('calculating__choose-item_active'));
        act.classList.add('calculating__choose-item_active');
        user_data.act = +act.getAttribute('data-act'); 

        let result = 0;
        
        if (user_data.gender === 'woman') {
            result = (655.1 + (9.563 * user_data.weight) + (1.85 * user_data.height) - (4.676 * user_data.age)) * user_data.act;
        } else {
            result = (66.5 + (13.75 * user_data.weight) + (5.003 * user_data.height) - (6.775 * user_data.age)) * user_data.act;
        }

        res_view.innerHTML = Math.floor(result.toFixed(2))
    }
});

document.getElementById('scrollToOrder').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.menu__field').scrollIntoView({
        behavior: 'smooth'
    });
});

document.getElementById('scrollToOrder2').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.offer').scrollIntoView({
        behavior: 'smooth'
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const openModalBtn = document.getElementById('openModalBtn1'); 
    const openModalBtn2 = document.getElementById('openModalBtn2'); 
    const closeModalBtn = document.querySelector('[data-close]');

    openModalBtn.addEventListener('click', () => {
        modal.classList.add('show', 'fade');
        modal.classList.remove('hide');
    });

    openModalBtn2.addEventListener('click', () => {
        modal.classList.add('show', 'fade');
        modal.classList.remove('hide');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hide');
        modal.classList.remove('show', 'fade');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hide');
            modal.classList.remove('show', 'fade');
        }
    });
});

