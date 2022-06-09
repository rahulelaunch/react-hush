import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer">
    <Row className="justify-content-between text-center fs--1 mt-4 mb-3">
      <Col sm="auto">
        <p className="mb-0 text-600">
            Copyright {new Date().getFullYear()} &copy;{' '} Hush Daddy{' '}
          <span className="d-none d-sm-inline-block">| </span>
          <br className="d-sm-none" />
          <a>Designed by Froth Enterprises Pty LTD</a>
        </p>
      </Col>
  
    </Row>
  </footer>
);

export default Footer;
