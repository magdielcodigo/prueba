import { useEffect, useState } from "react"
import { apiBack } from "../../api/apiBack"
import { useForm } from "../../hook/useForm"
import Swal from 'sweetalert2'
import ModelComponent from "./ModalComponent/ModalComponent"
import RowComponent from "./RowComponent/RowComponent"

let {id} = JSON.parse(localStorage.getItem('log')) || {log:false}

const AgendaLayer = ()=>{
    const [agenda, setAgenda] = useState([])
    const [update, setUpdate] = useState(false)

    useEffect(()=>{
        let {id} = JSON.parse(localStorage.getItem('log')) || {log:false}

        const getData = async()=>{
            const headers = {
                'Authorization':'token cba5f582bbaa81e73c6080c2b22a1ac59230aee5'
            }
            const resp = await apiBack.get(`/agendaGet/?id=${id}`,{headers})
            
            setAgenda(resp.data.agenda)
        }
        getData()
        return ()=>{
            setUpdate(false)
        }
    },[update])

    const {nombre, direccion, user, telefono, onInputChange, onResetForm} = useForm({
        nombre: '', 
        direccion:'',
        telefono:'',
        user: id
    })

    const onSubmit = async(e) =>{
        e.preventDefault()

        const headers = {
            'Authorization':'token cba5f582bbaa81e73c6080c2b22a1ac59230aee5'
        }
        const data = {
            nombre, direccion, user, telefono
        }
        const resp = await apiBack.post('/agendaCreate/',data,{headers})
        if(!resp.data.success){
            Swal.fire(resp.data.msg,'','error')
            return
        }
        Swal.fire(resp.data.msg,'','success')
        onResetForm()
        setUpdate(true)
    }

    const deleteRecord = async(persona) =>{
        const headers = {
            'Authorization':'token cba5f582bbaa81e73c6080c2b22a1ac59230aee5'
        }
        const data = {
            persona,
            user:id
        }
        const resp = await apiBack.post('/agendaDelete/',data,{headers})
        if(!resp.data.success){
            Swal.fire(resp.data.msg,'','error')
            return
        }
        Swal.fire(resp.data.msg,'','success')
        setUpdate(true)
    }

    return (
        <div className="container">
            <button type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#add">
                Agregar
            </button>
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        agenda.length > 0 ? (
                            agenda.map((el)=>(
                                <RowComponent key={el.id} el={el} deleteRecord={deleteRecord} />
                            ))
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={5}>No hay registros</td>
                            </tr>        
                        )
                    }
                    
                </tbody>
            </table>

            
             <ModelComponent onSubmit={onSubmit} onInputChange={onInputChange} />
        </div>
        
    )
}

export default AgendaLayer