import React, { useState, useEffect } from 'react';
import { Card, Form, FormLabel, Col, Row, Modal, Table as TableModal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
// import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import Http from '../../security/Http';
import url from '../../../Development.json';
import Swal from 'sweetalert2';
import {
  errorResponse,
  successResponse,
  isError,
} from "../../helpers/response";
import { SketchPicker } from 'react-color'
import { useForm } from "react-hook-form";
import { faEye, faPencilAlt, faPlus, faToggleOff, faToggleOn, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import FalconCloseButton from 'components/common/FalconCloseButton';
import ButtonSubmitReset from '../../layout/ButtonSubmitReset';




const AdvanceTableExamples = () => {

  const [dataTableData, setDataTableData] = useState([]);
  const [modalText, setModalText] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [btnloader, setBtnLoader] = useState(false);
  const [color, setColor] = useState();

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getData = () => {

    Http.callApi(url.get_eye)
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

  if (color) {
    setValue("name", color);
  }


  const handleShow = (data) => {
    setShow(true)
    setValue("name", '');
    setValue("name_id", '');
    setId('');

    if (data) {
      console.log(data);
      setValue("name", data.name);
      setValue("name_id", data._id);
      setId("name_id", data._id);
      // setId(data.name_id);
    }
  };


  const changeStatusButtonClick = (id) => {
    const obj = {
      id: id,
    };

    Http.callApi(url.eye_change_status, obj)
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

    let TableModaldata = (
      <>
        <TableModal striped bordered hover className="cr-table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>
                <div className='d-flex align-items-center'>
                  <span style={{ height: 12, width: 12, marginRight: 2, boxShadow: '0px 1px 1px rgba(0,0,0,0.2)', backgroundColor: `${data.name}` }}></span>
                  <span>{data.name}</span>
                </div>
              </td>
            </tr>

          </tbody>
        </TableModal>
      </>
    )
    setModalText(TableModaldata);
  };

  const onSubmit = (data) => {
    setBtnLoader(true);

    if (data.name_id) {

      data["id"] = data.name_id;

      Http.callApi(url.eye_update, data)
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

      Http.callApi(url.eye_store, data)
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

        Http.callApi(url.eye_delete, data)
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
      Header: 'Name',
      Cell: rowData => {
        const { name } = rowData.row.original;
        return (
          <>
            <div className='d-flex align-items-center'>
              <span style={{ height: 12, width: 12, marginRight: 2, boxShadow: '0px 1px 1px rgba(0,0,0,0.2)', backgroundColor: `${name}` }}></span>
              <span>{name}</span>
            </div>
          </>
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
            Eye List
          </h5>
        </div>
        <Card className='mb-3'>

          <Card.Header className="border-bottom border-200">

            <Row className="flex-between-center mb-3">
              <Col xs={8} sm="auto" className="ms-3 mt-2 text-end ps-0">
                <div id="orders-actions">
                  <button className="btn btn-sm btn-success" onClick={(e) => handleShow()}>
                    <FontAwesomeIcon icon={faPlus} /> Add Eye
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
          {/* <Modal.Title>Eye Color Add</Modal.Title> */}
          {id ? <div className="form-group">
            <Modal.Title>Eye Color Update</Modal.Title>
          </div> : <Modal.Title>Eye Color Add</Modal.Title>}
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <Modal.Body>
            <Col md="12 mb-3">
              <SketchPicker
                color={color}
                onChangeComplete={(colors) => { setColor(colors.hex) }}
              />
              <FormLabel htmlFor="name">Eye Color</FormLabel>
              <input type="hidden"
                className="form-control"
                id="name_id"
                name='name_id'
                {...register('name_id')}
              />
              <input type="text"
                disabled
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter Hair Color Name"
                {...register('name', {
                  required: "Hair Color Name is required",
                })}
              />
            </Col>
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

