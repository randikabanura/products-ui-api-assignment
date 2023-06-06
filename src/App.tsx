import { Products } from "./features/product/components/Products"
import "./App.css"
import { Container } from "@mui/material";
import SearchAppBar from "./components/SearchAppBar";
import { useAppSelector } from "./app/hooks";
import { selectProduct } from "./features/product/productSlice";
import { Product } from "./features/product/components/Product";

function App() {
  const product = useAppSelector(selectProduct)

  return (
    <>
      <SearchAppBar />
      <Container fixed style={{marginTop: '50px'}}>
        {  product != null ?  <Product /> :  <Products />}
      </Container>
    </>

  )
}

export default App
