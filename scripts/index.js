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
const confirmButtonAdd = document.querySelector(".popup__confirm_add")
const popupTitle = document.querySelector(".popup__title_add")
const popupAll = document.querySelectorAll(".popup")
const popupChange = document.querySelector(".popup__change")
const inputChange = document.querySelector(".popup__input_change")
const buttonCloseChange = document.querySelector(".popup__close-change")
const buttonChangeConfirm = document.querySelector(".popup__confirm_change")
const popupChangeForm = document.querySelector(".popup-change__form")
let editItemElement;

// Функции
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeClose)
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeClose)
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
  confirmButtonAdd.textContent = "Изменить"

}

function addElement(evt) {
  evt.preventDefault();
  let inputValue = inputAdd.value
  if (!editItemElement) {
    renderItem(inputValue)
  } else {
    editItemElement.textContent = inputAdd.value
    confirmButtonAdd.textContent = "Добавить"
  }
  closePopup(popupAdd)
  addForm.reset()
}
function closePopupOverlay(evt) {
  const popupOpen = document.querySelector(".popup_is-opened");
  if (evt.target === popupOpen) {
    closePopup(popupOpen);
  }
}
function handleEscapeClose(evt) {
  const popupOpen = document.querySelector(".popup_is-opened");
  if (evt.keyCode === 27) {
    closePopup(popupOpen);
  }
}

//Обработчики события
popupAll.forEach((evt) => {
  evt.addEventListener("mousedown", closePopupOverlay)
})

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
});
closeButton.addEventListener("click", () => {
  closePopup(popupEdit);
});
popupForm.addEventListener("submit", formSubmitHandler);

addButton.addEventListener("click", () => {
  openPopup(popupAdd)
})

buttonCloseAdd.addEventListener("click", () => {
  closePopup(popupAdd)
  addForm.reset()
})
addForm.addEventListener("submit", addElement)

// buttonCloseChange.addEventListener("click", () => {
//   closePopup(popupChange)
// })




