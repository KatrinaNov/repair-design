document.addEventListener("DOMContentLoaded", function(event) { 
  const modal = document.querySelector('.modal');
  // получаем все кнопки, которые имею атрибут data-toggle равный modal (кнопки которые должны открывать модальное окно)
  const modalDialog = document.querySelector('.modal__dialog');
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
});