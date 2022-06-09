import React from 'react';
import { Table } from 'react-bootstrap';
import FalconComponentCard from 'components/common/FalconComponentCard';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';


const BestSellingProducts = ({ products }) => {

  return (

    <FalconComponentCard>
      <FalconComponentCard.Header title="Best Selling Plan" light={false} />

      <FalconComponentCard.Body>
        <Table borderless responsive className="mb-0 fs--1">
          <thead className="bg-light">
            <tr className="text-900">
              <th className="pe-card text-center"></th>
              <th className="text-end">Price </th>
              <th className="pe-card text-center" style={{ width: '7rem' }}>
                Days
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (

              <tr className="border-bottom border-200" >
                <td>
                  <Flex alignItems="center" className="position-relative">

                    <div className="ms-3">
                      <h6 className="mb-1 fw-semi-bold">
                        <Link className="text-dark stretched-link" to="/admin/plan/list">
                          {product.plan_title}
                        </Link>
                      </h6>

                    </div>
                  </Flex>
                </td>
                <td className="align-middle text-end fw-semi-bold">
                  ${product.plan_price}
                </td>
                <td className="align-middle pe-card">
                  <Flex alignItems="center">

                    <div className="fw-semi-bold ms-3">{product.days} days</div>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </FalconComponentCard.Body>
    </FalconComponentCard>

  );
};

export default BestSellingProducts;
