import React, { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalPopup from "../../components/modal";

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
  const [isPopupVisible, setPopupVisible] = React.useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const popupRef = useRef<HTMLDivElement | null>(null);

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
        isArchived: product.isArchived ? "Архив" : "Активно",
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
    setPopupVisible(false);
  };

  const handleDeleteButtonClick = (productTypeId: string) => {
    setSelectedProductId(productTypeId);
    setPopupVisible(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
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
                      {item.description.length === 0 ? (
                        <span className="tooltip-text">Нет описания</span>
                      ) : (
                        <span className="tooltip-text">{item.description}</span>
                      )}
                      <img src="question.svg" alt="?" />
                    </div>
                  </td>
                  <td>
                    <div className="actions">
                      <Link to={`edit/${item.id}`}>
                        <FaPen />
                      </Link>
                      <FaTrashAlt
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteButtonClick(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isPopupVisible && (
          <div ref={popupRef}>
            <ModalPopup
              isOpen={isPopupVisible}
              onClose={() => setPopupVisible(false)}
              onConfirm={async () => {
                if (selectedProductId) {
                  await handleDeleteProduct(selectedProductId);
                }
              }}
              productTypeId={selectedProductId || ""}
              selectedProductId={""}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
