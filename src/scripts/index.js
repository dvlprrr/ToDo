import "../pages/style.css"
import { Validate } from "./Validate.js";
import { classObj } from "../utils/constant.js";
const popupEdit = document.querySelector(".popup__edit");
const editButton = document.querySelector(".profile__button_edit");
const confirmButton = popupEdit.querySelector(".popup__confirm");
const closeButton = popupEdit.querySelector(".popup__close");
const inputName = popupEdit.querySelector(".popup__input_name");
const inputStatus = popupEdit.querySelector(".popup__input_status");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupForm = document.querySelector(".popup__form");
const initialItem = ["Программировать", "Покурить", "Поесть", "Поиграть"];
const todo = document.querySelector(".todo");
const popupAdd = document.querySelector(".popup__add");
const addButton = document.querySelector(".profile__button_add");
const buttonCloseAdd = document.querySelector(".popup__close-add");
const inputAdd = document.querySelector(".popup__input_add");
const addForm = document.querySelector(".popup-add__form");
const popupTitle = document.querySelector(".popup__title_add")
const popupAll = document.querySelectorAll(".popup")
const popoupAvatar = document.querySelector(".popup__avatar")
const profileAvatar = document.querySelector(".profile__avatar")
const closeAvatar = document.querySelector(".popup__close-avatar")
const inputAvatar = document.querySelector(".popup__input_avatar")
const formAvatar = document.querySelector(".popup-avatar__form")
const buttonAvatar = document.querySelector(".popup__confirm_avatar")
const buttonChange = document.querySelector(".popup__confirm_change")
let editItemElement;
const validateEdit = new Validate(classObj, popupForm)
const validateAdd = new Validate(classObj, addForm)
const validateAvatar = new Validate(classObj, formAvatar)
validateEdit.enableValidation()
validateAdd.enableValidation()
validateAvatar.enableValidation()
// Функции
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}
// Сделать класс
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputStatus.value;
  closePopup(popupEdit)
}

function deleteItem(evt) {
  evt.target.closest(".todo__block").remove()
}

function completeItem(evt) {
  const completeSingleItem = evt.target.closest(".todo__block")
  completeSingleItem.classList.toggle("todo__block_type_complete")
  todo.append(completeSingleItem)
}

function renderItem(text) {
  const template = document.querySelector("#template").content
  const listItem = template.cloneNode(true)
  const textElement = listItem.querySelector(".todo__text")
  const editButton = listItem.querySelector(".todo__button_type_edit")
  const rejectButton = listItem.querySelector(".todo__button_type_reject")
  const acceptButton = listItem.querySelector(".todo__button_type_accept")
  textElement.textContent = text
  rejectButton.addEventListener("click", deleteItem)
  acceptButton.addEventListener("click", completeItem)
  editButton.addEventListener("click", editElement)
  todo.prepend(listItem)
}

function renderList(array) {
  array.forEach(element => {
    renderItem(element)
  });
}

renderList(initialItem)

function editElement(evt) {
  openPopup(popupAdd);
  evt.preventDefault();
  let editButtonElement = evt.target.closest(".todo__block");
  let editItemText = editButtonElement.querySelector(".todo__text");
  editItemElement = editItemText;
  inputAdd.value = editItemText.textContent;
}

function addElement(evt) {
  evt.preventDefault();
  let inputValue = inputAdd.value
  if (!editItemElement) {
    renderItem(inputValue)
  } else {
    editItemElement.textContent = inputAdd.value
    editItemElement = null;
  }
  inputAdd.value = ""
  closePopup(popupAdd)
}

function closePopupOverlay(evt) {
  const popupOpen = document.querySelector(".popup_is-opened");
  if (evt.target === popupOpen) {
    closePopup(popupOpen);
  }
}

function changeImage(evt) {
  evt.preventDefault()
  profileAvatar.src = inputAvatar.value
  closePopup(popoupAvatar)
  inputAvatar.value = ""
}
//Обработчики события

popupEdit.addEventListener("mousedown", closePopupOverlay)

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;
  validateEdit.buttonDisabled()
  openPopup(popupEdit);
});

closeButton.addEventListener("click", () => {
  closePopup(popupEdit);
});

popupForm.addEventListener("submit", formSubmitHandler);

addForm.addEventListener("submit", addElement)

addButton.addEventListener("click", () => {
  validateAdd.buttonDisabled()
  openPopup(popupAdd)
})

profileAvatar.addEventListener("click", () => {
  validateAvatar.buttonDisabled()
  openPopup(popoupAvatar)
})

popoupAvatar.addEventListener("mousedown", closePopupOverlay)

closeAvatar.addEventListener("click", () => {
  closePopup(popoupAvatar)

})

formAvatar.addEventListener("submit", changeImage)

//Повторить ООП
// Модули
// webpack

