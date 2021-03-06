import React,{useState,useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  marketShare,
  totalOrder,
  weeklySalesData,
  weather,
} from 'data/dashboard/default';

import TotalPlan from './TotalPlan';
import TotalUser from './TotalUser';
import TotalGender from './TotalGender';
import TotalUserChart from './TotalUserChart';
import BestSellingProducts from './BestSellingProducts';
import Weather from './Weather';
import Http from '../../security/Http';
import url from '../../../Development.json';

import {
  errorResponse,
} from "../../helpers/response";

const Dashboard = () => {

  const [customerTotal, setCutomerTotal] = useState(0);
  const [planTotal, setPlanTotal] = useState(0);
  const [PlanData, setPlanData] = useState([]);
  const [Gender, setGender] = useState([]);
  const [Users, setUser] = useState([]);

  const dashboard = () => {
    Http.callApi(url.get_dashboard)
      .then((response) => {
        setCutomerTotal(response.data.user);
        setPlanTotal(response.data.plan);
        setGender(response.data);
        setUser(response.data.users);
      })
      .catch((error) => {
        if (error.response) {
          errorResponse(error);
        }
      });
  }

  const getPlan = () => {
    Http.callApi(url.get_mobilePlan)
      .then((response) => {
        // setLoading(false);
        setPlanData(response.data);

      })
      .catch((error) => {
        if (error.response) {
          errorResponse(error);
        }
      });
  }

  useEffect(() => {
    dashboard();
    getPlan();
  }, []);



  return (
    <>
      <Row className="g-3 mb-3">
      <Col md={6} xxl={3}>
          <TotalUser data={totalOrder} data1={customerTotal}/>
        </Col>
        <Col md={6} xxl={3}>
          <TotalPlan data={weeklySalesData} data1 = {planTotal}/>
        </Col>
       
        <Col md={6} xxl={3}>
          <TotalGender data1={Gender} data={marketShare} radius={['100%', '87%']}/>
        </Col>
        <Col md={6} xxl={3}>
          <Weather data={weather} />
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col lg={6}>
          <TotalUserChart data1 ={Users}/>
        </Col>

        <Col lg={6}>
        <BestSellingProducts products={PlanData} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
