//conexion a la bd de firebase
const db =firebase.firestore()

//variable que guarda informacion del usuario logeado
let infoUser={name:'',email:''}

//mandar a llamar una bd
const usuario = db.collection("Usuarios");

//Obtener informacion del usuario logeado
auth.onAuthStateChanged(usr=>{infoUser.email=usr.email,infoUser.name=usr.displayName})

const addUser=(points)=>{
  usuario.doc().set({
      name: infoUser.name,
      mail: infoUser.email,
      points,
  })}

let agregarUsuarios=document.getElementById("agregarUsuarios")
agregarUsuarios.addEventListener("submit",async (e)=>{
 e.preventDefault();
 var points=agregarUsuarios["points"]
 await addUser(points.value)

})
//crear coleccion 
const createUser = {
    name: infoUser.name,
    points: 10,
    coupons: ["ABCD323","LECHEECHE1234"],
    phone: "55-55-55-55-55",
    mail: infoUser.email,
}
