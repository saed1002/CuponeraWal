//conexion a la bd de firebase
const db =firebase.firestore()

//variable que guarda informacion del usuario logeado
let infoUser={name:'',email:''}

//mandar a llamar una bd
const usuario = db.collection("Usuarios");
var usuarios,
    registro;
//Obtener informacion del usuario logeado
auth.onAuthStateChanged(usr=>{infoUser.email=usr.email,infoUser.name=usr.displayName})

//agrega valores a la coleccion
const addUser=(phone, address)=>{
  usuario.doc().set({
      name: infoUser.name,
      mail: infoUser.email,
      phone,
      address,
      level:"user",
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
     if(infoUser.email===usuarios.mail && usuarios.phone !==" " && usuarios.address !==" "){
       registro = true;
     }
     else{
       registro = false;
     }
      document.getElementById("leerUsuarios").innerHTML+=`
        <div class="card bg-dark" style="width: 18rem;" data-id="${doc.id}">
            <div class="card-body">
              <h5 class="card-title text-light">${usuarios.name} - ${usuarios.mail}</h5>
              <p class="card-text text-light">Cupones usados: ${usuarios.coupons}</p>
            </div>
        </div>
        <br>`;
    })
  },
  error => console.error(error));

   if(registro==true){
  //obtiene etiqueta del formulario
   document.getElementById("agregarUsuarios").style.display = 'none';
  }
  else{
    let agregarUsuarios=document.getElementById("agregarUsuarios")
    //Funcion agrega datos a "Usuarios"
    agregarUsuarios.addEventListener("submit",async (e)=>{
  //evita recargo de pagina
   e.preventDefault();
   //obtiene valor del campo HTML puntos
   var telefono=agregarUsuarios["telefono"],
      direccion=agregarUsuarios["direccion"];
   //llama a la funcion addUser, para agregar datos
   await addUser(telefono.value, direccion.value)
  
  })
  }
