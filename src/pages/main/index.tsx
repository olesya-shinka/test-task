import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export interface ProductSchema {
  id: String;
  packsNumber: Number;
  packageType: String;
  isArchived: Boolean;
  description: String;
  createdAt: String;
}

const Main = () => {
  const [productInfo, setProductInfo] = useState<ProductSchema[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<ProductSchema[]>(`http://localhost:8081/productTypes`)
      .then((response) => setProductInfo(response.data))
      .catch((ex) => {
        const error =
          ex.response.status === 404
            ? "Resource Not found"
            : "An unexpected error has occurred";
        setError(error);
      });
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
        {error && <p className="error">{error}</p>}
        <table className="iksweb">
          <thead>
            <td>№</td>
            <td>Кол-во пачек</td>
            <td>Тип упаковки</td>
            <td>Дата создания</td>
            <td>Статус</td>
            <td></td>
            <td></td>
          </thead>
          <tbody>
            {productInfo.map((item, i) => {
              return (
                <tr key={i}>
                  <td></td>
                  <td>{item.packsNumber.toString()}</td>
                  <td>{item.packageType}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.isArchived.toString()}</td>
                  <td>
                    <img
                      src="question.svg"
                      alt="?"
                      style={{ marginLeft: 30 }}
                    />
                  </td>
                  <td>
                    <Link to={`edit`}>
                      <FaPen style={{ marginRight: 15, marginLeft: 30 }} />
                    </Link>
                    <FaTrashAlt />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
