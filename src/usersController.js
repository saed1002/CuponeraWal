//conexion a la bd de firebase
const db = firebase.firestore()
const sg = firebase.storage();

var agregarUsuarios = document.getElementById("agregarUsuarios")
var promocionesList = document.getElementById("promocionesList")

//mandar a llamar una bd
const usuario = db.collection("Usuarios");
const promocion = db.collection("Promociones");

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);



var user = firebase.auth().onAuthStateChanged(userAuth => {
  usuario.where("mail", "==", userAuth.email).onSnapshot(async snapshot => {
    if (await snapshot.size >= 1) {
      console.log(snapshot.size)
      document.getElementById("agregarUsuarios").innerHTML += `
            <div class="container">
            <div class="row justify-content-md-center">
                <p class="text-center diplay-4"> Gracias por tu registro</p>
            </div>
            </div>`;
    }
    else {
      document.getElementById("agregarUsuarios").innerHTML += `
        <div class="container">
        <div class="row justify-content-md-center">
            <p class="text-center display-5"><i class="fas fa-tags"></i> Completa tu informacion</p>
        </div>
         </div>  
         <div class="row">
             <div class="col-md-6">
                 <label class="form-label"><i class="fas fa-tag"></i> Telefono</label>
                 <input type="tel" class="form-control" name="telefono" required>
             </div>
             <div class="col-md-6">
                 <label class="form-label"><i class="fas fa-audio-description"></i> Direccion</label>
                 <input type="text" class="form-control" name="direccion" required>
             </div>
         </div>
         <div class="row justify-content-md-center">
         <button class="btn btn-primary">Enviar</button>
         </div>
        `;

    }
    //agrega valores a la coleccion
    const addUser = (phone, address) => {
      usuario.doc().set({
        name: userAuth.displayName,
        mail: userAuth.email,
        phone,
        address,
        level: "user",
        coupons: ['MbVjhFnai8T9O5G0aqaF'],
        points: 1,
      })
    }
    //Funcion agrega datos a "Usuarios"
    agregarUsuarios.addEventListener("submit", (e) => {
      //obtiene valor del campo HTML puntos
      var telefono = agregarUsuarios["telefono"],
        direccion = agregarUsuarios["direccion"];
      //llama a la funcion addUser, para agregar datos
      addUser(telefono.value, direccion.value)
      telefono = agregarUsuarios["telefono"].value = "",
        direccion = agregarUsuarios["direccion"].value = "";
      checkRegister(snapshot.size)
    })
  }, error => console.error(error))
});



var validacionUsuario = firebase.auth().onAuthStateChanged(userAuth => {
  usuario.where("mail", "==", userAuth.email).onSnapshot(snapshot => {
    snapshot.forEach(registros => {
      var usr = registros.data();
      promocion.onSnapshot(snapshot => {
            console.log(snapshot.size);
            if (snapshot.size >= 1) {
              snapshot.forEach(doc => {
                console.log(doc.id);
                const promociones = doc.data();
                console.log(promociones.timeEnd.split("T")[1])
                console.log(promociones.points)
                if (hoy.toISOString().split(".")[0] <= promociones.timeEnd && usr.points >= promociones.points) {
                  var refArch = sg.ref(promociones.rute);
                  sg.refFromURL(refArch).getDownloadURL().then(function (url) {
                    document.getElementById("promocionesList").innerHTML += `
      <div class="card mb-3 bg-secondary" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                  <img src="${url}" style="height: 120px; weight:30px" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div id="idPromo" class="card-body" data-id="${doc.id}">
                      <input name="prueba" value="${doc.id}" style="visibility: hidden"/>
                      <h5 class="card-title">${promociones.name}</h5>
                      <p class="card-text">${promociones.description}.</p>
                      <p class="card-text">${promociones.discount} % de descuento</p>
                      <p class="card-text"><small class="">Desde ${promociones.timeStart.split('T')[0]} ${promociones.timeStart.split('T')[1]} Hasta ${promociones.timeEnd.split("T")[0]} ${promociones.timeEnd.split("T")[1]}</small></p>
                      <div class="row justify-content-md-center">
                        <button class="btn btn-primary btn-selected" data-id="${doc.id}">Obtener</button>
                      </div>
                    </div>
                  </div>
                </div>
      </div>      
                    `;
                    const btnsSelected = tasksContainer.querySelectorAll(".btn-selected");
                    btnsSelected.forEach((btn) =>
                      btn.addEventListener("click", async (e) => {
                        console.log(e.target.dataset.id);
                        try {
                          console.log(e.target.dataset.id)
                          //await db.collection("Promociones").doc(e.target.dataset.id).delete();
                        } catch (error) {
                          console.log(error);
                        }
                      })
                    ); 
                  }).catch(function (error) {
                    console.log(error)
                  });
                }
              
              
              })
            }
            else {
              document.getElementById("promocionesList").innerHTML += `
              <div class="text-white bg-dark" style="max-width: 540px;">
              <p class="text-center display-4">Proximamente se vendran nuevas promos</p>
              </div>`;
            }
          },
          error => console.error(error));
    })
  })
});


