import React, { useState, useEffect } from 'react';
import { Card, Col, Form, FormLabel, Row, Modal, Table as TableModal, Button } from 'react-bootstrap';
import { modal } from "bootstrap"
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
// import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import Http from '../../security/Http';
import url from '../../../Development.json';
import Swal from 'sweetalert2';
import { faEye, faPencilAlt, faPlus, faToggleOff, faToggleOn, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { useForm } from "react-hook-form";
import ButtonSubmitReset from '../../layout/ButtonSubmitReset';
import {
  errorResponse,
  successResponse,
  isError,
} from "../../helpers/response";
import { Link } from 'react-router-dom';
import SoftBadge from 'components/common/SoftBadge';


const AdvanceTableExamples = () => {

  const [dataTableData, setDataTableData] = useState([]);
  const [modalText, setModalText] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);
  const [btnloader, setBtnLoader] = useState(false);
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
    setValue('plan_descreption', value);
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

    Http.callApi(url.get_mobilePlan)
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
    setValue("plan_title", '');
    setValue("plan_price", '');
    setValue("days", '');
    setValue("name_id", '');
    setValue("plan_descreption", '');
    setDescription('')
    setId('');

    if (data) {
      setValue("plan_title", data.plan_title);
      setValue("plan_price", data.plan_price);
      setValue("days", data.days);
      setValue("name_id", data._id);
      setId("name_id", data._id);
      setValue("plan_descreption", data.plan_descreption);
      setDescription(data.plan_descreption)

    }
  };


  const changeStatusButtonClick = (id) => {
    const obj = {
      id: id,
    };

    Http.callApi(url.mobilePlan_change_status, obj)
      .then((response) => {
        getData();
        successResponse(response);
      })
      .catch((error) => {
        if (error.response) {
          errorResponse(error);
        }
      });
  };


  const showModal = (data) => {
    const regex = /(<([^>]+)>)/ig;
    const result = data.plan_descreption.replace(regex, '');
    const month = 'Month';
    const year = 'Year';

    let TableModaldata = (
      <>
        <Card className="mb-6">
          <Card.Body>
            <Row className="g-0">
              <Col>
                <div className="h100">
                  <div className="text-center p-4">
                    <SoftBadge bg="primary">
                      <h3 className="fw-normal my-0" >{data.plan_title.charAt(0).toUpperCase() + data.plan_title.slice(1)}</h3>
                    </SoftBadge>
                    <p className="mt-3">For teams that need to create project plans with confidence.</p>
                    <h2 className="fw-medium my-4">
                      <sup className="fw-normal fs-2 me-1">$</sup>
                      {data.plan_price}
                      <small className="fs--1 text-700">/( {data.days == 30 ? month : year}) </small>
                    </h2>
                    <Button variant='primary'>
                      Get Plan
                    </Button>
                  </div>
                  <hr className="border-bottom-0 m-0" />
                  <div className="text-start px-sm-4 py-4">

                    <h5 className="fw-medium fs-0">Everything in Premium</h5>

                    <div className="list-unstyled mt-3" style={{ whiteSpace: 'pre-wrap' }}>
                      {result}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    )
    setModalText(TableModaldata);
  };


  const onSubmit = (data) => {
    setBtnLoader(true);

    if (data.name_id) {

      data["id"] = data.name_id;

      Http.callApi(url.mobilePlan_update, data)
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

      Http.callApi(url.mobilePlan_store, data)
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
  const deleteButtonClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id: id,
        }

        Http.callApi(url.mobilePlan_delete, data)
          .then((response) => {
            getData();
            successResponse(response);
          })
          .catch((error) => {
            if (error.response) {
              errorResponse(error);
            }
          });
      }
    })
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
      accessor: 'plan_title',
      Header: 'Name',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          data.plan_title.charAt(0).toUpperCase() + data.plan_title.slice(1)
        );
      }
    },
    {
      accessor: 'plan_price',
      Header: 'Price',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          `$ ` + data.plan_price
        );
      }
    },
    {
      accessor: 'days',
      Header: 'Days',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          data.days + ` days`
        );
      }
    },
    {
      accessor: 'status',
      Header: 'Status',
      headerProps: { className: 'text-center' },

      Cell: rowData => {
        const data = rowData.row.original
        return (
          <span className={`btn-sm   ${data.status === 1 ? "d-block badge badge-soft-success rounded-pill" : "d-block badge badge-soft-danger rounded-pill"}`}>
            {
              data.status === 1 ? "Active" : "Inactive"
            }
          </span>
        );
      },

    },

    {
      accessor: '_id',
      Header: 'Action',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-end' },
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <>
            <button className={`btn btn-sm me-2 ${data.status === 1 ? "btn-warning" : "btn-danger"} `} onClick={(id) => { changeStatusButtonClick(data._id) }} >
              {
                data.status === 1 ? <FontAwesomeIcon icon={faToggleOff} title="Change Status" /> : <FontAwesomeIcon icon={faToggleOn} title="Change Status" />
              }
            </button>

            <button className="btn btn-sm btn-info me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => showModal(data)}>
              <FontAwesomeIcon icon={faEye} title="View" />
            </button>

            <button className="btn btn-sm btn-primary  me-2 btn-xs" onClick={(e) => handleShow(data)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>

            <button className="btn btn-sm btn-danger me-2" >
              <FontAwesomeIcon icon={faTrashAlt} onClick={(id) => { deleteButtonClick(data._id) }} />
            </button>
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
            Mobile Plans List
          </h5>
        </div>
        <Card className='mb-3'>

          <Card.Header className="border-bottom border-200">

            <Row className="flex-between-center mb-3">
              <Col xs={8} sm="auto" className="ms-3 mt-2 text-end ps-0">
                <div id="orders-actions">
                  <button className="btn btn-sm btn-falcon-default" onClick={(e) => handleShow()}>
                    <FontAwesomeIcon icon={faPlus} /> New
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
                striped: true,
                className: 'fs--1 mb-0 overflow-hidden'
              }}
            />
          </Row>
          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Mobile Plan Details</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {modalText}
                </div>

              </div>
            </div>
          </div>
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
            <Modal.Title>Mobile Plan Update</Modal.Title>
          </div> : <Modal.Title>Mobile Plan Add</Modal.Title>}
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <Modal.Body>
            <div className="form-row">
              <Col md="12 mb-3">
                <FormLabel htmlFor="name">Title</FormLabel>
                <input type="hidden"
                  className="form-control"
                  id="name_id"
                  name='name_id'
                  {...register('name_id')}
                />
                <input type="text"
                  className="form-control"
                  id="plan_title"
                  name="plan_title"
                  placeholder="Enter plan title  Name"
                  {...register('plan_title', {
                    required: "Plan title is required",
                  })}
                />

              </Col>
            </div>
            <div className="form-row">
              <Col md="12 mb-3">
                <FormLabel htmlFor="name">Price</FormLabel>
                <input type="text"
                  className="form-control"
                  id="plan_price"
                  name="plan_price"
                  placeholder="Enter plan price  Name"
                  {...register('plan_price', {
                    required: "Plan price is required",
                  })}
                />

              </Col>
            </div>
            <div className="form-row">
              <Col md="12 mb-3">
                <FormLabel htmlFor="name">Days</FormLabel>
                <input type="text"
                  className="form-control"
                  id="days"
                  name="days"
                  placeholder="Enter plan days"
                  {...register('days', {
                    required: "Plan days is required",
                  })}
                />
              </Col>
            </div>
            <div className="form-row">
              <Col md="12 mb-3">
                <FormLabel htmlFor="plan_descreption">plan Descreption</FormLabel>
                <Editor
                  apiKey={process.env.REACT_APP_TINYMAC_KEY}
                  initialValue={description}
                  init={{ plugins, toolbar, menubar }}
                  onEditorChange={handleEditorChange}
                />
                <div className="form-group">
                  <input type="hidden" style={{ display: (!description) ? { ...register('plan_descreption', { required: true }) } : "block" }} name="plan_descreption" id="plan_descreption" />
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

