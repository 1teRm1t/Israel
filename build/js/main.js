'use strict';

(function () {

  if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  var scrollButton = document.querySelector('.promo__btn');

  var onScrollButtonClickDocumentScroll = function () {
    var elem = document.querySelector('#about');

    window.scrollBy({
      top: elem.getBoundingClientRect().y,
      behavior: 'smooth',
      block: 'start'
    });
  };

  scrollButton.addEventListener('click', onScrollButtonClickDocumentScroll);

  window.addEventListener('DOMContentLoaded', function () {

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
    var popupCallback = document.querySelector('.modal--callback');
    var overlay = document.querySelector('.modal-overlay');
    var form = popupCallback.querySelector('form');
    var name = popupCallback.querySelector('[name=name]');
    var phone = popupCallback.querySelector('[name=phone]');
    var close = popupCallback.querySelector('.modal__close');
    var bodyFixed = 'fixed';
    var bodyNoFixed = '';
    var bodyFullWidth = '100%';
    var bodyInitialWidth = 'initial';

    var popupAccept = document.querySelector('.modal--accept');
    var popupAcceptBtn = popupAccept.querySelector('.modal__btn');
    var popupAcceptClose = popupAccept.querySelector('.modal__close');

    var callbackForm = document.querySelector('.callback__wrap form');
    var detailsForm = document.querySelector('.details__form form');

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
      popupCallback.classList.add('modal--callback--show');
      overlay.classList.add('modal-overlay--show');
      document.body.style.position = bodyFixed;
      document.body.style.width = bodyFullWidth;

      if (nameStorage) {
        name.value = nameStorage;
      }
      if (phoneStorage) {
        phone.value = phoneStorage;
      }
      name.focus();
    });

    callbackForm.addEventListener('submit', function (evt) {
      sendForm(new FormData(form));
      evt.preventDefault();
      popupCallback.classList.remove('modal--callback--show');
      popupAccept.classList.add('modal--accept--show');
      overlay.classList.add('modal-overlay--show');
      document.body.style.position = bodyFixed;
      document.body.style.width = bodyFullWidth;
      callbackForm.reset();
    });

    close.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupCallback.classList.remove('modal--callback--show');
      overlay.classList.remove('modal-overlay--show');
      document.body.style.position = bodyNoFixed;
      document.body.style.width = bodyInitialWidth;
      name.value = '';
      phone.value = '';
    });

    popupAcceptClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupAccept.classList.remove('modal--accept--show');
      overlay.classList.remove('modal-overlay--show');
      document.body.style.position = bodyNoFixed;
      document.body.style.width = bodyInitialWidth;
      name.value = '';
      phone.value = '';
    });

    var sendForm = function (form) {
      var xhr = new XMLHttpRequest();

      xhr.open('POST', 'https://echo.htmlacademy.ru');
      xhr.send(form);
    };

    form.addEventListener('submit', function (evt) {
      sendForm(new FormData(form));
      evt.preventDefault();
      popupCallback.classList.remove('modal--callback--show');
      popupAccept.classList.add('modal--accept--show');
      overlay.classList.add('modal-overlay--show');
      document.body.style.position = bodyFixed;
      document.body.style.width = bodyFullWidth;
      form.reset();
    });

    popupAcceptBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupAccept.classList.remove('modal--accept--show');
      overlay.classList.remove('modal-overlay--show');
      document.body.style.position = bodyNoFixed;
      document.body.style.width = bodyInitialWidth;
      name.value = '';
      phone.value = '';
    });

    overlay.addEventListener('click', function () {
      popupCallback.classList.remove('modal--callback--show');
      popupAccept.classList.remove('modal--accept--show');
      overlay.classList.remove('modal-overlay--show');
      document.body.style.position = bodyNoFixed;
      document.body.style.width = bodyInitialWidth;
      name.value = '';
      phone.value = '';
    });

    detailsForm.addEventListener('submit', function (evt) {
      sendForm(new FormData(form));
      evt.preventDefault();
      popupCallback.classList.remove('modal--callback--show');
      popupAccept.classList.add('modal--accept--show');
      overlay.classList.add('modal-overlay--show');
      document.body.style.position = bodyFixed;
      document.body.style.width = bodyFullWidth;
      detailsForm.reset();
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        if (popupCallback.classList.contains('modal--callback--show') || popupCallback.classList.contains('modal--accept--show')) {
          popupCallback.classList.remove('modal--callback--show');
          overlay.classList.remove('modal-overlay--show');
          document.body.style.position = bodyNoFixed;
          document.body.style.width = bodyInitialWidth;
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


    var prev = document.querySelector('.feedback__arrow--prev');
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

    function prevSlide() {
      page--;
      var prevPage = page + 1;
      numberPage.innerHTML = prevPage + ' / 6';
      if (page === 0) {
        prev.disabled = true;
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

    prev.addEventListener('click', function () {
      prevSlide();
      next.disabled = false;
    });

    next.addEventListener('click', function () {
      nextSlide();
      prev.disabled = false;
    });


    document.addEventListener('DOMContentLoaded', function () {
      var lazyloadImg;

      if ('IntersectionObserver' in window) {
        lazyloadImg = document.querySelectorAll('.lazyload');
        var imageObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              image.classList.remove('lazyload');
              imageObserver.unobserve(image);
            }
          });
        });

        lazyloadImg.forEach(function (image) {
          imageObserver.observe(image);
        });

      } else {
        var lazyloadThrottleTimeout;
        lazyloadImg = document.querySelectorAll('.lazyload');

        var lazyload = function () {
          if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
          }

          lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImg.forEach(function (img) {
              if (img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazyload');
              }
            });
            if (lazyloadImg.length === 0) {
              document.removeEventListener('scroll', lazyload);
              window.removeEventListener('resize', lazyload);
              window.removeEventListener('orientationChange', lazyload);
            }
          }, 200);
        };

        document.addEventListener('scroll', lazyload);
        window.addEventListener('resize', lazyload);
        window.addEventListener('orientationChange', lazyload);
      }
    });


    var errors = {};
    var formInputs = document.querySelectorAll('input:not([type="checkbox"])');

    var onInputFocusBlurChangeOutline = function (evt) {
      var container = evt.target.parentElement;

      if (!container.classList.contains('modal__field--focus')) {
        container.classList.add('modal__field--focus');
      }

      if (evt.type === 'focus' && container.classList.contains('modal__field--error')) {
        container.classList.remove('modal__field--error');
      }
    };

    var onInputBlurChangeOutline = function (evt) {
      var container = evt.target.parentElement;

      if (container.classList.contains('modal__field--focus')) {
        container.classList.remove('modal__field--focus');
      }

      if (evt.target.type === 'text' && errors.name !== undefined) {
        container.classList.add('modal__field--error');
      } else if (evt.target.type === 'tel' && errors.tel !== undefined) {
        container.classList.add('modal__field--error');
      }
    };

    var onInputHoverChangeOutline = function (evt) {
      var container = evt.target.parentElement;

      if (container.classList.contains('modal__field--hover')) {
        container.classList.remove('modal__field--hover');
      } else {
        container.classList.add('modal__field--hover');
      }
    };

    formInputs.forEach(function (it) {
      it.addEventListener('focus', onInputFocusBlurChangeOutline);
      it.addEventListener('blur', onInputBlurChangeOutline);
      it.addEventListener('mouseover', onInputHoverChangeOutline);
      it.addEventListener('mouseout', onInputHoverChangeOutline);
    });


    var inputs = document.querySelectorAll('input[type="tel"]');
    var im = new Inputmask('+7 (999) 999-99-99');
    im.mask(inputs);

    var inputName = document.getElementById('modalName');
    var userName = document.getElementById('user-name');

    var getCorrectName = function () {
      var valueName = inputName.value;
      var re = /^[a-zA-Zа-яА-Я]*$/;

      for (var i = 0; i < valueName.length; i++) {
        if (!re.test(valueName[i])) {
          inputName.setCustomValidity('Имя должно содержать только буквы');
        } else {
          inputName.setCustomValidity('');
        }
      }
    };

    var getCorrectUserName = function () {
      var valueName = userName.value;
      var re = /^[a-zA-Zа-яА-Я]*$/;

      for (var i = 0; i < valueName.length; i++) {
        if (!re.test(valueName[i])) {
          userName.setCustomValidity('Имя должно содержать только буквы');
        } else {
          userName.setCustomValidity('');
        }
      }
    };

    inputName.addEventListener('input', function () {
      getCorrectName();
    });

    userName.addEventListener('input', function () {
      getCorrectUserName();
    });
  });
})();
