/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProductType } from "../../store/slices/addTypeProductSlice";

export interface Payload {
  packsNumber: number;
  packageType: string;
  isArchived: boolean;
  description: string;
}

const Create: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [packsNumber, setPackNumber] = useState<number | null | undefined>();
  const [packageType, setPackageType] = useState<string>("");
  const [isArch, setIsArch] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultvalue = " ";

  const handlePostData = async () => {
    if (
      packsNumber === null ||
      packsNumber === undefined ||
      packsNumber <= 0 ||
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
      const response = await axios.post(
        `http://localhost:8081/productTypes`,
        payload
      );
      dispatch(addProductType(response.data));
      navigate(`/`); 
    } catch (error) {
      console.error("Ошибка при создании продукта:", error);
      setError("Ошибка при создании продукта.");
    }
  };

  return (
    <div className="create-content">
      <h1 className="create-content-title">Создание типа продукции</h1>
      {error && <p className="error">{error}</p>}
      <div className="create-content-box1">
        <label htmlFor="packsNumber" className="required-label">
          <p className="create-content-box1-text">Кол-во пачек</p>
        </label>
        <input
          id="packsNumber"
          className="create-content-box1-input"
          type="text"
          value={packsNumber ?? ""}
          onChange={(e) => setPackNumber(Number(e.target.value))}
        />
      </div>
      <div className="create-content-box1">
        <label htmlFor="nametype" className="required-label">
          <p className="create-content-box1-text">Тип упаковки</p>
        </label>
        <select
          className="create-content-box1-input"
          id="nametype"
          onChange={(e) => setPackageType(e.target.value)}
          value={packageType}
        >
          <option value=" " defaultValue={defaultvalue}></option>
          <option value="компрессия">компрессия</option>
          <option value="некомпрессия">некомпрессия</option>
        </select>
      </div>
      <div className="create-content-box1">
        <p className="create-content-box1-text">Архивировано</p>
        <input
          className="create-content-box1-check"
          type="checkbox"
          checked={isArch}
          onChange={(e) => setIsArch(e.target.checked)}
        />
      </div>
      <div className="create-content-box1">
        <p className="create-content-box1-text2">Описание</p>

        <textarea
          placeholder="Описание..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="create-content-box2">
        <Link to={`/`}>
          <button className="create-content-box2-btn2">Отмена</button>
        </Link>
        <button
          type="submit"
          className="create-content-box2-btn3"
          onClick={handlePostData}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default Create;
