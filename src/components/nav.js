import {infoUser} from '..usersController.js'
if(infoUser.email=="406474058038.cuponera@gmail.com"){
document.getElementById("navar").innerHTML+=`
<div class="container-fluid">
      <a class="navbar-brand" href="./index.html">
        <img src="http://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" alt="imagen-walmart" width="90" height="40">
      </a>
      <a class="navbar-brand" href="./promociones.html">Promociones</a>
      <a class="navbar-brand" href="./estadisticas">Estadisticas</a>
      <button class="navbar-brand btn btn btn-link" type="button" onclick="terminaSesión()">Terminar Sesión</button>
</div>
`;
}
else{
  document.getElementById("navar").innerHTML+=`
    <div class="container-fluid">
          <a class="navbar-brand" href="./index.html">
            <img src="http://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" alt="imagen-walmart" width="90" height="40">
          </a>
          <a class="navbar-brand" href="./promocionesListado.html">Promociones</a>
          <a class="navbar-brand" href="./estadisticas">Estadisticas</a>
          <button class="navbar-brand btn btn btn-link" type="button" onclick="terminaSesión()">Terminar Sesión</button>
    </div>
  `;
}