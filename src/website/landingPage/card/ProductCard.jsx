import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react'
import apiUrl from '../../../environment/enviroment';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function ProductCard() {
    const [apiResponse, setApiResponse] = useState(null)
    const [loadingData, setLoadingData] = useState(false)
    const navigate = useNavigate()
    function getProducts() {
        setLoadingData(true)
        axios.get(`${apiUrl.baseUrl}/admin/products`)
            .then((response) => {
                setApiResponse(response.data)
                setLoadingData(false)
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
                setApiResponse(error.response.data)
                setLoadingData(false)
            });
    }
    useEffect(() => {
        getProducts()
    }, []
    )

    return <>
        <div style={{ display: "flex", width: "60%", margin: "auto", flexWrap: "wrap" }}>
            {
                apiResponse?.data.map((r) => {
                    return <div key={r._id} style={{ width: "60%", width: "31%", padding: "5px" }}>
                        <Card key={r._id} sx={{ mt: 8 }}>
                            <CardHeader
                                title={r.name}
                                subheader={r.shortName}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={r.imagePath}
                                alt="img"
                                onClick={() => navigate(`/product-details/${r._id}`)}
                            />
                            <CardContent>
                                <Typography sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "1", overflow: "hidden" }} variant="body2" color="text.secondary">
                                    {r.description}
                                </Typography>
                            </CardContent>
                            <Button color='success'>Buy Now</Button>
                            {!loadingData && !apiResponse?.data.length &&
                                <Typography sx={{ width: "50" }}>No  Data yet</Typography>
                            }
                            {loadingData && !apiResponse?.data.length &&
                                <Typography>Data is being Loading</Typography>
                            }
                        </Card>
                    </div>
                })}
        </div>
    </>
}