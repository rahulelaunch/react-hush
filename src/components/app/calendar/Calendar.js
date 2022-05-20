import React, { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
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
import {
  errorResponse,
  successResponse,
  isError,
  configHeaderAxios

} from "../../helpers/response";


const data = `const columns = [
  {
    accessor: 'name',
    Header: 'Name'
  },
  {
    accessor: 'email',
    Header: 'Email'
  },
  {
    accessor: 'age',
    Header: 'Age'
  }
];

const data = [
  {
    name: 'Anna',
    email: 'anna@example.com',
    age: 18
  },
  {
    name: 'Homer',
    email: 'homer@example.com',
    age: 35
  },
  {
    name: 'Oscar',
    email: 'oscar@example.com',
    age: 52
  },
  {
    name: 'Emily',
    email: 'emily@example.com',
    age: 30
  },
  {
    name: 'Jara',
    email: 'jara@example.com',
    age: 25
  },
  {
    name: 'Clark',
    email: 'clark@example.com',
    age: 39
  },
  {
    name: 'Jennifer',
    email: 'jennifer@example.com',
    age: 52
  },
  {
    name: 'Tony',
    email: 'tony@example.com',
    age: 30
  },
  {
    name: 'Tom',
    email: 'tom@example.com',
    age: 25
  },
  {
    name: 'Michael',
    email: 'michael@example.com',
    age: 39
  },
  {
    name: 'Antony',
    email: 'antony@example.com',
    age: 39
  },
  {
    name: 'Raymond',
    email: 'raymond@example.com',
    age: 52
  },
  {
    name: 'Marie',
    email: 'marie@example.com',
    age: 30
  },
  {
    name: 'Cohen',
    email: 'cohen@example.com',
    age: 25
  },
  {
    name: 'Rowen',
    email: 'rowen@example.com',
    age: 39
  }
];`;

// const exampleCode = `${data}

// function AdvanceTableExample() {

//   return(
//     <AdvanceTableWrapper
//       columns={columns}
//       data={data}
//       sortable
//       pagination
//       perPage={5}
//     >
//       <AdvanceTable
//         table
//         headerClassName="bg-200 text-900 text-nowrap align-middle"
//         rowClassName="align-middle white-space-nowrap"
//         tableProps={{
//           bordered: true,
//           striped: true,
//           className: 'fs--1 mb-0 overflow-hidden'
//         }}
//       />
//       <div className="mt-3">
//         <AdvanceTableFooter
//           rowCount={data.length}
//           table
//           rowInfo
//           navButtons
//           rowsPerPageSelection
//         />
//       </div>
//     </AdvanceTableWrapper>
//   )
// }

// render(<AdvanceTableExample />)
// `;

// const paginationNumberingCode = `${data}

// function AdvanceTableExample() {

//   return(
//     <AdvanceTableWrapper
//       columns={columns}
//       data={data}
//       sortable
//       pagination
//       perPage={5}
//     >
//       <AdvanceTable
//         table
//         headerClassName="bg-200 text-900 text-nowrap align-middle"
//         rowClassName="align-middle white-space-nowrap"
//         tableProps={{
//           bordered: true,
//           striped: true,
//           className: 'fs--1 mb-0 overflow-hidden'
//         }}
//       />
//       <div className="mt-3">
//         <AdvanceTablePagination
//           table
//         />
//       </div>
//     </AdvanceTableWrapper>
//   )
// }

// render(<AdvanceTableExample />)
// `;

// const selectionCode = `const columns = [
//   {
//     accessor: 'name',
//     Header: 'Name'
//   },
//   {
//     accessor: 'email',
//     Header: 'Email',
//     Cell: rowData => {
//       const { email } = rowData.row.original
//       return(
//         <a href={'mailto:' + email}>
//           {email}
//         </a>
//       )
//     }
//   },
//   {
//     accessor: 'age',
//     Header: 'Age',
//     cellProps:{
//       className:'fw-medium'
//     }
//   }
// ];

// const data = [
//   {
//     name: 'Anna',
//     email: 'anna@example.com',
//     age: 18
//   },
//   {
//     name: 'Homer',
//     email: 'homer@example.com',
//     age: 35
//   },
//   {
//     name: 'Oscar',
//     email: 'oscar@example.com',
//     age: 52
//   },
//   {
//     name: 'Emily',
//     email: 'emily@example.com',
//     age: 30
//   },
//   {
//     name: 'Jara',
//     email: 'jara@example.com',
//     age: 25
//   }
// ];

// function BulAction({ selectedRowIds }){
//   return (
//     <Row className="flex-between-center mb-3">
//       <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
//         <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
//           {
//             Object.keys(selectedRowIds).length > 0 ?
//             'You have selected ' + Object.keys(selectedRowIds).length + ' rows' 
//             :
//             'Selection Example'
//           }
//         </h5>
//       </Col>
//       <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
//         {Object.keys(selectedRowIds).length > 0 ? (
//           <div className="d-flex">
//             <Form.Select size="sm" aria-label="Bulk actions">
//               <option>Bulk Actions</option>
//               <option value="refund">Refund</option>
//               <option value="delete">Delete</option>
//               <option value="archive">Archive</option>
//             </Form.Select>
//             <Button
//               type="button"
//               variant="falcon-default"
//               size="sm"
//               className="ms-2"
//             >
//               Apply
//             </Button>
//           </div>
//           ) : (
//             <div id="orders-actions">
//               <IconButton
//                 variant="falcon-default"
//                 size="sm"
//                 icon="plus"
//                 transform="shrink-3"
//                 className='me-2'
//               >
//                 <span className="d-none d-sm-inline-block ms-1">New</span>
//               </IconButton>
//               <IconButton
//                 variant="falcon-default"
//                 size="sm"
//                 icon="external-link-alt"
//                 transform="shrink-3"
//               >
//                 <span className="d-none d-sm-inline-block ms-1">Export</span>
//               </IconButton>
//             </div>
//           )}
//       </Col>
//     </Row>
//   );
// };

// function AdvanceTableExample() {

//   return(
//     <AdvanceTableWrapper
//       columns={columns}
//       data={data}
//       sortable
//       pagination
//       perPage={5}
//       selection
//       selectionColumnWidth={30}
//     >
//       <BulAction table/>
//       <AdvanceTable
//         table
//         headerClassName="bg-200 text-900 text-nowrap align-middle"
//         rowClassName="align-middle white-space-nowrap"
//         tableProps={{
//           striped: true,
//           className: 'fs--1 mb-0 overflow-hidden'
//         }}
//       />
//     </AdvanceTableWrapper>
//   )
// }

// render(<AdvanceTableExample />)
// `;

// const customCellCode = `const columns = [
//   {
//     accessor: 'name',
//     Header: 'Name'
//   },
//   {
//     accessor: 'email',
//     Header: 'Email',
//     Cell: rowData => {
//       const { email } = rowData.row.original
//       return(
//         <a href={'mailto:' + email}>
//           {email}
//         </a>
//       )
//     }
//   },
//   {
//     accessor: 'age',
//     Header: 'Age',
//     cellProps:{
//       className:'fw-medium'
//     }
//   }
// ];

// const data = [
//   {
//     name: 'Anna',
//     email: 'anna@example.com',
//     age: 18
//   },
//   {
//     name: 'Homer',
//     email: 'homer@example.com',
//     age: 35
//   },
//   {
//     name: 'Oscar',
//     email: 'oscar@example.com',
//     age: 52
//   },
//   {
//     name: 'Emily',
//     email: 'emily@example.com',
//     age: 30
//   },
//   {
//     name: 'Jara',
//     email: 'jara@example.com',
//     age: 25
//   }
// ];

// function AdvanceTableExample() {

//   return(
//     <AdvanceTableWrapper
//       columns={columns}
//       data={data}
//       sortable
//     >
//       <AdvanceTable
//         table
//         headerClassName="bg-200 text-900 text-nowrap align-middle"
//         rowClassName="align-middle white-space-nowrap"
//         tableProps={{
//           bordered: true,
//           striped: true,
//           className: 'fs--1 mb-0 overflow-hidden'
//         }}
//       />
//     </AdvanceTableWrapper>
//   )
// }

// render(<AdvanceTableExample />)
// `;

const searchableTableCode = `${data}

function AdvanceTableExample() {

  return (
    <AdvanceTableWrapper
      columns={columns}
      data={data}
      sortable
      pagination
      perPage={5}
    >
      <Row className="flex-end-center mb-3">
        <Col xs="auto" sm={6} lg={4}>
          <AdvanceTableSearchBox table/>
        </Col>
      </Row>
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
      <div className="mt-3">
        <AdvanceTableFooter
          rowCount={data.length}
          table
          rowInfo
          navButtons
          rowsPerPageSelection
        />
      </div>
    </AdvanceTableWrapper>
  );
}

render(<AdvanceTableExample />)`;

const AdvanceTableExamples = () => {


  const config = configHeaderAxios();
  const [dataTableData, setDataTableData] = useState([]);
  
  const getData = () => {
 
  console.log( Http.callApi(url.get_users,[],[]));
    Http.callApi(url.get_users,[],[])
        .then((response) => {
          console.log(response);
         
            setDataTableData(response.data);
           
        })
        .catch((error) => {
            if (error.response) {
             
            }
        });
  }
  
  useEffect(() => {
    getData();
   
  }, []);

  return (
  <>
   
    <FalconComponentCard>
      <FalconComponentCard.Header
        title="Users"
        light={false}
        className="border-bottom border-200"
      />
      <FalconComponentCard.Body
        code={searchableTableCode}
        // scope={dataTableData}
        scope={{
          AdvanceTableWrapper,
          AdvanceTable,
          AdvanceTableFooter,
          AdvanceTableSearchBox
        }}
        language="jsx"
        noInline
        noLight
      />
    </FalconComponentCard>


  </>
);
      }
export default AdvanceTableExamples;
