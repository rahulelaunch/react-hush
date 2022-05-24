import React, { useEffect, useState, useRef } from "react";
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
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const password = useRef({});
    password.current = watch("new_password", "");
    const [btnloader, setBtnLoader] = useState(false);


    useEffect(() => {
        isError(errors);
    });

    const navigate = useNavigate();
    const onSubmit = (data) => {

        // setBtnLoader(true);

        Http.callApi(url.change_password, JSON.stringify(data))
            .then((response) => {
                // setBtnLoader(false);
                successResponse(response);
                localStorage.removeItem('access_token');
                navigate('/admin/login');

            })
            .catch((error) => {
                setBtnLoader(false);
                if (error.response) {
                    errorResponse(error);
                }
            });
    };

    return (
        <>
            <div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
                <h5 className="hover-actions-trigger mb-0">
                    Admin Profile
                </h5>
            </div>
            <Card className='mb-5'>

                <Form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <Col md="6 mb-3">
                            <FormLabel htmlFor="password">Current Password</FormLabel>
                            <input type="password"
                                className="form-control"
                                id="old_password"
                                placeholder="Current Password"
                                {...register('old_password', {
                                    required: true,
                                    maxLength: {
                                        value: 15,
                                        message: "maximum length is 15"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "minimum length is 6"
                                    },
                                }
                                )}
                            />
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col md="6 mb-3">
                            <FormLabel htmlFor="password">New Password</FormLabel>
                            <input type="password"
                                className="form-control"
                                id="new_password"
                                placeholder="New Password"
                                {...register('new_password', {
                                    required: true,
                                    maxLength: {
                                        value: 15,
                                        message: "maximum length is 15"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "minimum length is 6"
                                    },
                                }
                                )}
                            />
                        </Col>
                        <Col md="6 mb-3">
                            <FormLabel htmlFor="password_repeat">Confirm Password </FormLabel>
                            <input type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                {...register('confirmPassword', {
                                    validate: value =>
                                        value === password.current || "New Password And Confirm Password Should be match"
                                }
                                )}
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
