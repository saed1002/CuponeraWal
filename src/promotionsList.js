// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//conexion a la bd de firebase
const db =firebase.firestore()

//mandar a llamar una bd
const promocion = db.collection("Promociones");

//obtener usuarios
promocion.
  orderBy("name", "asc").
  onSnapshot(
  snapshot => {
    console.log(snapshot.size);
    snapshot.forEach(doc => {
      console.log(doc.id);
      const promociones = doc.data();
      document.getElementById("promocionesList").innerHTML+=`
      <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="http://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" style="height: 120px; weight:30px" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body" data-id="${doc.id}">
                      <h5 class="card-title">${promociones.name}</h5>
                      <p class="card-text">${promociones.description}.</p>
                      <p class="card-text"><small class="text-muted">Desde ${promociones.timeStart} Hasta ${promociones.timeEnd}</small></p>
                    </div>
                  </div>
                </div>
      </div>      
      `;
    })
  },
  error => console.error(error));