import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header.js";
import Footer from "./Footer.js";
import PopupWithForm from "./Profile/PopupWithForm.js";
import ImagePopup from "./ImagesControl/ImagePopup.js";
import api from "./api.js";
import * as auth from "./utils/auth.js";
import { CurrentUserContext } from "../shared_src/contexts/CurrentUserContext.js";

/*
Основное приложение используеться для:
1) отрисовки Header и Footer
2) проверки токена и активной сессии пользователя при монтировании
3) загрузки остальных микрофронтов
Все остальные сеттеры и обработчики переезжают в соотвествующие микрофронты
*/
function App() {
  //const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
  // React.useState(false);
  //const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  //const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
  // React.useState(false);
  //const [selectedCard, setSelectedCard] = React.useState(null);
  //const [cards, setCards] = React.useState([]);

  // В корневом компоненте App создана стейт-переменная currentUser. 
  //Она используется в качестве значения для провайдера контекста.
  //const [currentUser, setCurrentUser] = React.useState({});

  //const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  //const [tooltipStatus, setTooltipStatus] = React.useState("");

  //const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();
  // По дефолту рутим на страницу авторизации
  history.push("/signin");

  // При монтировании пытаемся получить текущего пользователя
  // Если он есть, то сразу устанавливаем его как значение для провайдера контекста
  React.useEffect(() => {
    api
      .getUserInfo()
      .then(([userData]) => {
        //setCurrentUser(userData);        
        CurrentUserContext.Provider=userData
      })
      .catch((err) => console.log(err));
  }, []);

  // При монтировании проверяем наличие токена и его валидности
  // Если токен есть, то сразу рутим на микрофронт ImagesControl
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          //setIsLoggedIn(true);          
          history.push("/imagescontrol");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  /*Все обработчики переезжают в соотвествующие микрофронты
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }
   */
  

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }
  

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    //<CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
<<<<<<< HEAD:frontend/mainapp/src/App.js
          {/*Тут нужно настроить маршруты на микрофронты через конфиги webpack.config.js
          Но как их интегрировать сюда, пока не знаю*/}
          

          {/*Роут / защищён HOC-компонентом ProtectedRoute
=======
>>>>>>> origin/main:frontend/src/components/App.js
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
<<<<<<< HEAD:frontend/mainapp/src/App.js
          />/
          *}
          {/*Роут /signup и /signin не является защищёнными, т.е оборачивать их в HOC ProtectedRoute не нужно.
=======
          />
>>>>>>> origin/main:frontend/src/components/App.js
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          */}
        </Switch>
        <Footer />
        {/*Эти компоненты уже будут управляться внутри микрофронтов
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        */}
      </div>
    //</CurrentUserContext.Provider>
  );
}

export default App;
