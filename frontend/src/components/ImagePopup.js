function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_photo ${card ? 'popup_opened' : ''}`}>
            <div className="popup__image-container popup-wrapper">
                <img className="popup__image"
                     src={card?.link} alt={card?.name}/>
                <span className="popup__photo-name">{card?.name}</span>
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;