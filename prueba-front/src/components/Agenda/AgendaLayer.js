import { useEffect, useState } from "react"
import { apiBack } from "../../api/apiBack"
import { useForm } from "../../hook/useForm"
import Swal from 'sweetalert2'

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
                                <tr key={el.id}>
                                    <td>{el.id} </td>
                                    <td>{el.nombre} </td>
                                    <td>{el.direccion} </td>
                                    <td>{el.telefono} </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={()=>deleteRecord(el.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                            
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={5}>No hay registros</td>
                            </tr>        
                        )
                    }
                    
                </tbody>
            </table>

            

            <div className="modal fade" id="add" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Guardar contacto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" name="nombre" onChange={onInputChange} required placeholder="Nombre"/>
                                <label htmlFor="floatingInput">Nombre</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingDireccion" name="direccion" onChange={onInputChange} required placeholder="Direccion" />
                                <label htmlFor="floatingDireccion">Direccion</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingTelefono" name="telefono" onChange={onInputChange} required placeholder="Telefono"/>
                                <label htmlFor="floatingTelefono">Telefono</label>
                            </div>
                            <button className="btn btn-dark w-100 mt-3">Guardar</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default AgendaLayer