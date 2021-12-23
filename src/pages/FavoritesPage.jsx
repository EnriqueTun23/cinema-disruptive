import React from 'react'
import {  useSelector } from 'react-redux'
import { Container, Row, Col, Stack, Alert } from 'react-bootstrap';
import { CardPeli } from '../components/CardPeli/CardPeli';

export const FavoritesPage = () => {
    // trae el estado del storage 
    const { favorites } = useSelector(state => state.pelis)
    return (
        <Container fluid="md">
            <Stack gap={3}>
                <Row>
                    <Col>
                        <h1>Lista de favoritos</h1>
                    </Col>
                </Row>
                {favorites.length > 0 ? (
                    <Row xs={2} md={4} lg={6}>
                        {favorites.map(item => (
                        <CardPeli key={item.imdbID} item={item} />
                        ))}
                    </Row>
                ) : (
                        <Row>
                            <Alert variant='danger'>
                                No existe ningun favorito.
                            </Alert>
                        </Row>
                )}
            </Stack>
        </Container>
    )
}
