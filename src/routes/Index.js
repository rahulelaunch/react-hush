import React from "react";
import Main from "../../admin-panel/pages/Main";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import routes from "./routes.jsx";
import Login from '../../admin-panel/pages/Login';

const Routesconst = () => (

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}>
                <Route exact path={'admin/login'} />;
            </Route>
            {routes.map((route, i) => {
                return <Route path="/" element={<Main ptitle={route.element.props.title} />} key={i} >
                    <Route exact path={route.path}  {...route} />;
                </Route>
            })}
        </Routes>
    </BrowserRouter>
);

export default Routesconst;
