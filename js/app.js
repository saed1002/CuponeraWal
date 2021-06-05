//conexion a la bd de firebase
const db =firebase.firestore()

let infoUser={name:'',email:''}

//mandar a llamar una bd
const usuario = db.collection("Usuarios");

auth.onAuthStateChanged(usr=>{infoUser.email=usr.email,infoUser.name=usr.displayName})
const createUser ={
    name: infoUser.name,
    points: 10,
    coupons: ["ABCD323","LECHEECHE1234"],
    phone: "55-55-55-55-55",
    mail: infoUser.email,
}
const newUser = await usuario.add(createUser);
console.log(newUser.name);
