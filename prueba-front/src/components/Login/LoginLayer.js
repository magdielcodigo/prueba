import { useNavigate } from "react-router-dom"
import {useForm} from "../../hook/useForm"
import { apiBack } from "../../api/apiBack"
import Swal from 'sweetalert2'
import { useEffect } from "react"

const LoginLayer = ()=>{
    const navegate = useNavigate()

    useEffect(()=>{
        let {log} = JSON.parse(localStorage.getItem('log')) || {log:false}
        if(log){
           navegate('/Agenda') 
        }
    },[])

    const {user, password, onInputChange, onResetForm} = useForm({
        user:'',
        password:''
    })

    const onSubmitForm = async (e) => {
        e.preventDefault()
        const headers = {
            'Authorization':'token cba5f582bbaa81e73c6080c2b22a1ac59230aee5'
        }
        const data = {
            user,
            password
        }
        const resp = await apiBack.post('/login/', data, {headers})

        if(!resp.data.success){
            Swal.fire(resp.data.msg,'', 'error')
            return
        }

        localStorage.setItem('log', JSON.stringify({
            ...resp.data.extraData,
            log: true
        }))

        navegate('/Agenda',{
            replace:true
        })

        onResetForm()
    }
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center ">
                <div className="col-lg-6 shadow p-3 mb-5 bg-body rounded">
                    <h1 className="text-center">Log In</h1>
                    <hr/>
                    <form onSubmit={onSubmitForm}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" name="user" onChange={onInputChange} required placeholder="User"/>
                            <label htmlFor="floatingInput">User</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" name="password" onChange={onInputChange} required placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="btn btn-dark mt-3 w-100">Enter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginLayer