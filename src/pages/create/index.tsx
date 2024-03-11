import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div className="create-content">
      <h1 className="create-content-title">Создание типа продукции</h1>
      <div className="create-content-box1">
        <p className="create-content-box1-text">Кол-во пачек</p>
        <input className="create-content-box1-input" type="text" />
      </div>
      <div className="create-content-box1">
        <p className="create-content-box1-text">Тип упаковки</p>
        <select name=" " className="create-content-box1-input">
          <option value="">компрессия</option>
          <option value="">некомпрессия</option>
        </select>
      </div>
      <div className="create-content-box1">
        <p className="create-content-box1-text">Архивировано</p>
        <input className="create-content-box1-check" type="checkbox" />
      </div>
      <div className="create-content-box1">
        <p className="create-content-box1-text2">Описание</p>

        <textarea placeholder="Описание..."></textarea>
      </div>
      <div className="create-content-box2">
        <button className="create-content-box2-btn2">Отмена</button>
        <Link to={`/`}>
          <button className="create-content-box2-btn3">Создать</button>
        </Link>
      </div>
    </div>
  );
};

export default Create;
