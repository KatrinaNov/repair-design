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
    modalAnswer = $('.modal-answer'),
    modalBtn = $('[data-toggle=modal]'),
    closeBtn = $('.modal__close'),
    closeBtnAnswer = $('.modal-answer__close');

  modalBtn.on('click', function () {
    modal.toggleClass('modal_visible');
  });

  closeBtn.on('click', function () {
    modal.toggleClass('modal_visible');
  });
  closeBtnAnswer.on('click', function () {
    modalAnswer.toggleClass('modal-answer_visible');
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
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, '300');
  });

  $('.hero__scroll-down').on('click', function(){
    console.log('ты нажал кнопку вниз');
    var el = $(this).attr('href');
    $('html,body').animate({
      scrollTop: $(this).offset().top - $(".hero").height()}, 2000);
    return false;
  });


  // слайдер в секции Завершенные проекты
  var projectSwiper = new Swiper('.projects__swiper-container', {
    // Optional parameters
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
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

  next.css('left', prev.width() + bullets.width() + 40)
  bullets.css('left', prev.width() + 20)

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

  next2.css('left', prev2.width() + bullets2.width() + 40)
  bullets2.css('left', prev2.width() + 20)

  // переключение слайдов по табам из секции 6 

  $('.steps__tabs-item').on('click', function () {
    $('.steps__tabs-item').removeClass('active');
    $(this).addClass('active');
    const e = $(this).data('index');
    stepsSwiper.slideTo(e);
  })

  stepsSwiper.on('slideChange', (function () {
    let e = stepsSwiper.activeIndex - 1;
    if (e === 6) {e=0};
    $('.steps__tabs-item').removeClass('active');
    $('.steps__tabs-item').eq(e).addClass('active');
  }))


  // запустить анимацию, когда будет в области видимости
    $(window).scroll(function () {  
      if ($(this).scrollTop() >= $('.steps').offset().top - $(window).height()/2) {
        console.log($(this).scrollTop());
        $('.steps__animation').show();
        }    
    });

  new WOW().init(); // библиотека для проигрывания анимации только когда в области видимости, работает с animate.css

  // валидация форм
  function validateForm(form){
  $(form).validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // simple rule, converted to {required:true}
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      userQuestion: "required",
      // compound rule
      userEmail: {
        required: true,
        email: true
      }
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Слишком короткое имя",
        maxlength: "Имя не должно превышать 15 символов"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Некорректно введен номер"
      },
      userQuestion: "Заполните поле",
      userEmail: {
        required: "Заполните поле",
        email: "Введите Ваш email в формате name@domain.com"
      }
    }
  });
}
validateForm('.modal__form');
validateForm('.control__form');
validateForm('.footer__form');

  // маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});


  // карта Yandex
  
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [47.244734, 39.723227],
            zoom: 18            
        }, {
            searchControlProvider: 'yandex#search'
        }),        
        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Торговый центр; ул. Нансена, 239, Ростов-на-Дону, Россия',
            balloonContent: 'Прямой телефон +7 (999) 768 32 99'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '../img/map-icon.png',
            // Размеры метки.
            iconImageSize: [32, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'А эта — новогодняя',
            iconContent: '12'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'images/ball.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);
});
// отправка формы с помощью ajax 
// function sendingForm(form) {
  $('#control-form').on('submit', function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "send.php",
      data: $(this).serialize(),
      success: function(){
      //  $('#control-form')[0].reset();
        $('form').find('input').val("");
        modalAnswer.toggleClass('modal-answer_visible');
        // modal.removeClass('modal_visible');
        $('.modal-answer__title').text('Спасибо! Заявка успешно отправлена. Наш менеджер перезвонит Вам в течение 15 минут.');
      },
      error: function(jqXHR, textStatus) {
        console.error(jqXHR + " " + textStatus);
      }
    });
  })
// }
// sendingForm('#control-form');
// sendingForm('#modal-form');
// sendingForm('#footer-form');
  // очистка формы
  // $('form').find('input').val("");
});