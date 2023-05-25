import PopupWithForm from "./PopupWithForm";
import {useEffect} from "react";
import {useFormValidation} from "../utils/useFormValidation";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const { values, errors, isValid, handleChange, setValue, reset, formRef } = useFormValidation();
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: values['input-title'],
            link: values['input-link'],
        });
    }

    useEffect( () => {
        setValue('input-title', '')
        setValue('input-link', '')
    }, [isOpen, setValue])

    const errorClassname = (name) => `popup__input ${errors[name] ? 'popup__input_type_error' : ''}`;
    const onClosePopup = () => {
        onClose()
        reset({'input-title': '', 'input-link': ''})
    }

    return (
        <PopupWithForm
            name={'add'}
            title={'Новое место'}
            buttonText='Создать'
            onSubmit={handleSubmit}
            isOpen={isOpen}
            closeAllPopups={onClosePopup}
            ref={formRef}
            isValid={isValid}
        >
            <input className={errorClassname('input-title')} id="input-title" name="input-title" type="text"
                   placeholder="Название" minLength="2" maxLength="30" value={values['input-title'] || ''} onChange={handleChange} required/>
            <span className="popup__input-error input-title-error">{errors['input-title']}</span>
            <input className={errorClassname('input-link')} value={values['input-link'] || ''} onChange={handleChange} id="input-link" name="input-link" type="url"
                   placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error input-link-error">{errors['input-link']}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;