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
const popupAdd = document.querySelector(".popup__add")
const addButton = document.querySelector(".profile__button_add")
const buttonCloseAdd = document.querySelector(".popup__close-add")
const inputAdd = document.querySelector(".popup__input_add")
const addForm = document.querySelector(".popup-add__form")

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
}
function deleteItem(evt) {
  evt.target.closest(".todo__block").remove()
  console.log(evt.target)
}
function completeItem(evt) {
  evt.target.closest(".todo__block").classList.toggle("todo__block_type_complete")
}
function renderItem(text) {
  const template = document.querySelector("#template").content
  const listItem = template.cloneNode(true)
  const textElement = listItem.querySelector(".todo__text")
  const rejectButton = listItem.querySelector(".todo__button_type_reject")
  const acceptButton = listItem.querySelector(".todo__button_type_accept")
  textElement.textContent = text
  rejectButton.addEventListener("click", deleteItem)
  acceptButton.addEventListener("click", completeItem)
  todo.prepend(listItem)
}

function renderList(array) {
  array.forEach(element => {
    renderItem(element)
  });
}
renderList(initialItem)

function addElement(evt) {
  evt.preventDefault();
  let inputValue = inputAdd.value
  renderItem(inputValue)
  closePopup(popupAdd)
  addForm.reset()
}


//Обработчики события
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
})
addForm.addEventListener("submit", addElement)
