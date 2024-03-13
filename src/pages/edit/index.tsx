import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Payload } from "../create";

const Edit: React.FC<{ productTypeId: string }> = ({ productTypeId }) => {
  const [description, setDescription] = useState<string>("");
  const [packsNumber, setPackNumber] = useState<number>(0);
  const [packageType, setPackageType] = useState<string>("");
  const [isArch, setIsArch] = useState<boolean>(false);
  const defaultvalue = " ";

  useEffect(() => {
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
        console.log(error);
      }
    };
    fetchData();
    console.log()
  }, [productTypeId]);

  const handleUpdateData = async () => {
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
      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="edit-content">
      <h1 className="edit-content-title">Редактирование типа продукции</h1>
      <div className="edit-content-box1">
        <p className="edit-content-box1-text">Кол-во пачек</p>
        <input
          className="edit-content-box1-input"
          type="text"
          value={packsNumber}
          onChange={(e) => setPackNumber(Number(e.target.value))}
        />
      </div>
      <div className="edit-content-box1">
        <label htmlFor="nametype">
          <p className="edit-content-box1-text">Тип упаковки</p>
        </label>
        <select
          id="nametype"
          className="edit-content-box1-input"
          onChange={(e) => setPackageType(e.target.value)}
          value={packageType}
        >
          <option value=" " defaultValue={defaultvalue}></option>
          <option value="компрессия">компрессия</option>
          <option value="некомпрессия">некомпрессия</option>
        </select>
      </div>
      <div className="edit-content-box1">
        <p className="edit-content-box1-text">Архивировано</p>
        <input
          className="edit-content-box1-check"
          type="checkbox"
          checked={isArch}
          onChange={(e) => setIsArch(e.target.checked)}
        />
      </div>
      <div className="edit-content-box1">
        <p className="edit-content-box1-text2">Описание</p>

        <textarea
          placeholder="Описание..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="edit-content-box2">
        <button className="edit-content-box2-btn1">Удалить</button>
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
