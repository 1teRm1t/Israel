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

form.addEventListener('submit', function (evt) {
  if (!name.value || !phone.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', name.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains('modal--show')) {
      popup.classList.remove('modal--show');
    }
  }
});
