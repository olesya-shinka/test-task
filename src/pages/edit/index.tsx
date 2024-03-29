/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Payload } from "../create";
import { useDispatch } from "react-redux";
import { updateProductType, deleteProductType } from "../../store/slices/addTypeProductSlice";

const Edit: React.FC<{ productTypeId: string }> = () => {
  const { productTypeId } = useParams<{ productTypeId: string }>();
  const [description, setDescription] = useState<string>("");
  const [packsNumber, setPackNumber] = useState<number>(0);
  const [packageType, setPackageType] = useState<string>("");
  const [isArch, setIsArch] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const navigate = useNavigate();
  const defaultvalue = " ";
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/productTypes/${productTypeId}`
      );
      const productData: Payload = response.data;
      setPackNumber(productData.packsNumber);
      setPackageType(productData.packageType);
      setIsArch(productData.isArchived);
      setDescription(productData.description);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productTypeId]);

  const handleUpdateData = async () => {
    if (
      packsNumber <= 0 &&
      !["компрессия", "некомпрессия"].includes(packageType.trim())
    ) {
      setError("Пожалуйста, заполните обязательные поля.");
      return;
    }
    const payload: Payload = {
      packsNumber: packsNumber,
      packageType: packageType,
      isArchived: isArch,
      description: description,
    };
    try {
      const response = await axios.patch(
        `http://localhost:8081/productTypes/${productTypeId}`,
        payload
      );
      dispatch(updateProductType(response.data));
      navigate(`/`);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("");
    }
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить продукт?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:8081/productTypes/${productTypeId}`
        );
        dispatch(deleteProductType(response.data));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="edit-content">
      <h1 className="edit-content-title">Редактирование типа продукции</h1>
      {error && <p className="error">{error}</p>}
      <div className="edit-content-box1">
        <label htmlFor="packsNumber" className="required-label">
          <p className="edit-content-box1-text">Кол-во пачек</p>
        </label>
        <input
          id="packsNumber"
          className="edit-content-box1-input"
          type="number"
          name="packsNumber"
          value={packsNumber}
          onChange={(e) => setPackNumber(Number(e.target.value))}
        />
      </div>
      <div className="edit-content-box1">
        <label htmlFor="nametype" className="required-label">
          <p className="edit-content-box1-text">Тип упаковки</p>
        </label>
        <select
          id="nametype"
          className="edit-content-box1-input"
          name="nametype"
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          <option value=" " defaultValue={defaultvalue}></option>
          <option value="компрессия">компрессия</option>
          <option value="некомпрессия">некомпрессия</option>
        </select>
      </div>
      <div className="edit-content-box1">
        <label htmlFor="isArchived">
          <p className="edit-content-box1-text">Архивировано</p>
        </label>
        <input
          id="isArchived"
          className="edit-content-box1-check"
          type="checkbox"
          name="isArchived"
          checked={isArch}
          onChange={(e) => setIsArch(e.target.checked)}
        />
      </div>
      <div className="edit-content-box1">
        <label htmlFor="description">
          <p className="edit-content-box1-text2">Описание</p>
        </label>
        <textarea
          placeholder="Описание..."
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="edit-content-box2">
        <Link to={`/`}>
          <button
            className="edit-content-box2-btn1"
            onClick={handleDeleteProduct}
          >
            Удалить
          </button>
        </Link>
        <Link to={`/`}>
          <button className="edit-content-box2-btn2">Отмена</button>
        </Link>
        <button
          type="submit"
          className="edit-content-box2-btn3"
          onClick={handleUpdateData}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Edit;
