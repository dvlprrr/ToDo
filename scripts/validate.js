
function errorShow(formElement, inputElement, errorMesage, options) {
    const errorElement = formElement.querySelector(`#${inputElement.id}_error`)
    inputElement.classList.add(options.errorInput)
    errorElement.textContent = errorMesage
    errorElement.classList.add(options.errorSpan)
}

function errorHide(formElement, inputElement, options) {
    const errorElement = formElement.querySelector(`#${inputElement.id}_error`)
    inputElement.classList.remove(options.errorInput)
    errorElement.textContent = ""
    errorElement.classList.remove(options.errorSpan)
}

const validate = (formElement, inputElement, options) => {
    if (!inputElement.validity.valid) {
        errorShow(formElement, inputElement, inputElement.validationMessage, options)
    } else {
        errorHide(formElement, inputElement, options)
    }

}

function buttonUnDisabled(buttonSubmit, options) {
    console.log(buttonSubmit)
    buttonSubmit.classList.remove(options.errorButton)
    buttonSubmit.disabled = false
}

function buttonDisabled(buttonSubmit, options) {
    console.log(buttonSubmit)
    buttonSubmit.classList.add(options.errorButton)
    buttonSubmit.disabled = true
}

function toggleButtonState(buttonSubmit, inputList, options) {
    if (hasInvalidInput(inputList, options)) {
        buttonDisabled(buttonSubmit, options)

    } else {
        buttonUnDisabled(buttonSubmit, options)
    }
}

function setEventListeners(formElement, options) {
    const inputItems = Array.from(formElement.querySelectorAll(options.inputSelector))
    const buttonItem = Array.from(formElement.querySelectorAll(options.buttonSelector))
    toggleButtonState(buttonItem, inputItems, options)
    console.log(toggleButtonState)
    inputList.forEach((input) => {
        input.addEventListener("input", () => {
            validate(formElement, input, options)
            toggleButtonState(buttonItem, inputItems, options)
        })
    })
}

function enableValidation(options) {
    const formList = Array.from(document.querySelectorAll(options.formSelector))
    console.log(formList)
    formList.forEach((form) => {
        console.log(form)
        form.addEventListener("submit", (evt) => {
            evt.preventDefault()
        });
        setEventListeners(form, options)
    })
}

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true

        return !inputElement.validity.valid;
    })
};


const classObj = {
    errorInput: "popup__input_error",
    errorSpan: "task__error_visible",
    errorButton: "popup__confirm_disabled",
    inputSelector: ".popup__input",
    buttonSelector: ".popup__confirm",
    formSelector: ".popup__form",
}
enableValidation(classObj)
