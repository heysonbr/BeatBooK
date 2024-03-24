import React, { useState, useContext } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserDrop } from "./userDrop";
import "./modalJoin.css";
import "./flipCard.css";
import LogoVertical from "./beatBoxVertical.png";
import "./logo.css";
import "./modal.css";

export const Login = ({ onClick }) => {
  const [show, setShow] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { store, actions } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setIsFlipped(false);
  };
  const handleShow = (event) => {
    event.stopPropagation();
    setShow(true);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleClick = (event) => {
    event.preventDefault();
    setIsFlipped(!isFlipped);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    actions
      .logIn(email, password)
      .then(async () => {
        toast.success("Inicio de sesión correcto");
        actions.getPrivateData();
        // navigate("/private");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    handleClose();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error("Tus contraseñas no coinciden");
    } else {
      try {
        await actions.signUp(username, email, password, passwordConfirmation);
        toast.success("Tu usuario ha sido creado correctamente");
        setIsFlipped(false); // Cambia a la vista de inicio de sesión después de un registro exitoso
      } catch (error) {
        toast.error("Hubo un error al crear tu usuario");
      }
    }
  };

  return (
    <Container
      className="login d-flex align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      {store.user ? (
        <UserDrop />
      ) : (
        <button
          className="buttonSpecial"
          onClick={
            onClick
              ? (event) => {
                  event.stopPropagation();
                  onClick(event);
                }
              : handleShow
          }
        >
          Inicia sesión
        </button>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        onClick={handleModalClick}
        className="my-modal"
      >
        <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <form className="form" onSubmit={handleLogin}>
                <div className="flex justify-content-center">
                  <img
                    src={LogoVertical}
                    alt="My Image"
                    className="logoVertical"
                  />
                </div>
                <div className="flex-column">
                  <label>Email </label>
                </div>
                <div className="inputForm">
                  <input
                    type="text"
                    className="inputx bg-transparent "
                    placeholder="pon tu Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex-column">
                  <label>Contraseña </label>
                </div>
                <div className="inputForm">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="inputx"
                    placeholder="Pon tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </i>
                </div>

                <button className="button-submit" type="submit">
                  Iniciar sesión
                </button>
                <div className="flex-row">
                  <p className="p col">¿No tienes cuenta?</p>
                  <button className="button-submit col" onClick={handleClick}>
                    Registrate
                  </button>
                </div>
              </form>
            </div>
            <div className="flip-card-back">
              <form className="form" onSubmit={handleSignUp}>
                <div className="flex justify-content-center">
                  <img
                    src={LogoVertical}
                    alt="My Image"
                    className="logoVertical"
                  />
                </div>
                <div className="flex-column">
                  <label>Username </label>
                </div>
                <div className="inputForm">
                  <input
                    type="text"
                    className="inputx bg-transparent "
                    placeholder="pon tu Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex-column">
                  <label>Email </label>
                </div>
                <div className="inputForm">
                  <input
                    type="text"
                    className="inputx bg-transparent "
                    placeholder="pon tu Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex-column">
                  <label>Contraseña </label>
                </div>
                <div className="inputForm">
                  <input
                    type="password"
                    className="inputx"
                    placeholder="Pon tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex-column">
                  <label>Confirmar Contraseña </label>
                </div>
                <div className="inputForm">
                  <input
                    type="password"
                    className="inputx"
                    placeholder="Confirma tu contraseña"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>
                <button className="button-submit" type="submit">
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  );
};
