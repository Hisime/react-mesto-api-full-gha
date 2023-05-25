import PopupWithForm from "./PopupWithForm";
import {useEffect} from "react";
import {useFormValidation} from "../utils/useFormValidation";

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
    const { values, errors, isValid, handleChange, reset, setValue, formRef } = useFormValidation();
    useEffect(() => {
        setValue('avatar-link', '')
    }, [isOpen, setValue])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: values['avatar-link']
        });
    }

    const errorClassname = (name) => `popup__input ${errors[name] ? 'popup__input_type_error' : ''}`;
    const onClosePopup = () => {
        onClose()
        reset({'avatar-link': ''})
    }

    return (
        <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
            isOpen={isOpen}
            closeAllPopups={onClosePopup}
            ref={formRef}
            isValid={isValid}>
            <input className={errorClassname('avatar-link')} value={values['avatar-link'] || ''} onChange={handleChange} id="avatar-link" name="avatar-link" type="url"
                   placeholder="Ссылка на аватар" required/>
            <span className="popup__input-error avatar-link-error">{errors['avatar-link']}</span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;