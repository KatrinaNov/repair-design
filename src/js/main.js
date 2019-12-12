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

  modalBtn.on('click', function() {
    modal.toggleClass('modal_visible');
  });

  closeBtn.on('click', function() {
    modal.toggleClass('modal_visible');
  });
// закрытие модального окна нажатием на кнопку Esc
  $(document).keydown(function(e){
    if( e.code == 'Escape' ){
      modal.removeClass('modal_visible');
    };
  });
// закрытие модального окна при нажатие на любое место вне его
  $(document).on('click', function(e){
    if ( modal.is(e.target) ){
      modal.removeClass('modal_visible');
    };
  });

  // появление кнопки наверх , если спустились вниз на 1400px
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1400) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
  });
  // плавная прокрутка 
  $('#up').on('click', function(e){
    e.preventDefault;
    $('html, body').animate({scrollTop:0}, '300');
  });
 

});