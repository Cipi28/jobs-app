import {Route, Routes, useLocation} from "react-router-dom";
import App, {BASE_ROUTE} from "@/App";
import {Home} from "../components/Home";
import {Login} from "../components/Login";
import {AppHeader} from "../components/AppHeader";
import {CompanyDetails} from "../components/CompanyDetails";
import {JobDetails} from "../components/JobsDetails";
import {Footer} from "../components/Footer/index.jsx";
import React from "react";

export const AppRoutes = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/jobs-app/login";

    return (
        <>
            {!isLoginPage && <AppHeader />}
            <Routes>
                <Route path={`${BASE_ROUTE}`} element={<App/>}>
                    <Route path={`${BASE_ROUTE}`} element={<Home/>}/>
                    <Route path={`${BASE_ROUTE}login`} element={<Login/>}/>
                    <Route path={`${BASE_ROUTE}company/:companyId`} element={<CompanyDetails/>}/>
                    <Route path={`${BASE_ROUTE}job/:jobId`} element={<JobDetails/>} />
                </Route>
            </Routes>
            {!isLoginPage && <Footer />}
        </>
    );
};