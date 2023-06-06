import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useAppDispatch } from "../app/hooks";
import { getProductAsync } from "../features/product/productSlice";

interface MultiActionAreaCardProps {
  id: number;
  image: string;
  alt: string;
  title: string;
  description: string;
}

export default function MultiActionAreaCard({ id, image, alt, title, description }: MultiActionAreaCardProps) {
  const dispatch = useAppDispatch()

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => dispatch(getProductAsync(id))}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => dispatch(getProductAsync(id))}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}