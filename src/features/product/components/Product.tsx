import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  removeCurrentProduct,
  selectProduct
} from "../productSlice";
import Box from "@mui/material/Box"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import { Button, Grid, Typography } from "@mui/material";

export function Product() {
  const product = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h1">{product.title}</Typography>
        <Button variant="contained" onClick={() => dispatch(removeCurrentProduct())}>Back</Button>
      </Grid>

      {(
        <Box>
          <ImageList variant="masonry" cols={3} gap={8}>
            {product.images.map((item) => (
              <ImageListItem key={item}>
                <img
                  src={`${item}`}
                  srcSet={`${item}`}
                  alt={item}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
      <Typography variant="h6"><strong>Description: </strong>{product.description}</Typography>
      <Typography variant="h6"><strong>Brand: </strong>{product.brand}</Typography>
      <Typography variant="h6"><strong>Price: </strong>{product.price}</Typography>
      <Typography variant="h6"><strong>Category: </strong>{product.category}</Typography>
      <Typography variant="h6"><strong>Rating: </strong>{product.rating}</Typography>
    </>
  )
}