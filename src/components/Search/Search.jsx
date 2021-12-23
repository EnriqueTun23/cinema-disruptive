import React from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { getMovie, getMovies } from '../../redux/actions/pelisActions';

export const Search = () => {
    // uso del dispatch
    const dispatch = useDispatch()
    // trae el estado del storage 
    const { searchLabel } = useSelector(state => state.pelis)
    // hook form para optener el valor de cada campo
    const [formValues, handleInputChange] = useForm({
        search: searchLabel,
        genre: ''
    })
    // variables del hook form
    const { search, genre } = formValues;
    // llama al endpoint relacionado de busquedas
    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim().length > 2 ) {
            dispatch(getMovie(search, genre));
        }

        if (search.trim().length == 0) {
            dispatch(getMovies())
        }
    }
    // Componente de busqueda
    return (
        <Col>
            <Form onSubmit={handleSearch}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="search">Buscar:</Form.Label>
                        <Form.Control
                            type="text"
                            id="search"
                            name="search"
                            aria-describedby="passwordHelpBlock"
                            onChange={handleInputChange}
                            value={search}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label htmlFor="genero">Genero:</Form.Label>
                        <Form.Select aria-label="Default select example" name='genre' onChange={handleInputChange} value={genre}>
                            <option value="">Selecciona el typo de pelicula</option>
                            <option value="movie">Peliculas</option>
                            <option value="series">Series</option>
                            <option value="episode">Episodios</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row>
                    <Button variant="primary" type="submit">
                        Buscar
                    </Button>
                </Row>
            </Form>

        </Col>
    )
}
