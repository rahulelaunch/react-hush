import React, { useEffect } from 'react';

import {
  errorResponse,
  successResponse,
  isError,

} from "../helpers/response";
import { useNavigate } from "react-router-dom";
import Http from '../security/Http';
import url from '../../Development.json';


const LogoutContent = () => {

  const navigate = useNavigate();

  useEffect(() => {
    console.log(121212);
    const isLogin = localStorage.getItem("access_token") || false;
    console.log(isLogin);

      if (isLogin) {
          const obj = {
              access_token: localStorage.getItem('access_token')
          };
          console.log( Http.callApi(url.logout, JSON.stringify(obj)));
          Http.callApi(url.logout, JSON.stringify(obj))
              .then((response) => {

              })
              .catch((error) => {
                  if (error.response) {
                      errorResponse(error);
                  }
              });
      }

  }, []);
  return (
    <>
   
    </>
  );
};


export default LogoutContent;
