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
      address,
      
      coupons: ['MbVjhFnai8T9O5G0aqaF'],
      points: 1,
  })}

//obtener usuarios
usuario.
  orderBy("name", "asc").
  onSnapshot(
  snapshot => {
    console.log(snapshot.size);
    snapshot.forEach(doc => {
      console.log(doc.id);
      const usuarios = doc.data();
      document.getElementById("leerUsuarios").innerHTML+=`
        <div class="card bg-dark" style="width: 18rem;" data-id="${doc.id}">
            <div class="card-body">
              <h5 class="card-title">${usuarios.name} - ${usuarios.mail}</h5>
              <p class="card-text">Cupones usados: ${usuarios.coupons}</p>
            </div>
        </div>
        <br>`;
    })
  },
  error => console.error(error));
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