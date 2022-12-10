
// function errorShow(formElement, inputElement, errorMesage, options) {
//     const errorElement = formElement.querySelector(`#${inputElement.id}_error`)
//     inputElement.classList.add(options.errorInput)
//     errorElement.textContent = errorMesage
//     errorElement.classList.add(options.errorSpan)
// }

// function errorHide(formElement, inputElement, options) {
//     const errorElement = formElement.querySelector(`#${inputElement.id}_error`)
//     inputElement.classList.remove(options.errorInput)
//     errorElement.textContent = ""
//     errorElement.classList.remove(options.errorSpan)
// }

// const validate = (formElement, inputElement, options) => {
//     if (!inputElement.validity.valid) {
//         errorShow(formElement, inputElement, inputElement.validationMessage, options)
//     } else {
//         errorHide(formElement, inputElement, options)
//     }
// }

// function buttonUnDisabled(buttonSubmit, options) {
//     buttonSubmit.classList.remove(options.errorButton)
//     buttonSubmit.disabled = false
// }

// function buttonDisabled(buttonSubmit, options) {
//     buttonSubmit.classList.add(options.errorButton)
//     buttonSubmit.disabled = true
// }

// function toggleButtonState(buttonSubmit, inputList, options) {
//     if (hasInvalidInput(inputList)) {
//         buttonDisabled(buttonSubmit, options)
//     } else {
//         buttonUnDisabled(buttonSubmit, options)
//     }
// }

// function setEventListeners(formElement, options) {
//     const inputItems = Array.from(formElement.querySelectorAll(options.inputSelector))
//     const buttonItem = formElement.querySelector(options.buttonSelector)
//     toggleButtonState(buttonItem, inputItems, options)
//     inputItems.forEach((input) => {
//         input.addEventListener("input", () => {
//             validate(formElement, input, options)
//             toggleButtonState(buttonItem, inputItems, options)
//         })
//     })
// }

// function enableValidation(options) {
//     const formList = Array.from(document.querySelectorAll(options.formSelector))
//     formList.forEach((form) => {
//         form.addEventListener("submit", (evt) => {
//             evt.preventDefault()
//         });
//         setEventListeners(form, options)
//     })
// }

// const hasInvalidInput = (inputList) => {
//     // проходим по этому массиву методом some
//     return inputList.some((inputElement) => {
//         // Если поле не валидно, колбэк вернёт true
//         // Обход массива прекратится и вся функция
//         // hasInvalidInput вернёт true
//         console.log(inputElement.validity.valid)
//         return !inputElement.validity.valid;
//     })
// };


export class Validate {
    constructor(validateSettings, form) {
        this._form = form
        this._submitButton = form.querySelector(validateSettings.buttonSelector)
        this._inputSelector = Array.from(form.querySelectorAll(validateSettings.inputSelector))
        this._inputError = validateSettings.errorInput
        this._spanError = validateSettings.errorSpan
        this._buttonError = validateSettings.errorButton
    }
    _errorShow(inputSelector, errorMesage) {
        const errorElement = this._form.querySelector(`#${inputSelector.id}_error`)
        inputSelector.classList.add(this._inputError)
        errorElement.textContent = errorMesage
        errorElement.classList.add(this._spanError)
    }
    _errorHide(inputSelector) {
        const errorElement = this._form.querySelector(`#${inputSelector.id}_error`)
        inputSelector.classList.remove(this._inputError)
        errorElement.textContent = ""
        errorElement.classList.remove(this._spanError)
    }
    _validate = (inputSelector) => {
        if (!inputSelector.validity.valid) {
            this._errorShow(inputSelector, inputSelector.validationMessage)
        } else {
            this._errorHide(inputSelector)
        }
    }
    _buttonUnDisabled() {
        this._submitButton.classList.remove(this._buttonError)
        this._submitButton.disabled = false
    }

    buttonDisabled() {
        this._submitButton.classList.add(this._buttonError)
        this._submitButton.disabled = true
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputSelector)) {
            this.buttonDisabled()
        } else {
            this._buttonUnDisabled()
        }
    }
    _setEventListeners() {
        // this._toggleButtonState(inputItems)
        this._inputSelector.forEach((input) => {
            input.addEventListener("input", () => {
                this._validate(input)
                this._toggleButtonState()
            })
        })
    }

    enableValidation() {
        const formList = Array.from(this._form)
        formList.forEach((form) => {
            form.addEventListener("submit", (evt) => {
                evt.preventDefault()
            });
            this._setEventListeners()
        })
    }

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

}