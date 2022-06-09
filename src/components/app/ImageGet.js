import  { useState, useEffect } from 'react'
import { Buffer } from "buffer";

const ImageGet = (props) => {
    console.log('props');
    console.log(props);
    const [imgSrc, setImageSrc] = useState("");
    props.ImageData(imgSrc);
    let propsImage = props.im;
    console.log('propsImage');
    console.log(propsImage);
   

    useEffect(() => {
        if (propsImage) {
          urlFetch("http://192.168.0.172:7000/user/uploads/" + propsImage)
        }
      }, [propsImage])

    const urlFetch = async (profileData) => {
        console.log('profileData');
        console.log(profileData);
        await fetch(profileData.toString(), {
          method: "GET",
          headers: new Headers({
            'authorization': `Bearer ` + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            'env': 'test'
          })
        })
          .then(response => {
            console.log('response');
            console.log(response);
            const reader = response.body.getReader();
            return new ReadableStream({
              start(controller) {
                return pump();
                function pump() {
                  return reader.read().then(({ done, value }) => {
                    if (done) {
                      controller.close();
                      return;
                    }
                    controller.enqueue(value);
                    const data = `data:${"image/jpeg"};base64,${new Buffer(value).toString('base64')}`;
                    setImageSrc(data)
                    return pump();
                  });
                }
              }
            })
          })
      }
}

export default ImageGet;