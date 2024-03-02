const ModalComponent = ({onSubmit, onInputChange, nombre, direccion, telefono}) =>{

    return (
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
                                <input type="text" className="form-control" id="floatingInput" name="nombre" onChange={onInputChange} required placeholder="Nombre" value={nombre}/>
                                <label htmlFor="floatingInput">Nombre</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingDireccion" name="direccion" onChange={onInputChange} required placeholder="Direccion" value={direccion} />
                                <label htmlFor="floatingDireccion">Direccion</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingTelefono" name="telefono" onChange={onInputChange} required placeholder="Telefono" value={telefono}/>
                                <label htmlFor="floatingTelefono">Telefono</label>
                            </div>
                            <button className="btn btn-dark w-100 mt-3"  data-bs-dismiss="modal">Guardar</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default ModalComponent