import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { notifications } from 'data/notification/notification';
import associations from 'data/associations';

import WidgetSectionTitle from './WidgetSectionTitle';

import Notification from 'components/notification/Notification';

import rawFeeds from 'data/feed';
import FalconCardFooterLink from 'components/common/FalconCardFooterLink';
import ProfileBanner from 'components/pages/user/profile/Banner';

import Associations from 'components/pages/asscociations/Associations';
import InvitePeople from 'components/pages/miscellaneous/invite-people/InvitePeople';
import people from 'data/people';

import ActivityLog from 'components/pages/user/profile/ActivityLog';
import activities from 'data/activities';

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
              {notifications.slice(0, 4).map(notification => (
                <Notification {...notification} key={notification.id} />
              ))}
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
        <Col lg={6}>
          <Associations
            className="mb-3 h-100"
            associations={associations.slice(0, 8)}
            colBreakpoints={{ sm: 6 }}
          />
        </Col>
      </Row>
      <div className="mb-3">
        <InvitePeople />
      </div>

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
          <ActivityLog activities={activities.slice(0, 6)} />
          <div className="mt-3">
       
          </div>
          <ActiveUsers users={users} end={7} />
        </Col>
      </Row>

      <ProfileBanner />
 
    </>
  );
};

export default UsersWidgets;
