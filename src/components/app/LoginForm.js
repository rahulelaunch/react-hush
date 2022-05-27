import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Http from '../security/Http';
import url from '../../Development.json';
import ButtonSubmitReset from '../layout/ButtonSubmitReset';

import {
  errorResponse,
  successResponse,
  isError,

} from "../helpers/response";


const LoginForm = () => {

  const navigate = useNavigate();
  const [btnloader, setBtnLoader] = useState(false);

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

  useEffect(() => {
    isError(errors);
  });


  const onSubmit = (data) => {

    Http.callApi(url.login, JSON.stringify(data))
      .then((response) => {
        let data = response.data;
        localStorage.setItem(
          "access_token",
          data.data.token

        );
        setBtnLoader(false);
        navigate('/admin/dashboard');
        successResponse(response);

      })
      .catch((error) => {
        setBtnLoader(false);
        if (error.response) {
          errorResponse(error);
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder='Email address'
          name="email"
          id="email"
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
        <Form.Control
          placeholder='Password'
          name="password"
          id="password"
          type='password'
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

      <ButtonSubmitReset btnloader={btnloader} onsubmitFun={() => {
        reset();
      }} />

    </Form>
  );
};


export default LoginForm;