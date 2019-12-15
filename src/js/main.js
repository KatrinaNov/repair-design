/*document.addEventListener("DOMContentLoaded", function(event) { 
  const modal = document.querySelector('.modal');
  // получаем все кнопки, которые имею атрибут data-toggle равный modal (кнопки которые должны открывать модальное окно)
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');

  // функция переключение модального окна
  const switchModal = () => {
    modal.classList.toggle('modal_visible');
  }
  const removeModal = () => {
    modal.classList.remove('modal_visible');
  }

  modalBtn.forEach(element => {
    element.addEventListener('click', switchModal);
  });

  closeBtn.addEventListener('click', switchModal);

  document.addEventListener('keydown', function (e) {
    if (e.code == "Escape") removeModal();
  }); 
  document.addEventListener('click', (e) => {
    if (e.target == modal) removeModal();
  });
});*/

$(document).ready(function () {
  var modal = $('.modal'),
    modalBtn = $('[data-toggle=modal]'),
    closeBtn = $('.modal__close');

  modalBtn.on('click', function () {
    modal.toggleClass('modal_visible');
  });

  closeBtn.on('click', function () {
    modal.toggleClass('modal_visible');
  });
  // закрытие модального окна нажатием на кнопку Esc
  $(document).keydown(function (e) {
    if (e.code == 'Escape') {
      modal.removeClass('modal_visible');
    };
  });
  // закрытие модального окна при нажатие на любое место вне его
  $(document).on('click', function (e) {
    if (modal.is(e.target)) {
      modal.removeClass('modal_visible');
    };
  });

  // появление кнопки наверх , если спустились вниз на 1400px
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1400) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });
  // плавная прокрутка 
  $('#up').on('click', function (e) {
    e.preventDefault;
    $('html, body').animate({
      scrollTop: 0
    }, '300');
  });


  // слайдер в секции Завершенные проекты
  var projectSwiper = new Swiper('.projects__swiper-container', {
    // Optional parameters
    loop: true,
    pagination: {
      el: '.projects__swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.projects__swiper-button-next',
      prevEl: '.projects__swiper-button-prev',
    },
  });

  var next = $('.projects__swiper-button-next');
  var prev = $('.projects__swiper-button-prev');
  var bullets = $('.projects__swiper-pagination');

  next.css('left', prev.width() + bullets.width() + 60)
  bullets.css('left', prev.width() + 30)

  // слайдер в секции 6 шагов
  var stepsSwiper = new Swiper('.steps__swiper-container', {
    // Optional parameters
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.steps__swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.steps__swiper-button-next',
      prevEl: '.steps__swiper-button-prev',
    },
  });

  var next2 = $('.steps__swiper-button-next');
  var prev2 = $('.steps__swiper-button-prev');
  var bullets2 = $('.steps__swiper-pagination');

  next2.css('left', prev2.width() + bullets2.width() + 60)
  bullets2.css('left', prev2.width() + 30)

  // переключение слайдов по табам из секции 6 

  $('.steps__tabs-item').on('click', function () {
    $('.steps__tabs-item').removeClass('active');
    $(this).addClass('active');
    const e = $(this).data('index');
    stepsSwiper.slideTo(e)
  })

  stepsSwiper.on('slideChange', (function () {
    let e = stepsSwiper.activeIndex - 1;
    if (e === 6) {e=0};
    $('.steps__tabs-item').removeClass('active');
    $('.steps__tabs-item').eq(e).addClass('active');
  }))


});