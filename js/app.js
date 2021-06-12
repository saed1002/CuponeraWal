//conexion a la bd de firebase
const db =firebase.firestore()

//variable que guarda informacion del usuario logeado
let infoUser={name:'',email:''}

//mandar a llamar una bd
const usuario = db.collection("Usuarios");
var usuarios;

//Obtener informacion del usuario logeado
auth.onAuthStateChanged(usr=>{infoUser.email=usr.email,infoUser.name=usr.displayName})

//agrega valores a la coleccion
const addUser=(phone)=>{
  usuario.doc().set({
      name: infoUser.name,
      mail: infoUser.email,
      phone,
      coupons: ['BIENBENIDA2021'],
      points: 1,
  })}

//obtener usuarios
let leerUsuarios=document.getElementById("leerUsuarios")
    usuario.
    orderBy("name", "asc").
    onSnapshot(
    snapshot => {
      console.log(snapshot.size);
      snapshot.forEach(doc => {
        console.log(doc.id);
        usuarios = doc.data();
        console.log(usuarios);
      })
    },
    error => console.error(error));
leerUsuarios.innerHTML+=`
<table class="rwd-table">
  <tr>
    <th>Movie Title</th>
    <th>Genre</th>
    <th>Year</th>
    <th>Gross</th>
  </tr>
  <tr data-id="${doc.id}">
    <td>${usuarios.name}</td>
    <td>${usuarios.email}</td>
    <td>${usuarios.coupons}</td>
   </tr>
</table> 
`
//obtiene etiqueta del formulario
let agregarUsuarios=document.getElementById("agregarUsuarios")
//Funcion agrega datos a "Usuarios"
agregarUsuarios.addEventListener("submit",async (e)=>{
//evita recargo de pagina
 e.preventDefault();
 //obtiene valor del campo HTML puntos
 var telefono=agregarUsuarios["telefono"]
 //llama a la funcion addUser, para agregar datos
 await addUser(telefono.value)

})
