import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"; 
function App() {
    const url = "https://localhost:7280/api/usuarios"
  
    const [users, setusers] = useState([]) 
    const [id,setid] = useState('')
    const [nombre, setnombre]=useState('')
    const [apellido, setapellido]=useState('')
    const [tipo, settipo]=useState('')
    const [numero, setnumero]=useState('')
    const [telefono, settelefono]=useState('')
    const [correo, setcorreo]=useState('')
    const mostrar =()=>{
      axios.get(url).then(Response=>{
        setusers(Response.data)
      })
    }
    
    useEffect(()=>{
      mostrar();
    },[])


    const editar =(id, nombre, apellido,tipo,num,telefono,correo)=>{
        setid(id);
        setnombre(nombre);
        setapellido(apellido);
        settipo(tipo);
        setnumero(num);
        settelefono(telefono);
        setcorreo(correo);
    }

    const eliminar = async (id)=>{
        await  axios.delete(`${url}/${id}`)
          mostrar()
    }

    const registrar = async (e)=>{
      e.preventDefault();
       const a = await axios.post(url, {
        nombre: nombre,
        apellido: apellido,
        tipo_doc: tipo,
        num_doc: numero,
        telefono: telefono,
        correo: correo
      })
      console.log(a);
      mostrar()
    }

  return (
    <>
    <div class="d-grid gap-2 col-6 mx-auto">
    <button class="btn btn-outline-warning" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={mostrar}>Registrar</button>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Registrar usuario</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

      <form class="row g-3" onSubmit={(e)=>registrar(e)}>
      <div class="mb-3 row mt-3">
    <label for="inputNombre" class="col-sm-2 col-form-label">Nombre</label>
    <div class="col-sm-10">
      <input onChange={(e) => setnombre(e.target.value)} type="text" class="form-control" id="Nombre"/>
    </div>
    </div>
    <div class="mb-3 row mt-3">
    <label for="inputApellido" class="col-sm-2 col-form-label">Apellido</label>
    <div class="col-sm-10">
      <input    onChange={(e) => setapellido(e.target.value)} type="text" class="form-control" id="Apellido"/>
    </div>
    </div>
    <div class="mb-3 row ml-5">
    <label for="inputNombre" class="col-sm-2 col-form-label">Eliga tipo</label>
    <div class="col-sm-8">
    <select onChange={(e) => settipo(e.target.value)} class="form-select ml-5" aria-label="Default select example">
  <option selected>Documento</option>
  <option value="1">CC</option>
  <option value="2">TI</option>
</select>
    </div>
    </div>
    <div class="mb-3 row mt-3">
    <label for="inputnum_doc" class="col-sm-2 col-form-label">Nº Doc</label>
    <div class="col-sm-10">
      <input onChange={(e) => setnumero(e.target.value)} type="number" class="form-control" id="num_doc"/>
    </div>
    </div>
    <div class="mb-3 row mt-3">
    <label for="inputtelefono" class="col-sm-2 col-form-label">Telefono</label>
    <div class="col-sm-10">
      <input onChange={(e) =>settelefono(e.target.value)} type="number" class="form-control" id="telefonoc"/>
    </div>
    </div>
    <div class="mb-3 row mt-3">
    <label for="input_email" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email" onChange={(e) => setcorreo(e.target.value)} class="form-control" id="email"/>
    </div>
    </div>
  <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Guardar</button>
      </div>
  </form>
      </div>
    </div>
  </div>
</div>
<div class="container">
<table class="table mt-3 table-bordered">
  <thead>
    <tr className="text-center">
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Tipo Documento</th>
      <th scope="col">Nº Documento</th>
      <th scope="col">Telelfono</th>
      <th scope="col">Correo</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {
      users.map((u)=>(
        <tr key={u.usu_id}> 
        <td>{u.nombre}</td>
        <td>{u.apellido}</td>
        <td>{u.tipo_doc}</td>
        <td>{u.num_doc}</td>
        <td>{u.telefono}</td>
        <td>{u.correo}</td>
        <td><button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#Modal" onClick={()=>editar(u.usu_id,u.nombre,u.apellido,u.tipo_doc,u.num_doc,u.telefono,u.correo)}>Editar</button>&nbsp;
        <button type="button" class="btn btn-outline-danger" onClick={()=>eliminar(u.usu_id)}>Eliminar</button> </td>
      </tr>
      ))
    }
  </tbody>
</table>
</div>

<div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Actualizar informacion</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

      <form class="row g-3">
      <div class="mb-3 row mt-3">
    <label for="inputNombre" class="col-sm-2 col-form-label">Nombre</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="Nombre" value={nombre}/>
    </div>
    </div>
    <div class="mb-3 row mt-3">
    <label for="inputApellido" class="col-sm-2 col-form-label">Apellido</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="Apellido" value={apellido}/>
    </div>
    </div>
    <div class="mb-3 row ml-5">
    <label for="inputNombre" class="col-sm-2 col-form-label">Eliga tipo</label>
    <div class="col-sm-8">
    <select class="form-select ml-5" aria-label="Default select example">
    {

    }
</select>
    </div>
    </div>
    <div class="mb-3 row mt-3">
    <label for="inputnum_doc" class="col-sm-2 col-form-label">Nº Doc</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="num_doc" value={numero}/>
    </div>
    </div>
    <div class="mb-3 row mt-3">
    <label for="inputtelefono" class="col-sm-2 col-form-label">Telefono</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="telefono" value={telefono}/>
    </div>
    </div>
    <div class="mb-3 row mt-3">
    <label for="input_email" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="email" value={correo}/>
    </div>
    </div>
  <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Enviar</button>
      </div>
  </form>
      </div>
    </div>
  </div>
</div>
</>
  );
}

export default App;
