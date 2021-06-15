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
const sg = firebase.storage();
//mandar a llamar una bd
const promocion = db.collection("Promociones");

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
console.log(hoy.toISOString().split("T")[0])



promocion.doc("mN8UlaQEpZVtbnjrvZWn").onSnapshot(
    promociones => {
      if (promociones.exists) {
        console.log(promociones.id);
        const datos = promociones.data();
        console.log(datos);
        var refArch = sg.ref(datos.rute);
        if(hoy.toISOString().split(".")[0]<=datos.timeEnd){
        sg.refFromURL(refArch).getDownloadURL().then(function(url) {
            document.getElementById("promocionInfo").innerHTML +=`
        <div class="card mb-3 bg-dark">
                <img src="${url}" class="card-img-top" alt="...">
                    <br><br>
                <div class="card-body">
                <h5 class="card-title display-2 border-top">${datos.name}</h5>
                <p class="card-text display-4 fst-italic">${datos.description}</p>
                <img src="https://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" class="card-img-top" alt="...">
                <div class="card mb-3 bg-secondary">
                <div class="card-body">
                <p class="card-text">Codigo: ${datos.code}</p>
                </div>  
                </div>
                <p class="card-text">El presente contrato describe los términos y condiciones aplicables al uso del contenido, productos y/o servicios del sitio web WAL-CUPONERA del cual es titular WAL-CUPONERA. Para hacer uso del contenido, productos y/o servicios del sitio web el usuario deberá sujetarse a los presentes términos y condiciones.</p>
                <p class="card-text"><p class="text-primary fw-bolder display-6">Hasta ${datos.timeStart.split('T')[0]}</p></p>
            </div>
        </div>
        `
            // Get the download URL for 'images/stars.jpg'
            // This can be inserted into an <img> tag
            // This can also be downloaded directly
          }).catch(function(error) {
            // Handle any errors
          });
      } else {
        console.log("No encontrado.");
        document.getElementById("promocionInfo").innerHTML +=`
        <div class="card mb-3 bg-dark">
                <img src="https://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" class="card-img-top" alt="...">
                    <br><br>
                <div class="card-body">
                <h5 class="card-title display-3"> Lo sentimos, la promo expiro :(</h5>
                
            </div>
        </div>
        `
      }}
    },
    error => console.error(error));

