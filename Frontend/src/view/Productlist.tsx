import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

interface Product {
    productId: string;
    name: string;
    brand: string;
    color: string;
    specification: string;
    price: number;
    imageURL: string;
    category: {
        categoryId: string;
        name: string;
    };
}

let url = 'http://localhost:8080';

interface ProductContentProps {
    category: string;
}

interface ProductListProps {
    category: string;
}

const ProductList = ({ category }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = () => {
        axios
            .get(`${url}/products`)
            .then(function (response) {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const filteredProducts = products.filter((product) => {
        const productString = `${product.name} ${product.brand} ${product.color} ${product.specification}`.toLowerCase();
        return product.category.categoryId === category && productString.includes(searchText.toLowerCase());
    });
    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
                label="Szukaj"
                variant="outlined"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                sx={{ mb: 2, width: '50%' }}
            />
        </Box>

    {filteredProducts.length > 0 ? (
        <Box sx={{ border: '1px solid grey', padding: '17px', borderRadius: '8px', width: '90%' }}>
            <Grid container spacing = '2'>
                <Grid item xs={9}>
                    {filteredProducts.map((product) => (
                        <li key={product.productId} style={{ listStyleType: 'none' }}>
                            <Typography>Nazwa: {product.name ?? 'unknown'}</Typography>
                            <Typography>Marka: {product.brand ?? 'unknown'}</Typography>
                            <Typography>Kolor: {product.color ?? 'unknown'}</Typography>
                            <Typography>Specyfikacja: {product.specification ?? 'unknown'}</Typography>
                            <Typography>Cena: {product.price ?? 'unknown'}</Typography>
                            <Button variant="contained" color="primary">
                                Dodaj do koszyka
                            </Button>
                            <Grid item xs={12}>
                                <Box sx={{ borderBottom: '1px solid grey', marginTop: 2 }} />
                            </Grid>
                        </li>
                    ))}
                </Grid>
                <Grid item xs={1} sx={{ textAlign: 'center' }}>
                    {filteredProducts.map((product) => (
                        <Box
                            component="img"
                            sx={{
                                height: 173.5,
                                width: 250,

                                maxWidth: { xs: 350, md: 250 },
                                padding: 0,
                                border: '1px solid grey',
                                borderRadius: 0,
                                display: 'block',
                                margin: 'auto',
                                boxSizing: 'border-box',
                                borderTop: '0',
                                borderLeft: '0',
                                borderRight: '0'
                            }}
                            src={product.imageURL}
                        />
                    ))}
                </Grid>

            </Grid>
        </Box>
    ) : (
        <p></p>
    )}
    </>
    );
}
export default ProductList;