import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Modal, Table as TableModal } from 'react-bootstrap';
import { modal } from "bootstrap"
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
import { Link,useNavigate } from 'react-router-dom';



const AdvanceTableExamples = () => {

  const [dataTableData, setDataTableData] = useState([]);
  const [modalText, setModalText] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const navigate = useNavigate();


  const getData = () => {

    Http.callApi(url.get_country)
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


  const openImageInNewTab = (path) => {
    window.open(path);
  };

  const columns = [
    {
        accessor: 'id',
        Header: 'CountryCode'
    },
    {
      accessor: 'country_name',
      Header: 'Name'
    },

    {
      accessor: 'flag',
      Header: 'Image',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <img src={(data.flag) ? data.flag : dummy} onClick={(id) => { openImageInNewTab(data.flag) }} className="profile_pic_img" style={{ "height": "100px", "width": "100px", "borderRadius": "50" }} />
        )
      }

    },
  ];


  return (

    <AdvanceTableWrapper
      columns={columns}
      data={dataTableData}
      pagination
      perPage={10}
    >
      <div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
        <h5 className="hover-actions-trigger mb-0">
         Country List
        </h5>
      </div>
      <Card className='mb-3'>

        <Card.Header className="border-bottom border-200">

          <Row className="flex-between-center mb-3">
            <Col xs={8} sm="auto" className="ms-3 mt-2 text-end ps-0">
             

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
  );
}
export default AdvanceTableExamples;

