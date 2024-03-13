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
  isArchived: boolean | string;
  description: string;
  createdAt: string;
}

const Main: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductSchema[]>([]);
  // const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get<ProductSchema[]>(
        `http://localhost:8081/productTypes`
      );
      const formattedProductInfo = response.data.map((product) => ({
        ...product,
        isArchived: product.isArchived === "true" ? "Архив" : "Активно",
        createdAt: new Date(product.createdAt).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      }));
      setProductInfo(formattedProductInfo);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteProduct = async (productTypeId: string) => {
    try {
      await axios.delete(`http://localhost:8081/productTypes/${productTypeId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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
                  <td>{item.isArchived}</td>
                  <td className="descr">
                    <div className="tooltip-container">
                      <span className="tooltip-text">{item.description}</span>
                      <img src="question.svg" alt="?" />
                    </div>
                  </td>
                  <td>
                    <div className="actions">
                      <Link to={`edit/${item.id}`}>
                        <FaPen />
                      </Link>
                      <FaTrashAlt
                        onClick={() => handleDeleteProduct(item.id)}
                      />
                    </div>
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
