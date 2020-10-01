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
