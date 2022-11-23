const popupEdit = document.querySelector(".popup");
const editButton = document.querySelector(".profile__button_edit");
const confirmButton = popupEdit.querySelector(".popup__confirm");
const closeButton = popupEdit.querySelector(".popup__close");
const inputName = popupEdit.querySelector(".popup__input_name");
const inputStatus = popupEdit.querySelector(".popup__input_status");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupForm = document.querySelector(".popup__form");
const initialItem = ["Программировать", "Покурить", "Поесть", "Поиграть"]
const todo = document.querySelector(".todo")
// Функции
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
}
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closePopup(popupEdit);
  console.log(evt.type);
}

//Обработчики события
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
});
closeButton.addEventListener("click", () => {
  closePopup(popupEdit);
});
popupForm.addEventListener("submit", formSubmitHandler);

function renderItem(text) {
  const template = document.querySelector("#template").content

  const listItem = template.cloneNode(true)
  const textElement = listItem.querySelector(".todo__text")
  textElement.textContent = text
  todo.append(listItem)
  console.log(textElement)
}

function renderList(array) {
  array.forEach(element => {
    renderItem(element)
  });
}
renderList(initialItem)
