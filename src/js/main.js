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
      modalAnswer.removeClass('modal-answer_visible');
    };
  });
  // закрытие модального окна при нажатие на любое место вне его
  $(document).on('click', function (e) {
    if (modal.is(e.target)) {
      modal.removeClass('modal_visible');
    };
  });
  // закрытие модального окна при нажатие на любое место вне его
  $(document).on('click', function (e) {
    if (modalAnswer.is(e.target)) {
      modalAnswer.removeClass('modal-answer_visible');
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
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function(){
         $(form)[0].reset();
          // $(form).find('input').val("");
          // modalAnswer.toggleClass('modal-answer_visible');
          // modal.removeClass('modal_visible');
          // $('.modal-answer__title').text('Спасибо! Заявка успешно отправлена. Наш менеджер перезвонит Вам в течение 15 минут.');
          // $(form).text('Спасибо! Заявка успешно отправлена. Наш менеджер перезвонит Вам в течение 15 минут.');
          $(form).html('<p class="modal-answer__text">Спасибо! Заявка успешно отправлена. Наш менеджер перезвонит Вам в течение 15 минут. <br><br>Чтобы узнавать новости первыми, подпишитесь на нашу группу в ВК <br><a class="modal-answer__link" href="https://vk.com/frontend_katrina" target="_blank">Подписаться <img src="./img/vk-icon.svg" alt="vk"></a></p>');
        },
        error: function(jqXHR, textStatus) {
          console.error(jqXHR + " " + textStatus);
        }
      });
    }
  });
}
validateForm('.modal__form');
validateForm('.control__form');
validateForm('.footer__form');

  // маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});


  // карта Yandex
  //Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;

  function init() {
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
            iconImageHref: 'img/map-icon.png',
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
// Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
var layer = myMap.layers.get(0).get(0);
 
// Решение по callback-у для определения полной загрузки карты
waitForTilesLoad(layer).then(function() {
  // Скрываем индикатор загрузки после полной загрузки карты
  spinner.removeClass('is-active');
});
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
return new ymaps.vow.Promise(function (resolve, reject) {
  var tc = getTileContainer(layer), readyAll = true;
  tc.tiles.each(function (tile, number) {
    if (!tile.isReady()) {
      readyAll = false;
    }
  });
  if (readyAll) {
    resolve();
  } else {
    tc.events.once("ready", function() {
      resolve();
    });
  }
});
}

function getTileContainer(layer) {
for (var k in layer) {
  if (layer.hasOwnProperty(k)) {
    if (
      layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
      || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
    ) {
      return layer[k];
    }
  }
}
return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
var script = document.createElement("script");

if (script.readyState){  // IE
  script.onreadystatechange = function(){
    if (script.readyState == "loaded" ||
            script.readyState == "complete"){
      script.onreadystatechange = null;
      callback();
    }
  };
} else {  // Другие браузеры
  script.onload = function(){
    callback();
  };
}

script.src = url;
document.getElementsByTagName("head")[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
$('.ymap-container').mouseenter(function(){
    if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

    // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
      check_if_load = true; 

  // Показываем индикатор загрузки до тех пор, пока карта не загрузится
      spinner.addClass('is-active');

  // Загружаем API Яндекс.Карт
      loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
         // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
         ymaps.load(init);
      });                
    }
  }
);  
}

$(function() {

//Запускаем основную функцию
ymap();

});


// отправка формы с помощью ajax 
// function sendingForm(form) {
  // $('#control-form').submit(function (event) {
  //   event.preventDefault();
  //   $.ajax({
  //     type: "POST",
  //     url: "send.php",
  //     data: $(this).serialize(),
  //     success: function(){
  //     //  $('#control-form')[0].reset();
  //       $('form').find('input').val("");
  //       modalAnswer.toggleClass('modal-answer_visible');
  //       // modal.removeClass('modal_visible');
  //       $('.modal-answer__title').text('Спасибо! Заявка успешно отправлена. Наш менеджер перезвонит Вам в течение 15 минут.');
  //     },
  //     error: function(jqXHR, textStatus) {
  //       console.error(jqXHR + " " + textStatus);
  //     }
  //   });
  // })
// }
// sendingForm('#control-form');
// sendingForm('#modal-form');
// sendingForm('#footer-form');
  // очистка формы
  // $('form').find('input').val("");
});