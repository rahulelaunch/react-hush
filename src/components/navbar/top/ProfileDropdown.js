import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import team3 from 'assets/img/team/3.jpg';
import Avatar from 'components/common/Avatar';
import Http from '../../security/Http';
import url from '../../../Development.json';


const Logout = () => {
  console.log(1212);

    const isLogin = localStorage.getItem("access_token") || false;
   
      if (isLogin) {
          const obj = {
              access_token: localStorage.getItem('access_token')
          };
          Http.callApi(url.logout, JSON.stringify(obj))
              .then((response) => {

              })
              .catch((error) => {
                  if (error.response) {
                      // errorResponse(error);
                  }
              });
      }

};


const ProfileDropdown = () => {


  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar src={team3} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
      
          <Dropdown.Item as={Link} to="/user/profile">
            Profile &amp; account
          </Dropdown.Item>
   
          <Dropdown.Item as={Link} to="/user/settings">
            Settings
          </Dropdown.Item>
          <Dropdown.Item onClick={Logout} >
            Logout
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
