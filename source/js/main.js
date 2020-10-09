'use strict';

var questionsBlock = document.querySelector('.questions');
var acc = questionsBlock.querySelectorAll('.questions__item');
var accBtn = questionsBlock.querySelectorAll('.questions__btn');

var getOpenAcc = function () {
  this.classList.toggle('questions__item--active');
};

acc.forEach(function (item) {
  item.addEventListener('click', getOpenAcc);
});

accBtn.forEach(function (item) {
  item.addEventListener('click', getOpenAcc);
});


var block = document.querySelector('.programs__list');

var fTabs = function (evt) {
  if (evt.target.classList === 'programs__item') {
    var dataTab = evt.target.getAttribute('data-tab');

    evt.target.classList.add('programs__item--active');
    var tabs = document.querySelector('.programs__desc');

    for (var i = 0; i < tabs.length; i++) {
      if (dataTab === i) {
        tabs[i].style.display = 'block';
      } else {
        tabs[i].style.display = 'none';
      }
    }
  }
};

block.addEventListener('click', fTabs);

var link = document.querySelector('.page-header__link');
var popup = document.querySelector('.modal');
var form = popup.querySelector('modal__form');
var name = popup.querySelector('[name=name]');
var phone = popup.querySelector('[name=phone]');
var close = popup.querySelector('.modal__close');

var isStorageSupport = true;
var nameStorage = '';
var phoneStorage = '';


try {
  nameStorage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

try {
  phoneStorage = localStorage.getItem('phone');
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('modal--show');

  if (nameStorage) {
    name.value = nameStorage;
  }
  if (phoneStorage) {
    phone.value = phoneStorage;
  }
  name.focus();
});

close.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('modal--show');
});

/* form.addEventListener('submit', function (evt) {
  if (!name.value || !phone.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', name.value);
    }
  }
}); */

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains('modal--show')) {
      popup.classList.remove('modal--show');
    }
  }
});


var activeTab = document.querySelectorAll('.programs__item');
var showTab = document.querySelectorAll('.programs__desc-item');

var getToggleTab = function (index) {
  for (var i = 0; i < showTab.length; i++) {
    showTab[i].classList.remove('programs__desc-item--active');
  }

  for (var j = 0; j < activeTab.length; j++) {
    activeTab[j].classList.remove('programs__item--active');
  }

  activeTab[index - 1].classList.add('programs__item--active');
  showTab[index - 1].classList.add('programs__desc-item--active');
};

activeTab.forEach(function (item, index) {
  item.addEventListener('click', function () {
    getToggleTab(index + 1);
  });
});


var prew = document.querySelector('.feedback__arrow--prew');
var next = document.querySelector('.feedback__arrow--next');
var numberPage = document.querySelector('.feedback__count span');
var page = 2;

var slideIndex = 3;
showSlides(slideIndex);

function nextSlide() {
  page++;
  var nextPage = page + 1;
  numberPage.innerHTML = nextPage + ' / 6';
  if (page === 5) {
    next.disabled = true;
  }
  showSlides(slideIndex += 1);
}

function prewSlide() {
  page--;
  var prevPage = page + 1;
  numberPage.innerHTML = prevPage + ' / 6';
  if (page === 0) {
    prew.disabled = true;
  }
  showSlides(slideIndex -= 1);
}

function showSlides(item) {
  var slides = document.querySelectorAll('.feedback__item');

  if (item > slides.length) {
    slideIndex = 1;
  }
  if (item < 1) {
    slideIndex = slides.length;
  }
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  slides[slideIndex - 1].style.display = 'block';
}

prew.addEventListener('click', function () {
  prewSlide();
  next.disabled = false;
});

next.addEventListener('click', function () {
  nextSlide();
  prew.disabled = false;
});
