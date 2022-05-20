import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff } from 'react-feather';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Http from '../security/Http';
// import { errorResponse } from 'components/helpers/response';
import url from '../../Development.json';
import {
  errorResponse,
  successResponse,
  isError,

} from "../helpers/response";


const LoginForm = ({ hasLabel, layout }) => {

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [password, setPassword] = useState("")

  const handleChange = (e) => {
    setPassword(e.target.value)
  }


  const onSubmit = (data) => {
    console.log(data);
    // setBtnLoader(true);
    // if (state && state.id) {
    //     data["id"] = state.id;
    // }

    Http.callApi(url.login, JSON.stringify(data))
      .then((response) => {
        let data = response.data;

        localStorage.setItem(
          "access_token",
          data.data.token

        );


        // setBtnLoader(false);
        // successResponse(response);
        navigate('/');
      })
      .catch((error) => {

        // setBtnLoader(false);
        if (error.response) {
          // errorResponse(error);
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          // value={formData.email}
          name="email"
          // onChange={handleFieldChange}
          type="email"
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "address invalid "
            },
            maxLength: {
              value: 320,
              message: "maximum length is 320"
            },
          })}
        />



      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          // value={formData.password}
          name="password"
          // onChange={handleFieldChange}
          defaultValue={password}
          onChange={(e) => handleChange(e)}
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: "minimum length is 6"
            },
          })}
        />
      </Form.Group>


      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
        // disabled={!formData.email || !formData.password}
        >
          Log in
        </Button>
      </Form.Group>

    </Form>
  );
};


export default LoginForm;