
auth.onAuthStateChanged(usr=>{infoUser.email=usr.email,infoUser.name=usr.displayName})

var urlNav={promotions: "",estadistics: ""}

function navar(){
  if(infoUser.email=="406474058038.cuponera@gmail.com"){
    urlNav.estadistics="./estadisticas.html"
    urlNav.promotions="./promociones.html"
  }
  else{
    urlNav.estadistics="./estadisticasUsuario.html"
    urlNav.promotions="./promocionesUsuario.html"
  }
  return {urlNav,infoUser}
}

document.getElementById("navar").innerHTML+=`
<div class="container-fluid">
      <a class="navbar-brand" href="./index.html">
        <img src="http://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" alt="imagen-walmart" width="90" height="40">
      </a>
      <a class="navbar-brand" href="${navar().urlNav.promotions}">Promociones</a>
      <a class="navbar-brand" href="${navar().estadistics}">Estadisticas</a>
      <button class="navbar-brand btn btn btn-link" type="button" onclick="terminaSesión()">Terminar Sesión</button>
</div>
`;
  