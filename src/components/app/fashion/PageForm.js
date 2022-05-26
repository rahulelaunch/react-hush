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
    const [btnloader, setBtnLoader] = useState(false);
    const [icon, setIcon] = useState(dummy);
    const [iconAlt, setIconAlt] = useState('');
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (state && state.row._id) {
            const data = state.row;
            setValue("name", data.name);
            setIcon(data.fashion_image)
        }
    }, []);

    useEffect(() => {
        isError(errors);
    });


    const onFileChange = (e) => {
        onFileUpload(e.target.files[0]);
    };
    const onFileUpload = (image) => {

        const formData = new FormData();
        formData.append('image', image);

        Http.callApi(url.image_upload, formData)
            .then(response => {
                setIcon(response.data.path);
                setFileName(response.data.image[0]);
            })
            .catch(error => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    };

    const onSubmit = (data) => {


        setBtnLoader(true);
        if (state && state.row._id) {

            if (fileName) {
                data["fashion_image"] = fileName;
            } else {
                var str = state.row.fashion_image;
                console.log(str);
                data["fashion_image"] = str.slice(34);
                console.log(data);
            }
            data["id"] = state.row._id;

            Http.callApi(url.fashion_update, data)
                .then((response) => {
                    setBtnLoader(false);
                    successResponse(response);
                    navigate('/admin/fashion/list');
                })
                .catch((error) => {
                    setBtnLoader(false);
                    if (error.response) {
                        errorResponse(error);
                    }
                });

        } else {
            data["fashion_image"] = fileName;
            Http.callApi(url.fashion_store, data)
                .then((response) => {
                    setBtnLoader(false);
                    successResponse(response);
                    navigate('/admin/fashion/list');
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
                     Fashion Type
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
                            <FormLabel htmlFor="name">Fashion Type Name</FormLabel>
                            <input type="text"
                                className="form-control"
                                id="name"
                                name='name'
                                placeholder="Enter Fashion Name"
                                {...register('name', {
                                    required: "Fashion Name is required",
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
                    <div className="form-row">
                        <Col md="4 mb-3">
                            <div className="form-group">
                                <FormLabel htmlFor="fashion_image">Image Upload</FormLabel>
                                <input
                                    {...register('fashion_image', (state == null) ? { required: "image is required" } : '')}
                                    type="file"
                                    className="form-control"
                                    id="fashion_image"
                                    name="fashion_image"
                                    placeholder="Select fashion image"
                                    onChange={onFileChange}
                                    accept="image/png,image/jpeg"
                                />
                            </div>
                            <div className="form-group">
                                <img
                                    src={icon}
                                    alt={iconAlt} width="150px" height="150px"
                                    className="imgBox"
                                />
                            </div>
                        </Col>

                    </div>
                    <ButtonSubmitReset btnloader={btnloader} onsubmitFun={() => {
                        reset(setIconAlt(''), setIcon(dummy));
                    }} />
                </Form>

            </Card>
        </>
    );
};

export default PageForm;
