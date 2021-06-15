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

var couponsPromotion=[],
    namesPromotion=[];
var dat=[]

var morrisBar= new Morris.Bar({
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: dat,
    // The name of the data record attribute that contains x-values.
    xkey: 'nombre',
    // A list of names of data record attributes that contain y-values.
    ykeys: 'cupones',
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['nombre', 'cupones'],
    barRatio: 0.4,
    barColors: ['#1F2547', '#1F2547', '#1F2547', '#1F2547'],
    xLabelAngle: 35,
    hideHover: 'auto',
    resize: true
  });
//obtener usuarios
promocion.
  orderBy("name", "asc").
  onSnapshot(
  snapshot => {
    snapshot.forEach(doc => {
    const promociones = doc.data();
    console.log(promociones.name)
    couponsPromotion.push(parseInt(promociones.coupons))
    namesPromotion.push(promociones.name)
  })
  for(var w=0; w < namesPromotion.length; w++){
    dat.push({nombre:namesPromotion[w],cupones:couponsPromotion[w]})   
    }
},
  error => console.error(error));



  