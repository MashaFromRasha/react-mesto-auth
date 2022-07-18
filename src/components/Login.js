import React, { useState } from "react";

import "../styles/Login.css";
function Login(props) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSumbit(e) {
    e.preventDefault();
    if (!formParams.email || !formParams.password){
        return;
      }
      props.handleLogin({ email: formParams.email, password: formParams.password })
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <div className="login__container">
        <form onSubmit={handleSumbit} className="login__form">
          <input
            className="login__input"
            id="email"
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
            value={formParams.email}
          />
          <input
            className="login__input"
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
            value={formParams.password}
          />
          <button type="submit" className="login__button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
