import { useNavigate } from "react-router-dom"
import {useForm} from "../../hook/useForm"
import { apiBack } from "../../api/apiBack"
import Swal from "sweetalert2"
import { useEffect } from "react"

const SignInLayer = () =>{
    const navegate = useNavigate()

    useEffect(()=>{
        let {log} = JSON.parse(localStorage.getItem('log')) || {log:false}
        if(log){
           navegate('/Agenda',{
            replace:true
        }) 
        }
    },[])

    const {name, lastname, user, password, onInputChange, onResetForm} = useForm({
        name: '', 
        lastname:'',
        user:'',
        password:''
    })

    const onSubmitForm = async(e) => {
        e.preventDefault()

        const headers = {
            'Authorization':'token cba5f582bbaa81e73c6080c2b22a1ac59230aee5'
        }
        const data = {
            name,lastname,user,password
        }
        const resp = await apiBack.post('/signin/',data,{headers})
        console.log(resp)
        if(!resp.data.success){
            Swal.fire(resp.data.msg,'','error')
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
                    <h1 className="text-center">Sign In</h1>
                    <hr/>
                    <form onSubmit={onSubmitForm}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInputName" name="name" onChange={onInputChange} placeholder="Name"/>
                            <label htmlFor="floatingInputName">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInputLastName" name="lastname" onChange={onInputChange} placeholder="Last Name"/>
                            <label htmlFor="floatingInputLastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" name="user" onChange={onInputChange} placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" name="password" onChange={onInputChange} placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="btn btn-dark mt-3 w-100">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInLayer