import React from 'react'
import { Card, Button, Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavorites } from '../../redux/actions/pelisActions';

export const CardPeli = ({item}) => {
    const dispatch = useDispatch()
    // este es una accion para eliminar de los favoritos
    const handleRemoveFavorires = () => {
        dispatch(removeFavorites(item));
    }
    // Componente relacionado a las card
    return (
        <Card style={{ width: '19rem', marginRight: '1rem', marginBottom: '1rem' }}>
            <Card.Img variant="top" src={item.Poster} />
            <Card.Body>
                <Card.Title>{item.Title}</Card.Title>
                <Card.Text>
                    <p><b>Año de estreno:</b> <span>{item.Year}</span> </p> 
                    <p><b>Typo:</b> <span>{item.Type}</span> </p> 
                </Card.Text>
                <Stack direction="horizontal" gap={3}>
                    <Button as={Link} to={`/${item.imdbID}`} variant="primary">Saber mas</Button>
                    {item.Response ? (
                        <Button onClick={handleRemoveFavorires} variant="danger">Eliminar</Button>
                    ) : (null)}
                </Stack>
            </Card.Body>
        </Card>
    )
}
