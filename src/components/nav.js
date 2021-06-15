auth.onAuthStateChanged(
  /** Recibe las características del usuario o null si no ha iniciado
   * sesión. */
  usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) {
      if(usuarioAuth.email==="06474058038.cuponera@gmail.com"){
      document.getElementById("navar").innerHTML+=`
        <div class="container-fluid">
              <a class="navbar-brand" href="./index.html">
                <img src="http://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" alt="imagen-walmart" width="90" height="40">
              </a>
              <a class="navbar-brand text-light" href="./promociones.html">Promociones</a>
              <a class="navbar-brand text-light" href="./estadisticas.html">Estadisticas</a>
              <button class="navbar-brand btn btn btn-link text-light" type="button" onclick="terminaSesión()">Terminar Sesión</button>
        </div>
        `;}
        else{
          document.getElementById("navar").innerHTML+=`
        <div class="container-fluid">
              <a class="navbar-brand" href="./index.html">
                <img src="http://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" alt="imagen-walmart" width="90" height="40">
              </a>
              <a class="navbar-brand text-light" href="./promocionesUsuario.html">Promociones</a>
              <a class="navbar-brand text-light" href="./myWallet.html">My wallet</a>
              <button class="navbar-brand btn btn btn-link text-light" type="button" onclick="terminaSesión()">Terminar Sesión</button>
        </div>
        `
        }
    } else {
      // No ha iniciado sesión. Pide datos para iniciar sesión.
      auth.signInWithRedirect(provider); 
    }
  },
  // Función que se invoca si hay un error al verificar el usuario. //
  procesaError
);

  