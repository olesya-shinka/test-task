import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export interface ProductSchema {
  id: string;
  packsNumber: number;
  packageType: string;
  isArchived: boolean;
  description: string;
  createdAt: string;
}

const Main: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductSchema[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<ProductSchema[]>(`http://localhost:8081/productTypes`)
      .then((response) => {
        const formattedProductInfo = response.data.map((product) => ({
          ...product,
          createdAt: new Date(product.createdAt).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        }));
        setProductInfo(formattedProductInfo);
      })
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
                    <div className="tooltip-container">
                      <span className="tooltip-text">{item.description}</span>
                      <img src="question.svg" alt="?" />
                    </div>
                  </td>
                  <td>
                    <Link to={`edit/${item.id}`}>
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
