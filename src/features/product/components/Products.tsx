import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import {
  getAllProductsAsync,
  selectProducts,
  currentStatus,
} from "../productSlice"
import MultiActionAreaCard from "../../../components/MultiActionAreaCard"
import { Backdrop, CircularProgress, Grid } from "@mui/material"

export function Products() {
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(currentStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllProductsAsync())
  }, [])

  return (
    <>
      {status == "loading" ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {products != null &&
          products != [{}] &&
          products.map((productItem) => (
            <Grid item xs={2} sm={4} md={4} key={productItem.id}>
              <MultiActionAreaCard
                key={productItem.id}
                id={productItem.id}
                image={productItem.thumbnail}
                alt={productItem.description}
                title={productItem.title}
                description={productItem.description}
              />
            </Grid>
          ))}
      </Grid>
    </>
  )
}
