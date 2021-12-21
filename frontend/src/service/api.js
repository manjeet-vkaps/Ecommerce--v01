import axios from "axios"

const url = "http://localhost:4000/api/v1/product"

export const deleteProduct = async (id) => {
    return await axios.delete(`${url}/${id}`);
}