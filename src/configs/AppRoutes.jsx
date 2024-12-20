import {Route, Routes, useLocation} from "react-router-dom";
import App from "../App";
import {Home} from "../components/Home";
import {Login} from "../components/Login";
import {AppHeader} from "../components/AppHeader";
import {CompanyDetails} from "../components/CompanyDetails";
import {JobDetails} from "../components/JobsDetails";

export const AppRoutes = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/jobs-app/login";

    return (
        <>
            {!isLoginPage && <AppHeader />}
            <Routes>
                <Route path={"/jobs-app"} element={<App/>}>
                    <Route path={"/jobs-app"} element={<Home/>}/>
                    <Route path={"/jobs-app/login"} element={<Login/>}/>
                    <Route path={"/jobs-app/company/:companyId"} element={<CompanyDetails/>}/>
                    <Route path={"/jobs-app/job/:jobId"} element={<JobDetails/>} />
                </Route>
            </Routes>
        </>
    );
};