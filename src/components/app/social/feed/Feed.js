import React from 'react';
import { Col, Row } from 'react-bootstrap';
import events from 'data/events/events';
import AddToFeed from './AddToFeed';

import FeedProvider from './FeedProvider';
import FeedContent from './FeedContent';

const Feed = () => {
  return (
    <FeedProvider>
      <Row className="g-0 g-lg-3">
        <Col lg={8}>
          <FeedContent />
        </Col>
        <Col lg={4}>
       
    
       
        </Col>
      </Row>
    </FeedProvider>
  );
};

export default Feed;
