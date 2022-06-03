import React, { useState, useEffect } from 'react';
import { Card, Form, FormLabel, Col, Row, Modal, Table as TableModal } from 'react-bootstrap';
import { modal } from "bootstrap"
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
// import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import Http from '../../security/Http';
import url from '../../../Development.json';
import dummy from '../../../assets/img/team/User.jpg';
import Swal from 'sweetalert2';
import {
  errorResponse,
  successResponse,
  isError,
} from "../../helpers/response";

import { faEye, faPencilAlt, faPlus, faToggleOff, faToggleOn, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import FalconCloseButton from 'components/common/FalconCloseButton';
import ButtonSubmitReset from '../../layout/ButtonSubmitReset';



const AdvanceTableExamples = () => {

  const [dataTableData, setDataTableData] = useState([]);
  const [modalText, setModalText] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [show, setShow] = useState(false);
  const [btnloader, setBtnLoader] = useState(false);
  const [icon, setIcon] = useState('');
  const [iconAlt, setIconAlt] = useState('');
  const [fileName, setFileName] = useState('');
  const [id, setId] = useState('');

  const handleClose = () => {
    reset(
      { keepDirtyValues: true },
      { keepIsValid: true }
    );
    setShow(false)
  };

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getData = () => {

    Http.callApi(url.get_fashion)
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
  const handleShow = (data) => {
    setShow(true)
    setValue("name", '');
    setValue("name_id", '');
    setId('');
    setIcon('')
    if (data) {
      setValue("name", data.name);
      setValue("name_id", data._id);
      setId("name_id", data._id);
      setIcon(data.fashion_image);
    }
  };
  useEffect(() => {
    getData();
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
        setIcon(response.data.images);
        setFileName(response.data.images);
      })
      .catch(error => {
        if (error.response) {
          errorResponse(error);
        }
      });
  };

  const changeStatusButtonClick = (id) => {
    const obj = {
      id: id,
    };

    Http.callApi(url.fashion_change_status, obj)
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

  const onSubmit = (data) => {
    setBtnLoader(true);

    if (data.name_id) {

      if (fileName) {
        data["fashion_image"] = fileName;
      } else {
        data["fashion_image"] = icon;
      }

      data["id"] = data.name_id;

      Http.callApi(url.fashion_update, data)
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
      data["fashion_image"] = fileName;
      Http.callApi(url.fashion_store, data)
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


  const showModal = (data) => {

    let TableModaldata = (
      <>
        <TableModal striped bordered hover className="cr-table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>Image</th>
              <td>
                <img src={(data.fashion_image) ? process.env.REACT_APP_IMAGE_URL+data.fashion_image : dummy} alt={data.name} className="profile_pic_img" style={{ "height": "70px", "width": "70px" }} />
              </td>
            </tr>
          </tbody>
        </TableModal>
      </>
    )
    setModalText(TableModaldata);
  };

  const openImageInNewTab = (path) => {
    window.open(path);
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

        Http.callApi(url.fashion_delete, data)
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
      accessor: 'name',
      Header: 'Name'
    },

    {
      accessor: 'fashion_image',
      Header: 'Image',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <img src={(data.fashion_image) ? process.env.REACT_APP_IMAGE_URL+data.fashion_image : dummy} onClick={(id) => { openImageInNewTab(data.fashion_image) }} className="profile_pic_img" style={{ "height": "100px", "width": "100px", "borderRadius": "50" }} />
        )
      }

    },

    {
      accessor: 'status',
      Header: 'Status',

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

            <button className="btn btn-sm btn-primary me-2 btn-xs" onClick={(e) => handleShow(data)}>
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
            Fashion Type List
          </h5>
        </div>
        <Card className='mb-3'>

          <Card.Header className="border-bottom border-200">

            <Row className="flex-between-center mb-3">
              <Col xs={8} sm="auto" className="ms-3 mt-2 text-end ps-0">
                <div id="orders-actions">
                  <button className="btn btn-sm btn-success" onClick={(e) => handleShow()}>
                    <FontAwesomeIcon icon={faPlus} />Add Fashion
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
          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Fashion Details</h5>
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
            <Modal.Title>Fashion  Update</Modal.Title>
          </div> : <Modal.Title>Fashion  Add</Modal.Title>}
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <Modal.Body>
            <div className="form-row">
              <Col md="12 mb-3">
                <FormLabel htmlFor="name">Fahison Name</FormLabel>
                <input type="hidden"
                  className="form-control"
                  id="name_id"
                  name='name_id'
                  {...register('name_id')}
                />
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
              <Col md="12 mb-3">
                <div className="form-group">
                  <FormLabel htmlFor="fashion_image">Image Upload</FormLabel>
                  <input
                    {...register('fashion_image', (id == null) ? { required: "image is required" } : '')}
                    type="file"
                    className="form-control"
                    id="fashion_image"
                    name="fashion_image"
                    placeholder="Select body image"
                    onChange={onFileChange}
                    accept="image/png,image/jpeg"
                  />
                </div>
                {icon ? <div className="form-group">
                  <img
                     src={process.env.REACT_APP_IMAGE_URL+icon}
                    alt={iconAlt} width="150px" height="150px"
                    className="imgBox"
                  />
                </div> : ''}

              </Col>

            </div>
            <ButtonSubmitReset btnloader={btnloader} onsubmitFun={() => {
              reset(setIconAlt(''), setIcon(dummy));
            }} />
          </Modal.Body>
        </Form>
      </Modal>
    </>

  );
}
export default AdvanceTableExamples;

