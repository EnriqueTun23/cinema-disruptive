import React, { useEffect } from 'react'
import { Container, Row, Col, Stack, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CardPeli } from '../components/CardPeli/CardPeli';
import { Search } from '../components/Search/Search';
import { getMovies, resetMovie } from '../redux/actions/pelisActions';


export const HomePage = () => {
    // trae el estado del storage 
    const { requestData, data, error, dataDescription} = useSelector(state => state.pelis)
    // llamar al metodo dispatch
    const dispatch = useDispatch()
    // Este use effect se usa para cargar por primera vez las primeras peliculas
    useEffect(() => {
        if (Object.keys(data).length === 0 ) {
            dispatch(getMovies())
        }
    }, [data])
    // Este use Effect se usa para resetear los  valores cuando se va ala descripcion de una pelicula
    useEffect(() => {
        if (Object.keys(dataDescription).length > 0) {
            dispatch(resetMovie())
        }
    }, [])
    // Pagina principal
    return (
        <Container fluid="md">
            <Stack gap={3}>
                <Row>
                    <Col>
                        <h1>Peliculas</h1>
                    </Col>
                </Row>
                <Row>
                    <Search />
                </Row>
                {
                    requestData ? (
                        <h1>Cargando...</h1>
                    ) : (null)
                }
                {
                    !requestData && Object.keys(data).length > 0 ?  (
                        <Row xs={2} md={4} lg={6}>
                            {data.map(item => (
                                <CardPeli key={item.imdbID} item={item} />
                            ))
                            }
                        </Row>
                    ) : (
                        <Row>
                                <Alert variant='warning'>
                                    No existe ninguna serie, pelicula o episodio.
                                </Alert>
                        </Row>
                    )
                }
                
            </Stack>
        </Container>
    )
}
