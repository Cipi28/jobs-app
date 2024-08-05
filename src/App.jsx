import {AppHeader} from "./components/AppHeader";
import {Outlet} from "react-router-dom";
import './App.css'

function App() {


    return (
        <>
            <AppHeader/>
            <Outlet/>
        </>
    )
}

export default App
