import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Background from 'components/common/Background';
import bg1 from 'assets/img/icons/spot-illustrations/corner-1.png';
import bg2 from 'assets/img/icons/spot-illustrations/corner-2.png';
import bg3 from 'assets/img/icons/spot-illustrations/corner-3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';
import Http from '../../../security/Http';
import url from '../../../../Development.json';
import {
  errorResponse,
  successResponse,
  isError,
} from "../../../helpers/response";
import { Link } from 'react-router-dom';

const StatisticsCards = () => {

  const [customerTotal, setCutomerTotal] = useState(0);
  const [planTotal, setPlanTotal] = useState(0);
  const [bodyTotal, setBodyTotal] = useState(0);
  const [fashionTotal, setFashionTotal] = useState(0);
  const [hairTotal, setHairTotal] = useState(0);
  const [eyeTotal, setEyeTotal] = useState(0);
  const [desireTotal, setDesireTotal] = useState(0);


  const dashboard = () => {
    Http.callApi(url.get_dashboard)
      .then((response) => {
        setCutomerTotal(response.data.user);
        setPlanTotal(response.data.plan);
        setBodyTotal(response.data.body);
        setFashionTotal(response.data.fashion);
        setHairTotal(response.data.hair);
        setEyeTotal(response.data.eye);
        setDesireTotal(response.data.desire);

      })
      .catch((error) => {
        if (error.response) {
          errorResponse(error);
        }
      });
  }

  useEffect(() => {
    dashboard();
  }, []);


  return (
    <>
      <Row className="g-3 mb-3">
        <Col sm={12} md={4}>
          <Card className='overflow-hidden'>
            <Background image={bg1} className="bg-card" />
            <Card.Body className="position-relative">
              <h6>
                Total Users
              </h6>
              <div className='text-warning display-4 fs-4 mb-2 fw-normal font-sans-serif' >
                <CountUp
                  start={0}
                  end={customerTotal}
                  duration={1}
                  suffix=''
                  prefix=''
                  separator=","
                  decimals={false ? 2 : 0}
                  decimal="."
                />
              </div>
              <Link to='/admin/users' className="fw-semi-bold fs--1 text-nowrap">
                See All
                <FontAwesomeIcon
                  icon="angle-right"
                  className="ms-1"
                  transform="down-1"
                />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className='overflow-hidden'>
            <Background image={bg2} className="bg-card" />
            <Card.Body className="position-relative">
              <h6>
                Total Plan
              </h6>
              <div className='text-warning display-4 fs-4 mb-2 fw-normal font-sans-serif' >
                <CountUp
                  start={0}
                  end={planTotal}
                  duration={1}
                  suffix=''
                  prefix=''
                  separator=","
                  decimals={false ? 2 : 0}
                  decimal="."
                />
              </div>
              <Link to='/admin/plan/list' className="fw-semi-bold fs--1 text-nowrap">
                See All
                <FontAwesomeIcon
                  icon="angle-right"
                  className="ms-1"
                  transform="down-1"
                />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className='overflow-hidden'>
            <Background image={bg3} className="bg-card" />
            <Card.Body className="position-relative">
              <h6>
                Total Body Type
              </h6>
              <div className='text-warning display-4 fs-4 mb-2 fw-normal font-sans-serif' >
                <CountUp
                  start={0}
                  end={bodyTotal}
                  duration={1}
                  suffix=''
                  prefix=''
                  separator=","
                  decimals={false ? 2 : 0}
                  decimal="."
                />
              </div>
              <Link to='/admin/body/list' className="fw-semi-bold fs--1 text-nowrap">
                See All
                <FontAwesomeIcon
                  icon="angle-right"
                  className="ms-1"
                  transform="down-1"
                />
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col sm={12} md={4}>
          <Card className='overflow-hidden'>
            <Background image={bg1} className="bg-card" />
            <Card.Body className="position-relative">
              <h6>
                Total Fashion type
              </h6>
              <div className='text-warning display-4 fs-4 mb-2 fw-normal font-sans-serif' >
                <CountUp
                  start={0}
                  end={fashionTotal}
                  duration={1}
                  suffix=''
                  prefix=''
                  separator=","
                  decimals={false ? 2 : 0}
                  decimal="."
                />
              </div>
              <Link to='/admin/fashion/list' className="fw-semi-bold fs--1 text-nowrap">
                See All
                <FontAwesomeIcon
                  icon="angle-right"
                  className="ms-1"
                  transform="down-1"
                />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className='overflow-hidden'>
            <Background image={bg2} className="bg-card" />
            <Card.Body className="position-relative">
              <h6>
                Total Hair Color
              </h6>
              <div className='text-warning display-4 fs-4 mb-2 fw-normal font-sans-serif' >
                <CountUp
                  start={0}
                  end={hairTotal}
                  duration={1}
                  suffix=''
                  prefix=''
                  separator=","
                  decimals={false ? 2 : 0}
                  decimal="."
                />
              </div>
              <Link to='/admin/hair/list' className="fw-semi-bold fs--1 text-nowrap">
                See All
                <FontAwesomeIcon
                  icon="angle-right"
                  className="ms-1"
                  transform="down-1"
                />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className='overflow-hidden'>
            <Background image={bg3} className="bg-card" />
            <Card.Body className="position-relative">
              <h6>
                Total Eye Color
              </h6>
              <div className='text-warning display-4 fs-4 mb-2 fw-normal font-sans-serif' >
                <CountUp
                  start={0}
                  end={eyeTotal}
                  duration={1}
                  suffix=''
                  prefix=''
                  separator=","
                  decimals={false ? 2 : 0}
                  decimal="."
                />
              </div>
              <Link to='/admin/eye/list' className="fw-semi-bold fs--1 text-nowrap">
                See All
                <FontAwesomeIcon
                  icon="angle-right"
                  className="ms-1"
                  transform="down-1"
                />
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col sm={12} md={4}>
          <Card className='overflow-hidden'>
            <Background image={bg1} className="bg-card" />
            <Card.Body className="position-relative">
              <h6>
                Total Desire
              </h6>
              <div className='text-warning display-4 fs-4 mb-2 fw-normal font-sans-serif' >
                <CountUp
                  start={0}
                  end={desireTotal}
                  duration={1}
                  suffix=''
                  prefix=''
                  separator=","
                  decimals={false ? 2 : 0}
                  decimal="."
                />
              </div>
              <Link to='/admin/desire/list' className="fw-semi-bold fs--1 text-nowrap">
                See All
                <FontAwesomeIcon
                  icon="angle-right"
                  className="ms-1"
                  transform="down-1"
                />
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StatisticsCards;
