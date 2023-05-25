import {useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Routes, useNavigate} from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import {authorize, getUserEmail} from "../utils/authApi";
import InfoTooltip from "./InfoTooltip";
import * as authApi from "../utils/authApi";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isTooltipShow, setTooltipShow] = useState(false);
    const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        tokenCheck()
    }, [])

    useEffect(() => {
        if (!loggedIn) {
            return
        }
        api.getCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
        api.getUserInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [loggedIn]);

    const onRegister = (email, password) => {
        authApi.register(email, password)
            .then(data => {
                setIsTooltipSuccess(true);
                setTooltipShow(true)
                navigate('/sign-in')
            })
            .catch(err => {
                setIsTooltipSuccess(false);
                setTooltipShow(true)
            })
    }

    const onLogin = (email, password) => {
        authorize(email, password)
            .then(data => {
                if (data._id) {
                    localStorage.setItem('id', data._id)
                    setLoggedIn(true)
                    setUserEmail(email)
                    setCurrentUser(data);
                    navigate('/')
                }
            })
            .catch(() => {
                setIsTooltipSuccess(false);
                setTooltipShow(true)
            })
    }

    function onSignOut() {
        localStorage.removeItem('id');
        navigate('/sign-in')
    }

    const tokenCheck = () => {
        const id = localStorage.getItem('id');
        if (!id) {
            return
        }
        getUserEmail()
            .then(res => {
                if (res) {
                    setUserEmail(res.data.email)
                    setLoggedIn(true)
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(user) {
        api.editProfile(user)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(avatar) {
        api.changeAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit({name, link}) {
        api.addCard({name, link})
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
    }

    function closePhotoPopup() {
        setSelectedCard(null);
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(id => id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(prevState => prevState.filter(item => item._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header userEmail={userEmail} onSignOut={onSignOut}/>
                    <Routes>
                        <Route path="/sign-up" element={<Register onRegister={onRegister}/>}/>
                        <Route path="/sign-in" element={<Login handleLogin={onLogin}/>}/>
                        <Route path={'/'} element={<ProtectedRoute loggedIn={loggedIn} element={
                            () => (
                                <>
                                    <Main onEditAvatar={handleEditAvatarClick}
                                          onEditProfile={handleEditProfileClick}
                                          onAddPlace={handleAddPlaceClick}
                                          onCardClick={handleCardClick}
                                          onCardLike={handleCardLike}
                                          onCardDelete={handleCardDelete}
                                          cards={cards}
                                    />
                                    <Footer/>
                                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                                      onUpdateUser={handleUpdateUser}/>
                                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                                   onAddPlace={handleAddPlaceSubmit} on/>
                                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                                     onUpdateAvatar={handleUpdateAvatar}/>
                                    <ImagePopup card={selectedCard} onClose={closePhotoPopup}/>
                                </>)
                        }/>}></Route>
                    </Routes>
                    <InfoTooltip isTooltipShow={isTooltipShow} isTooltipSuccess={isTooltipSuccess}
                                 setTooltipShow={setTooltipShow}/>
                </div>
            </div>
        </CurrentUserContext.Provider>

    );
}

export default App;
