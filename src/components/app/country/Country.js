import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
// import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import Http from '../../security/Http';
import url from '../../../Development.json';
import dummy from '../../../assets/img/team/User.jpg';
import {
  errorResponse,
} from "../../helpers/response";


const AdvanceTableExamples = () => {

  const [dataTableData, setDataTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);


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

  const columns = [

    {
      accessor: 'country_name',
      Header: 'Name',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'py-2'
      },

      // Cell: rowData => {
      //   const { country_name } = rowData.row.original;
      //   const propsImage = rowData.row.original.flag;
      //   const [imageData,setImageData] = useState();
      //   useEffect(() => {
      //     if (propsImage) {
      //       urlFetch("http://192.168.0.172:7000/user/uploads/flag/" + propsImage)
      //     }
      //   }, [propsImage])

      //   const urlFetch = async (profileData) => {
      //     await fetch(profileData.toString(), {
      //       method: "GET",
      //       headers: new Headers({
      //         'authorization': `Bearer ` + localStorage.getItem('access_token'),
      //         'Content-Type': 'application/json',
      //         'env': 'test'
      //       })
      //     })
      //       .then(response => {
      //         const reader = response.body.getReader();
      //         return new ReadableStream({
      //           start(controller) {
      //             return pump();
      //             function pump() {
      //               return reader.read().then(({ done, value }) => {
      //                 if (done) {
      //                   controller.close();
      //                   return;
      //                 }
      //                 controller.enqueue(value);
      //                 const data = `data:${"image/jpeg"};base64,${new Buffer(value).toString('base64')}`;
      //                 setImageData(data)
      //                 return pump();
      //               });
      //             }
      //           }
      //         })
      //       })
      //   }

      //   return (
      //  <>
      //       <div className='d-flex align-items-center'>
      //         <img src={(imageData) ? imageData : dummy} className="rounded-circle " style={{ "height": "32px", "width": "32px"}} />
      //         <div className="flex-1 ms-2">
      //           <h5 className="mb-0 fs--1">{country_name}</h5>
      //         </div>
      //       </div>
      //     </>
      //   )
      // }

      Cell: rowData => {
        const { country_name, flag } = rowData.row.original;
        return (
          <>
            <div className='d-flex align-items-center'>
              <img src={(flag) ? "http://192.168.0.172:7005/uploads/flag/"+flag : dummy} className="rounded-circle" style={{ "height": "32px", "width": "32px"}} />
              <div className="flex-1 ms-2">
                <h5 className="mb-0 fs--1">{country_name}</h5>
              </div>
            </div>
          </>
        )
      }
    },

    {
      accessor: 'id',
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

