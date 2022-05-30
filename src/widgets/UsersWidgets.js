import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';



import WidgetSectionTitle from './WidgetSectionTitle';



import rawFeeds from 'data/feed';
import FalconCardFooterLink from 'components/common/FalconCardFooterLink';


import people from 'data/people';



import ActiveUsers from 'components/dashboards/default/ActiveUsers';
import { users } from 'data/dashboard/default';

const UsersWidgets = () => {
  return (
    <>
      <WidgetSectionTitle
        icon="user-friends"
        title="Users & Feed"
        transform="shrink-4"
        className="mb-4 mt-6"
      />

      <Row className="g-3 mb-3">
     

        <Col lg={6}>
          <Card>
            <Card.Header className="bg-light">
              <h5 className="mb-1 mb-md-0">Notifications</h5>
            </Card.Header>
            <Card.Body className="p-0">
        
            </Card.Body>
            <FalconCardFooterLink
              title="All Notifications"
              to="/social/notifications"
              size="sm"
            />
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col lg={6}>
    
        </Col>
       
      </Row>
  

      <Row className="g-3 mb-3">
        <Col lg={8}>
          <Row className="align-items-stretch h-100">
            <Col className="mb-3">
              <FeedCard feed={rawFeeds[4]} className="h-100" />
            </Col>
            <Col className="">
              <FeedCard feed={rawFeeds[0]} className="h-100" />
            </Col>
          </Row>
        </Col>

        <Col lg={4}>
         
          <div className="mt-3">
       
          </div>
          <ActiveUsers users={users} end={7} />
        </Col>
      </Row>


 
    </>
  );
};

export default UsersWidgets;
