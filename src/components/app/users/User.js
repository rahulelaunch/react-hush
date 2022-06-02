import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Modal, Table as TableModal } from 'react-bootstrap';
import { modal } from "bootstrap"
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
import { faEye, faToggleOff, faToggleOn, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ImageGet from '../ImageGet';


const AdvanceTableExamples = () => {

  const [dataTableData, setDataTableData] = useState([]);
  const [modalText, setModalText] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const getData = () => {


    Http.callApi(url.get_users)
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


  const changeStatusButtonClick = (id) => {
    const obj = {
      id: id,
    };

    Http.callApi(url.users_change_status, obj)
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
    console.log('data');
    console.log(data);
    let TableModaldata = (
      <>
        <TableModal striped bordered hover>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{data.email}</td>
            </tr>
            <tr>
              <th>Birth Date</th>
              <td>{data.dob.slice(0, -14)}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{data.height}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{data.weight}</td>
            </tr>
            <tr>
              <th>Body Type</th>
              <td>{data.body_type ? data.body_type.name : ''}  <img src={(data.body_type) ? data.body_type.body_image : dummy} className="profile_pic_img" style={{ "height": "50px", "width": "50px" }} /></td>

            </tr>
            <tr>
              <th>Hair Color</th>
              <td>{data.hair_color ? data.hair_color.name : ''}</td>
            </tr>
            <tr>
              <th>Eye Color</th>
              <td>{data.eye_color ? data.eye_color.name : ''}</td>
            </tr>
            <tr>
              <th>Fashion Type</th>
              <td>{data.fashion_type ? data.fashion_type.name : ''} <img src={(data.fashion_type) ? data.fashion_type.fashion_image : dummy} className="profile_pic_img" style={{ "height": "50px", "width": "50px" }} /></td>
            </tr>
            <tr>
              <th>Education</th>
              <td>{data.education ? data.education.name : ''}</td>
            </tr>
            <tr>
              <th>Annual Income</th>
              <td>{data.annual_income ? data.annual_income.annual_income : ''}</td>
            </tr>

            <tr>
              <th>Country</th>
              <td>{data.country_id ? data.country_id.country_name : ''}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{data.state_id ? data.state_id.state_name : ''}</td>
            </tr>
            <tr>
              <th>Personal Desires</th>
              <td>
                <ul className='pl-3'>
                  {data.personal_desires.map((data1, index) => {
                    return (
                      <li style={{ listStyle: 'disc' }} key={index}>{data1.desire_name}</li>
                    )
                  })
                  }</ul>
              </td>
            </tr>
            <tr>
              <th>Plan</th>
              <td>{data.plan_name ? data.plan_name.plan_title : ''}</td>
            </tr>
            <tr>
              <th>Bio</th>
              <td>{data.bio ? data.bio : ''}</td>
            </tr>

            <tr>
              <th>Bio Image</th>
              <td>
                <ul className='d-flex flex-wrap'>
                  {data.bio_image.map((data1, index) => {
                    return (
                      <li className='mr-2' key={index}><img src={(data1) ? data1 : dummy} className="profile_pic_img" style={{ "height": "70px", "width": "70px" }} /></li>
                    )
                  })
                  }
                </ul>
              </td>
            </tr>

          </tbody>
        </TableModal>
      </>
    )
    setModalText(TableModaldata);
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
        // let obj = `?id=${id}`;
        let data = {
          id: id,
        }

        Http.callApi(url.user_delete, data)
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
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'py-2'
      },
      Cell: rowData => {

        const { name } = rowData.row.original;
        const propsImage = rowData.row.original.user_profile;
        // const [imgSrc, setImageSrc] = useState();
 
        // const ImageUrl = (datas) => {
        //     setImageSrc(datas);
        // }
        // useEffect(() => {
        //     ImageUrl();
        // }, [])
     
        const [imageData,setImageData] = useState();
        useEffect(() => {
          if (propsImage) {
            urlFetch("http://192.168.0.172:7000/user/uploads/" + propsImage)
          }
        }, [propsImage])
  
        const urlFetch = async (profileData) => {
          console.log(profileData);
          await fetch(profileData.toString(), {
            method: "GET",
            headers: new Headers({
              'authorization': `Bearer ` + localStorage.getItem('access_token'),
              'Content-Type': 'application/json',
              'env': 'test'
            })
          })
            .then(response => {
              const reader = response.body.getReader();
              return new ReadableStream({
                start(controller) {
                  return pump();
                  function pump() {
                    return reader.read().then(({ done, value }) => {
                      if (done) {
                        controller.close();
                        return;
                      }
                      controller.enqueue(value);
                      const data = `data:${"image/jpeg"};base64,${new Buffer(value).toString('base64')}`;
                      setImageData(data)
                      return pump();
                    });
                  }
                }
              })
            })
        }
        return (
          <>
           {/* <ImageGet im={image} ImageData={ImageUrl}/> */}
            <div className='d-flex align-items-center'>
              <img src={(imageData) ? imageData : dummy} className="rounded-circle " style={{ "height": "32px", "width": "32px", borderRadius: "50%", "borderRadius": "50" }} />
              <div className="flex-1 ms-2">
                <h5 className="mb-0 fs--1">{name}</h5>
              </div>
            </div>
          </>
        )
      }
    },

    {
      accessor: 'email',
      Header: 'Email'
    },

    {
      accessor: 'dob',
      Header: 'Birth Date',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <>
            {data.dob.slice(0, -14)}
          </>
        );
      },
    },

    {
      accessor: 'country_id',
      Header: 'Country',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <>
            {data.country_id ? data.country_id.country_name : ''}
          </>
        );
      },
    },

    {
      accessor: 'state_id',
      Header: 'State',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <>
            {data.state_id ? data.state_id.state_name : ''}
          </>
        );
      },
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

            <button className="btn btn-sm btn-danger me-2" >
              <FontAwesomeIcon icon={faTrashAlt} onClick={(id) => { deleteButtonClick(data._id) }} />
            </button>
          </>
        );
      },
    },

  ];


  return (

    <AdvanceTableWrapper
      columns={columns}
      data={dataTableData}
      sortable
      pagination
      perPage={5}
    >
      <div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
        <h5 className="hover-actions-trigger mb-0">
          Users List
        </h5>
      </div>
      <Card className='mb-3'>

        <Card.Header className="border-bottom border-200">

          <Row className="flex-end-center mb-2">

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
                <h5 className="modal-title" id="exampleModalLabel">User Details</h5>
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
  );
}
export default AdvanceTableExamples;
