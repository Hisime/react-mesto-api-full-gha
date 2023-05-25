import React from "react";
import Error from '../../src/images/cancel.svg';
import Accept from '../../src/images/accept.svg';

function InfoTooltip({isTooltipShow, isTooltipSuccess, setTooltipShow}) {
    function handleCloseClick() {
        setTooltipShow(false)
    }
    return (
        <div className={`popup ${isTooltipShow ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_info">
                <div className="popup__info-icon" style={{backgroundImage: `url(${isTooltipSuccess ? Accept : Error})`}}></div>
                <p className="popup__info-message">
                    {`${isTooltipSuccess ?
                        'Вы успешно зарегистрировались!'
                        :
                        'Что-то пошло не так! Попробуйте ещё раз.'
                        }`}
                        </p>
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={handleCloseClick}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;