import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Stack, Image, Badge, Button, Modal, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams} from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { addFavorites, getMovieDescription, resetSent, sendEmail } from '../redux/actions/pelisActions';

import './index.css';

export const PeliPage = () => {
    // este state sirve para activar el modal
    const [show, setShow] = useState(false);
    // se optiene el params de la url
    const { peli } = useParams();
    // trae el estado del storage 
    const { dataDescription, requestSent, dataSent, existsFavorites } = useSelector(state => state.pelis)
    // llamar al metodo dispatch
    const dispatch = useDispatch()

    // Cerrar el modal
    const handleClose = () => setShow(false);
    // Abrir el modal
    const handleShow = () => setShow(true);
    // hook form para optener el valor de cada campo
    const [formValues, handleInputChange] = useForm({
        email: '',
    })
    // Este use Effect hace la peticion para optener la pelicula o serie especifica
    useEffect(() => {
        if (Object.keys(dataDescription).length === 0) {
            dispatch(getMovieDescription(peli))
        }
    }, [dataDescription])
    // Este use Effect si se hace un envio de correo electronico reseta las variables correspondientes
    useEffect(() => {
        if (Object.keys(dataSent).length > 0) {
            handleClose();
            dispatch(resetSent())
        }
    })

    const { email } = formValues;

    
    // Envio de los datos para enviar un correo electronico
    const handleSendEmail = () => {
        if (email.trim().length > 0) {
            const data = {
                email,
                title: dataDescription.Title,
                date: dataDescription.Released,
                img: dataDescription.Poster
            }
            dispatch(sendEmail(data))
        }
    }
    // Agregar a Favoritos
    const handleAddFavorites = () => {
        dispatch(addFavorites(dataDescription))
    }
    return (
        <Container fluid="md">
            <Stack gap={3}>
                <Row className='mt'>
                    <Col>
                        <h1>{dataDescription.Title}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Image src={dataDescription.Poster} />
                    </Col>
                    <Col>
                        <p><b><h3>Fecha de estreno:</h3></b> {dataDescription.Released} </p>
                        <p><b><h3>Genero:</h3></b> {dataDescription.Genre} </p>
                        <p><b><h3>Director:</h3></b> {dataDescription.Director} </p>
                        <p>
                            <h3>
                            <b>
                                Value: {'  '}
                            </b> 
                                <Badge bg="secondary">{dataDescription.Ratings ? dataDescription.Ratings[0].Value : '0/10' }</Badge> 
                            </h3>
                        </p>
                        <p><b><h3>Sinopsis:</h3></b> {dataDescription.Plot} </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" size="lg" onClick={handleAddFavorites}>
                            Favoritos
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="success" size="lg" onClick={handleShow}>
                            Enviar al correo
                        </Button>
                    </Col>
                </Row>
                {existsFavorites ? (
                    <Row>
                        <Col>
                            <Alert variant='warning'>
                                Ya existe {dataDescription.Title} agregado a favoritos
                            </Alert>
                        </Col>
                    </Row>
                ) : (null)}
                
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    {requestSent ? (
                        <h2>Cargando...</h2>
                    ) : (
                        <>
                                <Modal.Header closeButton>
                                    <Modal.Title>Enviar al correo</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Label htmlFor="search">Enviar al correo:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="search"
                                        name="email"
                                        aria-describedby="passwordHelpBlock"
                                        onChange={handleInputChange}
                                        value={email}
                                        autoComplete="off"
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={handleClose}>
                                        Cerrar
                                    </Button>
                                    <Button onClick={handleSendEmail} variant="primary">Enviar</Button>
                                </Modal.Footer>
                        </>
                    )}
                    
                </Modal>
            </Stack>
        </Container>
    )
}
