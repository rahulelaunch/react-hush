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

    Http.callApi(url.get_location)
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
      accessor: 'no',
      Header: 'NO',

      Cell: rowData => {
        return (parseInt(rowData.row.id) + 1)
      }
    },
    {
      accessor: 'state_name',
      Header: 'Name'
    },
    {
        accessor: 'id',
        Header: 'StateCode'
    },
    {
        accessor: 'country_code',
        Header: 'CountryCode'
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
         State List
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

