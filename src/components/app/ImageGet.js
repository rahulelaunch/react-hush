import React, { useState, useEffect } from 'react'
import { Buffer } from "buffer";

const ImageGet = (props) => {
    console.log('props');
    console.log(props);
    const [imgSrc, setImageSrc] = useState("");
    props.ImageData(imgSrc);
    let propsImage = props.im;
    useEffect(() => {
        if (propsImage) {
            urlFetch("https://1afc-136-232-118-126.in.ngrok.io/user/uploads/images/" + propsImage)
        }
    },[propsImage])

    const urlFetch = (async (profiledata) => {
        await fetch(profiledata.toString(), {
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
    })
}

export default ImageGet;