import { useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"

 const NavBar = () =>{
    const navegate = useNavigate()
    
    const LogOut = () =>{
        localStorage.clear()
        navegate('/')
    }
    
    const {log, nombre} = JSON.parse(localStorage.getItem('log')) || {log:false}

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Agenda</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {
                                log ? ( 
                                    <>
                                        <li className="nav-item">
                                            <p className="text-white mt-2">{nombre}</p>  
                                        </li>
                                        <li className="nav-item">
                                            <button className="btn btn-danger" onClick={LogOut}>Cerrar sesión</button>
                                        </li>
                                    </>
                                ):(
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/">Log In</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/Registro">Sign In</Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet/>
        </>
    )
}
export default NavBar