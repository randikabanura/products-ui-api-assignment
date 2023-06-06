// A mock function to mimic making an async request for data
import axios from "axios";


export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500),
  )
}

export function fetchProduct(id = 1) {
  return new Promise<{ data: {} }>((resolve) =>
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        resolve({ data: response.data })
      })
      .catch(error => {
        console.error(error);
      })
  )
}

export function fetchProducts() {
  return new Promise<[]>((resolve) =>
    axios.get(`https://dummyjson.com/products`)
      .then(response => {

        resolve(response.data.products)
      })
      .catch(error => {
        console.error(error);
      })
  )
}

export function searchProducts(query = '') {
  return new Promise<[]>((resolve) =>
    axios.get(`https://dummyjson.com/products/search?q=${query}`)
      .then(response => {
        resolve(response.data.products)
      })
      .catch(error => {
        console.error(error);
      })
  )
}
