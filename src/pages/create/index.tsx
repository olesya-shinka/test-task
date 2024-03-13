import { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";

export interface Payload {
  packsNumber: number;
  packageType: string;
  isArchived: boolean;
  description: string;
}

const Create: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [packsNumber, setPackNumber] = useState<number>(0);
  const [packageType, setPackageType] = useState<string>("");
  const [isArch, setIsArch] = useState<boolean>(false);
  const defaultvalue = " ";

  const postData = async (data: Payload) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/productTypes",
        data
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePostData = async () => {
    const payload: Payload = {
      packsNumber: packsNumber,
      packageType: packageType,
      isArchived: isArch,
      description: description,
    };
    await postData(payload);
  };

  return (
    <div className="create-content">
      <h1 className="create-content-title">Создание типа продукции</h1>
      <div className="create-content-box1">
        <p className="create-content-box1-text">Кол-во пачек</p>
        <input
          className="create-content-box1-input"
          type="text"
          value={packsNumber}
          onChange={(e) => setPackNumber(Number(e.target.value))}
        />
      </div>
      <div className="create-content-box1">
        <label htmlFor="nametype">
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
        <Link to={`/`}>
          <button
            type="submit"
            className="create-content-box2-btn3"
            onClick={handlePostData}
          >
            Создать
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Create;
