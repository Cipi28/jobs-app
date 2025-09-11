import {Route, Routes, useLocation} from "react-router-dom";
import App, {BASE_ROUTE} from "@/App";
import {Home} from "../components/Home";
import {Login} from "../components/Login";
import {Register} from "../components/Register";
import {AppHeader} from "../components/AppHeader";
import {CompanyDetails} from "../components/CompanyDetails";
import {JobDetails} from "../components/JobsDetails";
import {Footer} from "../components/Footer/index.jsx";
import {ProfilePage} from "../components/ProfilePage";
import {JobsSearchPage} from "../components/JobsSearchPage";
import {EmailConfirmation} from "../components/EmailConfirmation";
import React from "react";

export const AppRoutes = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === `${BASE_ROUTE}login` || 
                       location.pathname === `${BASE_ROUTE}register` || 
                       location.pathname === `${BASE_ROUTE}email-confirmation`;

    return (
        <>
            {!isLoginPage && <AppHeader />}
            <Routes>
                <Route path={`${BASE_ROUTE}`} element={<App/>}>
                    <Route path={`${BASE_ROUTE}`} element={<Home/>}/>
                    <Route path={`${BASE_ROUTE}login`} element={<Login/>}/>
                    <Route path={`${BASE_ROUTE}register`} element={<Register/>}/>
                    <Route path={`${BASE_ROUTE}email-confirmation`} element={<EmailConfirmation/>}/>
                    <Route path={`${BASE_ROUTE}company/:companyId`} element={<CompanyDetails/>}/>
                    <Route path={`${BASE_ROUTE}job/:jobId`} element={<JobDetails/>} />
                    <Route path={`${BASE_ROUTE}profile`} element={<ProfilePage/>}/>
                    <Route path={`${BASE_ROUTE}jobs`} element={<JobsSearchPage/>}/>
                </Route>
            </Routes>
            {!isLoginPage && <Footer />}
        </>
    );
};