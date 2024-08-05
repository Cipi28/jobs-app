import {Route, Routes} from "react-router-dom";
import App from "../App";
import {Home} from "../components/Home";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={"/jobs-app"} element={<App/>}>
                <Route path={"/jobs-app"} element={<Home/>}/>
            </Route>
        </Routes>
    );
};