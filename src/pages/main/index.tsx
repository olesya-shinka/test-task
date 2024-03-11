import React, { useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { getTypesProduct } from "../../api";

const Main = () => {
  useEffect(() => {
    getTypesProduct
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div className="main-content">
      <div className="main-content-box">
        <h1 className="main-content-title">Список выпускаемой продукции</h1>
        <NavLink to={`/create`} className="main-content-btn">
          Создать тип продукции
        </NavLink>
      </div>
      <div>
        <table className="iksweb">
          <tbody>
            <tr>
              <td>№</td>
              <td>Кол-во пачек</td>
              <td>Тип упаковки</td>
              <td>Дата создания</td>
              <td>Статус</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <img src="question.svg" alt="?" />
              </td>
              <td>
                <Link to={`edit`}>
                  <FaPen style={{ marginRight: 25 }} />
                </Link>
                <FaTrashAlt />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
