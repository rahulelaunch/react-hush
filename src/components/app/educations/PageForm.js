import React, { useEffect, useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import Http from '../../security/Http';
import url from '../../../Development.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {
    errorResponse,
    successResponse,
    isError,
} from "../../helpers/response";

import ButtonSubmitReset from '../../layout/ButtonSubmitReset';
import { useLocation, useNavigate } from 'react-router-dom';
import dummy from '../../../assets/img/team/User.jpg';
import { Button, Form, Row, Col, FormLabel, Container, Card } from 'react-bootstrap';



const PageForm = () => {
    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { state } = useLocation()
    const [btnloader, setBtnLoader] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        if (state && state.row._id) {
            const data = state.row;
            setValue("desire_name", data.desire_name);
       
        }
    }, []);

    useEffect(() => {
        isError(errors);
    });



    const onSubmit = (data) => {
        setBtnLoader(true);
        if (state && state.row._id) {
            data["id"] = state.row._id;

            Http.callApi(url.desire_update, data)
                .then((response) => {
                    setBtnLoader(false);
                    successResponse(response);
                    navigate('/admin/desire/list');
                })
                .catch((error) => {
                    setBtnLoader(false);
                    if (error.response) {
                        errorResponse(error);
                    }
                });

        } else {
           
            Http.callApi(url.desire_store, data)
                .then((response) => {
                    setBtnLoader(false);
                    successResponse(response);
                    navigate('/admin/desire/list');
                })
                .catch((error) => {
                    setBtnLoader(false);
                    if (error) {
                        errorResponse(error);
                    }
                });
        }
    };

    return (
        <>
            <div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
                <h5 className="hover-actions-trigger mb-0">
                    Desire
                </h5>
            </div>
            <Card className='mb-3'>

                <Card.Header className="border-bottom border-200 mb-2">
                    <Row className="align-items-end g-2">
                        <Col sm={2} lg={3}>
                            <button type="button" className="btn btn-danger" onClick={(e) => window.history.go(-1)}>
                                <FontAwesomeIcon icon={faAngleLeft} className="mr-1" /> Back
                            </button>
                        </Col>
                    </Row>
                </Card.Header>

                <Form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <Col md="6 mb-3">
                            <FormLabel htmlFor="desire_name">Desire Name</FormLabel>
                            <input type="text"
                                className="form-control"
                                id="desire_name"
                                name='desire_name'
                                placeholder="Enter Desire Name"
                                {...register('desire_name', {
                                    required: "Desire Name is required",
                                    maxLength: {
                                        value: 30,
                                        message: "maximum length is 30"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "minimum length is 2"
                                    },
                                })}
                            />
                        </Col>
                    </div>
                    <ButtonSubmitReset btnloader={btnloader} onsubmitFun={() => {
                        reset();
                    }} />
                </Form>

            </Card>
        </>
    );
};

export default PageForm;
