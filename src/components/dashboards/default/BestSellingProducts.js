import React from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Table,
  Form,
  ProgressBar
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import classNames from 'classnames';

// const getTotalPrice = items =>
//   items
//     .map(({ unit, price }) => unit * price)
//     .reduce((total, currentValue) => total + currentValue, 0);

// const getProductItemCalculatedData = (unit, price, totalPrice) => {
//   const productTotalPrice = unit * price;
//   const percentage = ((productTotalPrice * 100) / totalPrice).toFixed(0);
//   return { productTotalPrice, percentage };
// };

// const BestSellingProduct = ({ product, totalPrice, isLast }) => {
//   const { img, title, type, unit, price } = product;
//   const { productTotalPrice, percentage } = getProductItemCalculatedData(
//     unit,
//     price,
//     totalPrice
//   );

//   // return (
//   //   <tr className={classNames({ 'border-bottom border-200': !isLast })}>
//   //     <td>
//   //       <Flex alignItems="center" className="position-relative">
//   //         <img
//   //           className="rounded-1 border border-200"
//   //           src={img}
//   //           width="60"
//   //           alt={title}
//   //         />
//   //         <div className="ms-3">
//   //           <h6 className="mb-1 fw-semi-bold">
//   //             <Link className="text-dark stretched-link" to="#!">
//   //               {title}
//   //             </Link>
//   //           </h6>
//   //           <p className="fw-semi-bold mb-0 text-500">{type}</p>
//   //         </div>
//   //       </Flex>
//   //     </td>
//   //     <td className="align-middle text-end fw-semi-bold">
//   //       ${productTotalPrice}
//   //     </td>
//   //     <td className="align-middle pe-card">
//   //       <Flex alignItems="center">
//   //         <ProgressBar now={percentage} style={{ width: '80px', height: 5 }} />
//   //         <div className="fw-semi-bold ms-3">{percentage}%</div>
//   //       </Flex>
//   //     </td>
//   //   </tr>
//   // );
// };

// BestSellingProduct.propTypes = {
//   totalPrice: PropTypes.number.isRequired,
//   isLast: PropTypes.bool,
//   product: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     img: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     unit: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired
//   }).isRequired
// };

const BestSellingProducts = ({ products }) => {

  // const totalPrice = getTotalPrice(products);
  // const noOfProducts = products.length;

  return (
    <Card className="h-lg-100">
      <Card.Body className="p-0">
        <Table borderless responsive className="mb-0 fs--1">
          <thead className="bg-light">
            <tr className="text-900">
              <th>Best Selling Plan</th>
              <th className="text-end">Price </th>
              <th className="pe-card text-center" style={{ width: '7rem' }}>
                Days
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (

              <tr className="border-bottom border-200" >
                <td>
                  <Flex alignItems="center" className="position-relative">
                    {/* <img
                      className="rounded-1 border border-200"
                      src={img}
                      width="60"
                      alt={title}
                    /> */}
                    <div className="ms-3">
                      <h6 className="mb-1 fw-semi-bold">
                        <Link className="text-dark stretched-link" to="/admin/plan/list">
                          {product.plan_title}
                        </Link>
                      </h6>
                      {/* <p className="fw-semi-bold mb-0 text-500">{type}</p> */}
                    </div>
                  </Flex>
                </td>
                <td className="align-middle text-end fw-semi-bold">
                  ${product.plan_price}
                </td>
                <td className="align-middle pe-card">
                  <Flex alignItems="center">
                    {/* <ProgressBar now={percentage} style={{ width: '80px', height: 5 }} /> */}
                    <div className="fw-semi-bold ms-3">{product.days} days</div>
                  </Flex>
                </td>
              </tr>

              // <BestSellingProduct
              //   // product={product}
              //   // totalPrice={totalPrice}
              //   // // isLast={index === noOfProducts - 1}
              //   // key={product.id}
              // />
            ))}
          </tbody>
        </Table>
      </Card.Body>

    </Card>
  );
};

// BestSellingProducts.propTypes = {
//   products: PropTypes.arrayOf(BestSellingProduct.propTypes.product).isRequired
// };

export default BestSellingProducts;
