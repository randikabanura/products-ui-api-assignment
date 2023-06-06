import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from "../app/hooks";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { removeCurrentProduct, searchProductsAsync } from "../features/product/productSlice";
import { Button, debounce } from "@mui/material";
import { Image } from 'mui-image'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState("")
  const firstUpdate = useRef(true);
  const inputRef = useRef(null);

  const handleDebounceSearch = debounce(change => {
    setQuery(change);
    dispatch(removeCurrentProduct())
  }, 1000)

  const handleResetClick = () => {
    setQuery("");
    inputRef.current.value = "";
  }

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    dispatch(searchProductsAsync(query))
  }, [query])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Image src="/logo.jpeg" width={50} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Products
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputRef={inputRef}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                handleDebounceSearch(e.target.value);
              }}
            />
          </Search>
          { query != null && query != "" && <Button variant="contained" color="secondary" onClick={() => handleResetClick()}>Clear</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}