import {useContext} from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <main>
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__image" src={currentUser.avatar} alt="Аватар"/>
                    <button className="profile__edit-avatar" onClick={props.onEditAvatar}></button>
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
            </section>
            <section className="gallery">
                {props.cards.map((card) =>
                    <Card key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} card={card}/>
                )}
            </section>
        </main>
    )
}

export default Main;