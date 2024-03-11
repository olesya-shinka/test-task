import axios from 'axios';

export const getTypesProduct = axios.get(`http://localhost:8081/productTypes`);

export const getTypesProductById = axios.get(`http://localhost:8081/productTypes/{productTypeId}`);

export const postProduct = async () => {
    const res = await axios.post(`http://localhost:8081/productTypes`, {
        body: {
            "packsNumber": '',
            "packageType": "компрессия",
            "isArchived": false,
            "description": "Описание продукции\nВ несколько строк"

        }
    }

    )
}