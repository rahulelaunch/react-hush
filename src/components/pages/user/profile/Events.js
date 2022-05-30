import React from 'react';
import PropTypes from 'prop-types';

import FalconCardHeader from 'components/common/FalconCardHeader';
import { Card } from 'react-bootstrap';
import FalconCardFooterLink from 'components/common/FalconCardFooterLink';


const Events = ({ cardTitle, events, ...rest }) => {
  return (
    <Card {...rest}>
      <FalconCardHeader title={cardTitle} light />
      <Card.Body className="fs--1 border-bottom">
    
      </Card.Body>
      <FalconCardFooterLink
        title="All Events"
        to="/events/event-list"
        size="sm"
      />
    </Card>
  );
};

Events.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape(Event.propTypes))
};

export default Events;
