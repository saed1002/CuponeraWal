var usuarioMail;
auth.onAuthStateChanged(
  /** Recibe las características del usuario o null si no ha iniciado
   * sesión. */
getUserLogin => {
  if (getUserLogin && getUserLogin.email) {
    // Usuario aceptado.
    // @ts-ignore Muestra el email registrado en Google.
    usuarioMail = getUserLogin.email;
  } else {
    // No ha iniciado sesión. Pide datos para iniciar sesión.
    auth.signInWithRedirect(provider); 
  }
},
// Función que se invoca si hay un error al verificar el usuario. //
procesaError
);

var urlNav={estadistics:"",promotions:""}
function navar(){
  if(usuarioMail=="406474058038.cuponera@gmail.com"){
    urlNav.estadistics="./estadisticas.html"
    urlNav.promotions="./promociones.html"
  }
  else{
    urlNav.estadistics="./estadisticasUsuario.html"
    urlNav.promotions="./promocionesUsuario.html"
  }
  return {urlNav}
}

document.getElementById("navar").innerHTML+=`
<div class="container-fluid">
      <a class="navbar-brand" href="./index.html">
        <img src="http://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" alt="imagen-walmart" width="90" height="40">
      </a>
      <a class="navbar-brand text-light" href="${navar().urlNav.promotions}">Promociones</a>
      <a class="navbar-brand text-light" href="./estadisticas.html">Estadisticas</a>
      <button class="navbar-brand btn btn btn-link text-light" type="button" onclick="terminaSesión()">Terminar Sesión</button>
</div>
`;
  