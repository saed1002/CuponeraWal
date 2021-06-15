  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA14Vc16_jkjUzCWBpjwTy_t-Hwtz2Wt5k",
    authDomain: "cuponerawal.firebaseapp.com",
    projectId: "cuponerawal",
    storageBucket: "cuponerawal.appspot.com",
    messagingSenderId: "406474058038",
    appId: "1:406474058038:web:62a527c117af27f3b52b97",
    measurementId: "G-WEEL5GKJB2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//conexion a la bd de firebase
const db =firebase.firestore()
const promocion = db.collection("Promociones");




//obtener usuarios
promocion.
  orderBy("name", "asc").
  onSnapshot(
  snapshot => {
    snapshot.forEach(doc => {
    const promociones = doc.data();
    var porcentaje
    if(((parseInt(promociones.used)*100)/parseInt(promociones.coupons)).toFixed()<50){
      porcentaje="bg-success"
    }
    if(((parseInt(promociones.used)*100)/parseInt(promociones.coupons)).toFixed()>50){
      porcentaje="bg-danger"
    }
    document.getElementById("myfirstchart").innerHTML+=`
    <div class="md">
          <div class="card-title">${promociones.name}</div>
          <div class="progress">
            <div class="card-list progress-bar progress-bar-striped progress-bar-animated ${porcentaje}" role="progressbar" style="width:${((parseInt(promociones.used)*100)/parseInt(promociones.coupons)).toFixed()}%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">${((parseInt(promociones.used)*100)/parseInt(promociones.coupons)).toFixed()}%</div>
          </div>
          <div class="card-list text-center">
          <p class="text-muted"> Quedan ${promociones.used} cupones de  ${promociones.coupons}</p>
    </div>
    `
  })
},
  error => console.error(error));



  