import React from "react";

const PopupWithForm = React.forwardRef(({
    title,
    name,
    isOpen,
    buttonText,
    onSubmit,
    children,
    isValid,
    closeAllPopups
   }, ref) => {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup-wrapper">
                <h2 className="popup__title">{title}</h2>
                <form ref={ref} className="popup__form" name={`${name}-form`} onSubmit={onSubmit} noValidate>
                    {children}
                    <button className={`popup__save ${isValid ? '' : 'popup__save_inactive'}`} type="submit">{buttonText}</button>
                </form>
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={closeAllPopups}></button>
            </div>
        </div>
    );
})
export default PopupWithForm;