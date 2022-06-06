import React, { useEffect, useState, } from "react";
import { useForm } from "react-hook-form";
import Http from '../../security/Http';
import url from '../../../Development.json';
import {
    errorResponse,
    successResponse,
    isError,
} from "../../helpers/response";

import ButtonSubmitReset from '../../layout/ButtonSubmitReset';
import { useNavigate } from 'react-router-dom';
import dummy from '../../../assets/img/team/User.jpg';
import {Form, Col, FormLabel, Card } from 'react-bootstrap';



const PageForm = () => {
    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [btnloader, setBtnLoader] = useState(false);
    const [icon, setIcon] = useState(dummy);
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate();

    const onFileChange = (e) => {
        onFileUpload(e.target.files[0]);
    };
    const onFileUpload = (image) => {

        const formData = new FormData();
        formData.append("image", image);

        Http.callApi(url.image_upload, formData)
            .then(response => {
                setFileName(response.data.images);
                setIcon(response.data.images);
            })
            .catch(error => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    };

    const fetchData = () => {

        Http.callApi(url.get_profile)
            .then((response) => {
                
                let data = response.data;
            
                setValue("name", data.username);
                setValue("email", data.email);
                setIcon(data.profile);

            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    };
    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
       isError(errors);    
    });

    const onSubmit = (data) => {
        setBtnLoader(true);

        if (fileName) {
            data["profile"] = fileName;
        } else {
            data["profile"] = icon;
        }

        Http.callApi(url.admin_update_profile, JSON.stringify(data))
            .then((response) => {
                setBtnLoader(false);
                successResponse(response);
                navigate('/admin/dashboard');
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

                <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <Col md="6 mb-3">
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <input type="text"
                                className="form-control"
                                id="name"
                                placeholder="Name"
                                {...register('name', {
                                    required: true,

                                    maxLength: {
                                        value: 15,
                                        message: "maximum length is 15"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "minimum length is 2"
                                    },
                                })}
                            />
                        </Col>
                        <Col md="6 mb-3">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <input type="text"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                {...register('email', {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "address invalid"
                                    },
                                    maxLength: {
                                        value: 320,
                                        message: "maximum length is 320"
                                    },
                                })}
                            />
                        </Col>
                    </div>

                    <div className="form-row">
                        <Col md="4 mb-3">
                            <FormLabel htmlFor="profile_pic">Profile Pic</FormLabel>
                            <input
                                {...register('profile')}
                                type="file"
                                className="form-control"
                                id="profile"
                                name="profile"
                                placeholder="profile_pic"
                                onChange={onFileChange}
                            />
                            <div className="form-group">
                                <img
                                    src={process.env.REACT_APP_IMAGE_URL+icon}
                                    alt='' width="100" height="100"
                                    className="imgBox"
                                />
                            </div>
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
