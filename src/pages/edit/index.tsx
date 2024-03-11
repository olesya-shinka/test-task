import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Edit = () => {
  return (
    <div className="edit-content">
      <h1 className="edit-content-title">Редактирование типа продукции</h1>
      <div className="edit-content-box1">
        <p className="edit-content-box1-text">Кол-во пачек</p>
        <input className="edit-content-box1-input" type="text" />
      </div>
      <div className="edit-content-box1">
        <p className="edit-content-box1-text">Тип упаковки</p>
        <select name=" " className="edit-content-box1-input">
          <option value="">компрессия</option>
          <option value="">некомпрессия</option>
        </select>
      </div>
      <div className="edit-content-box1">
        <p className="edit-content-box1-text">Архивировано</p>
        <input className="edit-content-box1-check" type="checkbox" />
      </div>
      <div className="edit-content-box1">
        <p className="edit-content-box1-text2">Описание</p>

        <textarea placeholder="Описание..."></textarea>
      </div>
      <div className="edit-content-box2">
        <button className="edit-content-box2-btn1">Удалить</button>
        <button className="edit-content-box2-btn2">Отмена</button>
        <Link to={`/`}>
          <button className="edit-content-box2-btn3">Сохранить</button>
        </Link>
      </div>
    </div>
  );
};

export default Edit;