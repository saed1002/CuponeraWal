//conexion a la bd de firebase
const db =firebase.firestore()

//variable que guarda informacion del usuario logeado
let infoUser={name:'',email:''}

//mandar a llamar una bd
const promocion = db.collection("Promociones");
var promociones;

//Obtener informacion del usuario logeado
auth.onAuthStateChanged(usr=>{infoUser.email=usr.email,infoUser.name=usr.displayName})

//agrega valores a la coleccion
const addPromotion=(name,description,discount,timeEnd,timeStart,code,points)=>{
  promocion.doc().set({
      nameCreator: infoUser.name,
      mail: infoUser.email,
      name,
      description,
      discount,
      timeEnd,
      timeStart,
      code,
      points
  })}

// borrado de datos
const deletePromotion = (id) => promocion.doc(id).delete();

//obtener usuarios
promocion.
  orderBy("name", "asc").
  onSnapshot(
  snapshot => {
    console.log(snapshot.size);
    snapshot.forEach(doc => {
      console.log(doc.id);
      const promociones = doc.data();
      document.getElementById("leerPromociones").innerHTML+=`
            <tr class="text-center" data-id="${doc.id}">
                <td>${promociones.name}</td>
                <td>${promociones.description}</td>
                <td>${promociones.discount}</td>
                <td>${promociones.timeStart}</td>
                <td>${promociones.timeEnd}</td>
                <td>${promociones.code}</td>
                <td>${promociones.points}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button class="btn btn-outline-danger btn-delete" data-id="${doc.id}">Borrar</button>
                        <button class="btn btn-outline-warning btn-edit" data-id="${doc.id}">Editar</button>
                    </div>
                </td>
            </tr>`;
    })
  },
  error => console.error(error));

//funcion para borrar
const leerPromociones=document.getElementById("leerPromociones"),
 btnsDelete = leerPromociones.querySelectorAll(".btn-delete");
btnsDelete.forEach((btn) =>
  btn.addEventListener("click", async (e) => {
    console.log(e.target.dataset.id);
    try {
      await deletePromotion(e.target.dataset.id);
    } catch (error) {
      console.log(error);
    }
  })
);


//obtiene etiqueta del formulario
let agregarPromociones=document.getElementById("agregarPromociones")
//Funcion agrega datos a "Usuarios"
agregarPromociones.addEventListener("submit",async (e)=>{
//evita recargo de pagina
 e.preventDefault();
 //obtiene valor del campo HTML puntos
 var nombre=agregarPromociones["nombre"],
    descripcion=agregarPromociones["descripcion"],
    descuento=agregarPromociones["descuento"],
    fechaInicio=agregarPromociones["fechaInicio"],
    fechaFinal=agregarPromociones["fechaFinal"],
    codigo=agregarPromociones["codigo"]
    puntos=agregarPromociones["puntos"]
 //llama a la funcion addUser, para agregar datos
 await addPromotion(nombre.value,descripcion.value,descuento.value, fechaFinal.value,fechaInicio.value,codigo.value,puntos.value)

})
