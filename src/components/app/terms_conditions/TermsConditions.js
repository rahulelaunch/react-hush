import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, FormLabel, Row, Modal, Table as TableModal } from 'react-bootstrap';
import { modal } from "bootstrap"
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import Http from '../../security/Http';
import url from '../../../Development.json';
import ButtonSubmitReset from '../../layout/ButtonSubmitReset';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  errorResponse,
  successResponse,
  isError,

} from "../../helpers/response";




const AdvanceTableExamples = () => {

  const [dataTableData, setDataTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [id, setId] = useState('');
  const [btnloader, setBtnLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const menubar = true;
  const plugins =
    "link image code table textcolor colorpicker fullscreen hr lists";
  const toolbar =
    "fontselect fontsizeselect formatselect | " +
    "bold italic underline strikethrough subscript superscript | " +
    "blockquote removeformat | forecolor backcolor | " +
    "alignleft aligncenter alignright alignjustify | " +
    "indent outdent | numlist bullist | " +
    "link unlink | hr table image | fullscreen code | undo redo";
  const handleEditorChange = (value) => {
    setValue('content', value);
  };
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    reset(
      { keepDirtyValues: true },
      { keepIsValid: true }
    );
    setShow(false)
  };

  const getData = () => {

    Http.callApi(url.get_terms)
      .then((response) => {
        // setLoading(false);
        setDataTableData(response.data);
        setTotalRows(response.data.length);
      })
      .catch((error) => {
        if (error.response) {
          errorResponse(error);
        }
      });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    isError(errors);
  });

  const handleShow = (data) => {
    setShow(true)
    setValue("title", '');
    setValue("name_id", '');
    setValue("content", '');
    setDescription('')
    setId('');
    if (data) {
      setValue("title", data.title);
      setValue("name_id", data._id);
      setValue("", data.content);
      setDescription(data.content)
      setId("name_id", data._id);
    }
  };


  const onSubmit = (data) => {
    setBtnLoader(true);

    if (data.name_id) {

      data["id"] = data.name_id;

      Http.callApi(url.terms_store, data)
        .then((response) => {
          setBtnLoader(false);
          successResponse(response);
          getData();
          setShow(false)
        })
        .catch((error) => {
          setBtnLoader(false);
          if (error.response) {
            errorResponse(error);
          }
        });

    } else {
      Http.callApi(url.terms_store, data)
        .then((response) => {
          setBtnLoader(false);
          successResponse(response);
          getData();
          setShow(false)
        })
        .catch((error) => {
          setBtnLoader(false);
          if (error) {
            errorResponse(error);
          }
        });
    }
  };
  const columns = [
    {
      accessor: 'no',
      Header: 'NO',

      Cell: rowData => {
        return (parseInt(rowData.row.id) + 1)
      }
    },
    {
      accessor: 'title',
      Header: 'Title'
    },
    {
      accessor: '_id',
      Header: 'Action',

      Cell: rowData => {
        const data = rowData.row.original
        return (
          <>
            <td className="text-end">
              <button className="btn btn-sm btn-primary ml-2 btn-xs" onClick={(e) => handleShow(data)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </td>
          </>
        );
      },
    },

  ];

  return (
    <>
      <AdvanceTableWrapper
        columns={columns}
        data={dataTableData}
        pagination
        perPage={10}
      >
        <div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
          <h5 className="hover-actions-trigger mb-0">
            Terms List
          </h5>
        </div>
        <Card className='mb-3'>

          <Card.Header className="border-bottom border-200">

            <Row className="flex-between-center mb-3">
              <Col xs={8} sm="auto" className="ms-3 mt-2 text-end ps-0">
                <div id="orders-actions">
                  <button className="btn btn-sm btn-success" onClick={(e) => handleShow()}>
                    <FontAwesomeIcon icon={faPlus} /> Add Term
                  </button>
                </div>

              </Col>
              <Col xs="auto" sm={2} lg={3}>
                <AdvanceTableSearchBox table />
              </Col>
            </Row>

          </Card.Header>
          <Row className="flex-end-center mb-3">

            <AdvanceTable
              table
              headerClassName="bg-200 text-900 text-nowrap align-middle"
              rowClassName="align-middle white-space-nowrap"
              tableProps={{
                bordered: true,
                striped: true,
                className: 'fs--1 mb-0 overflow-hidden'
              }}
            />
          </Row>
        </Card>

        <div className="mt-3">
          <AdvanceTableFooter
            rowCount={totalRows}
            table
            rowInfo
            navButtons
            rowsPerPageSelection
          />
        </div>
      </AdvanceTableWrapper>
      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header>
          {id ? <div className="form-group">
            <Modal.Title>Terms Conditions Update</Modal.Title>
          </div> : <Modal.Title>Terms Conditions Add</Modal.Title>}

          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <Modal.Body>
            <div className="form-row">
              <Col md="12 mb-3">
                <FormLabel htmlFor="plan_title">Title</FormLabel>
                <input type="hidden"
                  className="form-control"
                  id="name_id"
                  name='name_id'
                  {...register('name_id')}
                />
                <input type="text"
                  className="form-control"
                  id="title"
                  name='title'
                  placeholder="Enter Title"
                  {...register('title', {
                    required: "Title  is required",
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
              <Col md="12 mb-3">
                <FormLabel htmlFor="plan_descreption">Content</FormLabel>
                <Editor
                  apiKey={process.env.REACT_APP_TINYMAC_KEY}
                  initialValue={description}
                  init={{ plugins, toolbar, menubar }}
                  onEditorChange={handleEditorChange}
                   />
                <div className="form-group">

                  <input type="hidden" style={{ display: (!description) ? { ...register('content', { required: true }) } : "block" }} name="content" id="content" />
                </div>
              </Col>
            </div>

            <ButtonSubmitReset btnloader={btnloader} onsubmitFun={() => {
              reset();
            }} />
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}
export default AdvanceTableExamples;

