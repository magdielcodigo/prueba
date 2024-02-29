import { Route, Routes } from "react-router-dom"
import NavBar from "../components/General/NavBar"
import LoginLayer from "../components/Login/LoginLayer"
import AgendaLayer from "../components/Agenda/AgendaLayer"
import SignInLayer from "../components/SignIn/SigninLayer"
import { PrivateRoutes } from "./PrivateRoutes"

const AppRouter = () =>{
    return (
        <Routes>
            <Route path='/' element={<NavBar/>}>
                <Route index element={<LoginLayer/>} />
                <Route path="/Registro" element={<SignInLayer/>} />
                <Route path="/Agenda" element={
                    <PrivateRoutes>
                        <AgendaLayer/>
                    </PrivateRoutes>
                } />
            </Route>
        </Routes>
    )
}

export default AppRouter