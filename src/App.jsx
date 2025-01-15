import {Outlet} from "react-router-dom";
import './App.css'

export const BASE_ROUTE = '/jobs-app/';

function App() {
    return (
        <>
            <Outlet/>
        </>
    )
}
export default App
