  // Your web app's Firebase configuration
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
  firebase.analytics();

        //Conexión al sistema de autenticación de Firebase
        const auth = firebase.auth();
        //Tipo de autenticación de usuarios. En este caso es con Google.
        const provider = new firebase.auth.GoogleAuthProvider();
        //Configura el proveedor de Google para que permita seleccionar de una lista. 
        provider.setCustomParameters({ prompt: "select_account" });
        //Recibe una función que se invoca cada que hay un cambio en la autenticación y recibe el modelo con las características del usuario.*/
        auth.onAuthStateChanged(
          /** Recibe las características del usuario o null si no ha iniciado
           * sesión. */
          usuarioAuth => {
            if (usuarioAuth && usuarioAuth.email) {
              // Usuario aceptado.
              // @ts-ignore Muestra el email registrado en Google.
              email.value = usuarioAuth.email;
              // @ts-ignore Muestra el nombre registrado en Google.
              nombre.value = usuarioAuth.displayName;
              // @ts-ignore Muestra el avatar registrado en Google.
              avatar.src = usuarioAuth.photoURL;
            } else {
              // No ha iniciado sesión. Pide datos para iniciar sesión.
              auth.signInWithRedirect(provider); 
            }
          },
          // Función que se invoca si hay un error al verificar el usuario. //
          procesaError
        );
        /** Termina la sesión. */
        async function terminaSesión() {
          try {
            await auth.signOut();
          } catch (e) {
            procesaError(e);
          }
        }
        /** Procesa un error. Muestra el objeto en la consola y un cuadro de
         * alerta con el mensaje.
         * @param {Error} e descripción del error. */
        function procesaError(e) {
          console.log(e);
          alert(e.message);
        }