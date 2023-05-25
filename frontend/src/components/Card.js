import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `gallery__favorite ${isLiked && 'gallery__favorite_active'}`;
    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }
    return (
        <div className="gallery__item">
            <img className="gallery__image"
                 onClick={handleClick}
                 src={card.link}
                 alt={card.name}/>
            {isOwn && <button className="gallery__delete-button" onClick={handleDeleteClick}></button>}
            <div className="gallery__bottom">
                <h2 className="gallery__city">{card.name}</h2>
                <div className="gallery__right">
                    <button className={cardLikeButtonClassName} type="button"
                            aria-label="Добавить в избранное" onClick={handleLikeClick}></button>
                    <span className="gallery__like">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;