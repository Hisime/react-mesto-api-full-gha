import PopupWithForm from "./PopupWithForm";
import {useEffect, useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useFormValidation} from "../utils/useFormValidation";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const { values, errors, isValid, handleChange, setValue, reset, formRef } = useFormValidation();

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: values['input-name'],
            about: values['input-job'],
        });
    }

    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setValue('input-name', currentUser.name);
        setValue('input-job', currentUser.about)
    }, [currentUser, setValue]);

    const errorClassname = (name) => `popup__input ${errors[name] ? 'popup__input_type_error' : ''}`;
    const onClosePopup = () => {
        onClose()
        reset({'input-name': currentUser.name, 'input-job': currentUser.about})
    }
    return (
        <PopupWithForm name={'edit'}
                       title={'Редактировать профиль'}
                       buttonText='Сохранить'
                       isOpen={isOpen}
                       closeAllPopups={onClosePopup}
                       onSubmit={handleSubmit}
                       ref={formRef}
                       isValid={isValid}>
            <input className={errorClassname('input-name')} value={values['input-name'] || ''} onChange={handleChange} id="input-name" name="input-name" type="text"
                   minLength="2" maxLength="40" placeholder="Имя" required/>
            <span className="popup__input-error input-name-error">{errors['input-name']}</span>
            <input className={errorClassname('input-job')} value={values['input-job'] || ''} onChange={handleChange} id="input-job" name="input-job" type="text"
                   minLength="2" maxLength="200" placeholder="О себе" required/>
            <span className="popup__input-error input-job-error">{errors['input-job']}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;