import React, { useState, useEffect } from 'react';
import { Button, Card, Form, FormLabel, Col, Row, Modal, Table as TableModal } from 'react-bootstrap';
import { modal } from "bootstrap"
import { useForm } from "react-hook-form";
import PageHeader from 'components/common/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconComponentCard from 'components/common/FalconComponentCard';
import IconButton from 'components/common/IconButton';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import Http from '../../security/Http';
import url from '../../../Development.json';
import dummy from '../../../assets/img/team/User.jpg';
import Swal from 'sweetalert2';
import ButtonSubmitReset from '../../layout/ButtonSubmitReset';
import { SketchPicker } from 'react-color'
import {
  errorResponse,
  successResponse,
  isError,
  configHeaderAxios

} from "../../helpers/response";
import Flex from 'components/common/Flex';
import Typography from 'components/utilities/Typography';
import { faEye, faPencilAlt, faPlus, faToggleOff, faToggleOn, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ActionButton from 'components/common/ActionButton';
import { Link, useNavigate } from 'react-router-dom';
import FalconCloseButton from 'components/common/FalconCloseButton';




const AdvanceTableExamples = () => {

  const [dataTableData, setDataTableData] = useState([]);
  const [modalText, setModalText] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const navigate = useNavigate();
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

    Http.callApi(url.get_hair)
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


  if (color) {
    setValue("name", color);
  }


  const handleShow = (data) => {
    setShow(true)
    setValue("name", '');
    setValue("hair_id", '');
    setId('');

    if (data) {
      setValue("name", data.name);
      setValue("hair_id", data._id);
      setId("hair_id", data._id);
    }
  };


  const changeStatusButtonClick = (id) => {
    const obj = {
      id: id,
    };

    Http.callApi(url.hair_change_status, obj)
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
              <td>{data.name}</td>
            </tr>

          </tbody>
        </TableModal>
      </>
    )
    setModalText(TableModaldata);
  };

  const onSubmit = (data) => {
    setBtnLoader(true);

    if (data.hair_id) {

      data["id"] = data.hair_id;

      Http.callApi(url.hair_update, data)
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

      Http.callApi(url.hair_store, data)
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

        Http.callApi(url.hair_delete, data)
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
      accessor: 'name',
      Header: 'Name'
    },

    {
      accessor: 'status',
      Header: 'Status',

      Cell: rowData => {
        const data = rowData.row.original
        return (
          <span className={`btn-sm   ${data.status === 1 ? "btn-success" : "btn-danger"}`}>
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

      Cell: rowData => {
        const data = rowData.row.original
        return (
          <>
            <td className="text-end">

              <button className={`btn btn-sm ${data.status === 1 ? "btn-warning" : "btn-danger"} `} onClick={(id) => { changeStatusButtonClick(data._id) }} >
                {
                  data.status === 1 ? <FontAwesomeIcon icon={faToggleOff} title="Change Status" /> : <FontAwesomeIcon icon={faToggleOn} title="Change Status" />
                }
              </button>

              <button className="btn btn-sm btn-info ml-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => showModal(data)}>
                <FontAwesomeIcon icon={faEye} title="View" />
              </button>

              <button className="btn btn-sm btn-primary ml-2 btn-xs" onClick={(e) => handleShow(data)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>

              <button className="btn btn-sm btn-danger ml-2" >
                <FontAwesomeIcon icon={faTrashAlt} onClick={(id) => { deleteButtonClick(data._id) }} />
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
            Hair List
          </h5>
        </div>
        <Card className='mb-3'>

          <Card.Header className="border-bottom border-200">

            <Row className="flex-between-center mb-3">
              <Col xs={8} sm="auto" className="ms-3 mt-2 text-end ps-0">
                <div id="orders-actions">
                  <button className="btn btn-sm btn-success" onClick={(e) => handleShow()}>
                    <FontAwesomeIcon icon={faPlus} />
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
                  <h5 className="modal-title" id="exampleModalLabel">Hair Color Details</h5>
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
          {/* <Modal.Title>Hair Color Add</Modal.Title>
           */}
            {id ? <div className="form-group">
            <Modal.Title>Hair Color Update</Modal.Title>
        </div> :  <Modal.Title>Hair Color Add</Modal.Title>}
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <Modal.Body>
              <Col md="12 mb-3">
                <SketchPicker
                  color={color}
                  onChangeComplete={(colors) => { setColor(colors.hex) }}
                />
                <FormLabel htmlFor="name">Hair Color</FormLabel>
                <input type="hidden"
                  className="form-control"
                  id="hair_id"
                  name='hair_id'
                  {...register('hair_id')}
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

