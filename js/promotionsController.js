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
        <table class="table table-dark table-striped">
            <thead>
            <tr>
                <th scope="col">Nombre de promocion</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Descuento</th>
                <th scope="col">Fecha de inicio</th>
                <th scope="col">Fecha final</th>
                <th scope="col">Codigo</th>
                <th scope="col">Puntos</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">${promociones.name}</th>
                <td>${promociones.description}</td>
                <td>${promociones.discount}</td>
                <td>${promociones.timeStart}</td>
                <td>${promociones.timeEnd}</td>
                <td>${promociones.code}</td>
                <td>${promociones.points}</td>
            </tr>
            </tbody>
        </table>
        <br>`;
    })
  },
  error => console.error(error));
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
