const RowComponent = ({el, deleteRecord}) =>{
    
    return (
            <tr >
                <td>{el.id} </td>
                <td>{el.nombre} </td>
                <td>{el.direccion} </td>
                <td>{el.telefono} </td>
                <td>
                    <button className="btn btn-danger" onClick={()=>deleteRecord(el.id)}>Eliminar</button>
                </td>
            </tr>
    )
}

export default RowComponent