/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Payload } from "../create";

const Edit: React.FC<{ productTypeId: string }> = () => {
  const { productTypeId } = useParams<{ productTypeId: string }>();
  const [description, setDescription] = useState<string>("");
  const [packsNumber, setPackNumber] = useState<number>(0);
  const [packageType, setPackageType] = useState<string>("");
  const [isArch, setIsArch] = useState<boolean>(false);
  //const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const defaultvalue = " ";

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

  const patchData = async (data: Payload) => {
    try {
      await axios.patch(
        `http://localhost:8081/productTypes/${productTypeId}`,
        data
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleUpdateData = async () => {
    const payload: Payload = {
      packsNumber: packsNumber,
      packageType: packageType,
      isArchived: isArch,
      description: description,
    };

    await patchData(payload);
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
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="edit-content">
      <h1 className="edit-content-title">Редактирование типа продукции</h1>
      <div className="edit-content-box1">
        <label htmlFor="packsNumber">
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
        <label htmlFor="nametype">
          <p className="edit-content-box1-text">Тип упаковки</p>
        </label>
        <select
          id="packageType"
          className="edit-content-box1-input"
          name="packageType"
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
        <Link to={`/`}>
          <button
            type="submit"
            className="edit-content-box2-btn3"
            onClick={handleUpdateData}
          >
            Сохранить
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Edit;
