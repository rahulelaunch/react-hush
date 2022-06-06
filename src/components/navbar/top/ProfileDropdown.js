import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import team3 from 'assets/img/team/3.jpg';
import Avatar from 'components/common/Avatar';
import Http from '../../security/Http';
import url from '../../../Development.json';
import {
  errorResponse,
  successResponse,
  isError,
} from "../../helpers/response";
import dummy from '../../../assets/img/team/User.jpg';
import ImageGet from '../../app/ImageGet';



const ProfileDropdown = () => {

  const [name, setName] = useState('')
  const [profile, setProfile] = useState('');

  const Profile = () => {

    Http.callApi(url.get_profile)
        .then((response) => {
          let data = response.data;
            setName(data.username);
            setProfile(data.profile)
            
          
        })
        .catch((error) => {
            if (error.response) {
                errorResponse(error);
            }
        });
  };
  
  const Logout = () => {
  
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

  useEffect(() => {
    Profile();
});



// const [imgSrc, setImageSrc] = useState();
// const ImageUrl = (datas) => {
//     setImageSrc(datas);
// }
// useEffect(() => {
//     ImageUrl();
// }, [])


  // const [imageData,setImageData] = useState();
  // useEffect(() => {
  //   if (abc) {
  //     urlFetch("http://192.168.0.172:7000/user/uploads/" + abc)
  //   }
  // }, [abc])

  // const urlFetch = async (profileData) => {
  //   await fetch(profileData.toString(), {
  //     method: "GET",
  //     headers: new Headers({
  //       'authorization': `Bearer ` + localStorage.getItem('access_token'),
  //       'Content-Type': 'application/json',
  //       'env': 'test'
  //     })
  //   })
  //     .then(response => {
  //       const reader = response.body.getReader();
  //       return new ReadableStream({
  //         start(controller) {
  //           return pump();
  //           function pump() {
  //             return reader.read().then(({ done, value }) => {
  //               if (done) {
  //                 controller.close();
  //                 return;
  //               }
  //               controller.enqueue(value);
  //               const data = `data:${"image/jpeg"};base64,${new Buffer(value).toString('base64')}`;
  //               setImageData(data)
  //               return pump();
  //             });
  //           }
  //         }
  //       })
  //     })
  // }

  return (
<>
    {/* <ImageGet im={abc} /> */}
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="/admin/dashboard"
        className="pe-0 ps-2 nav-link"
      >
        <div className='d-flex align-items-center'><Avatar src={(profile) ? process.env.REACT_APP_IMAGE_URL+profile : dummy} /> <span className='ms-2'>{name}</span></div>
     
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
      
          <Dropdown.Item as={Link} to="/admin/profile">
            Profile 
          </Dropdown.Item>
   
          <Dropdown.Item as={Link} to="/admin/change_password">
            ChangePassword
          </Dropdown.Item>
          <Dropdown.Item onClick={Logout} >
            Logout
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
};

export default ProfileDropdown;
