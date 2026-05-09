console.log("Dashboard funcionando");

// OBTENER SESIÓN

const usuario =
JSON.parse(localStorage.getItem("usuario"));

console.log(usuario);

// SI NO HAY SESIÓN

if(!usuario){

    window.location.href =
    "index.html";
}

// RENDER

document.getElementById("bienvenida")
.innerText =
`Hola, ${usuario.nombre}`;

document.getElementById("numeroCuenta")
.innerText =
usuario.cuenta;

document.getElementById("saldo")
.innerText =
"$ " + Number(usuario.saldo)
.toLocaleString();

// LOGOUT

document
.getElementById("cerrarSesion")
.addEventListener("click", () => {

    localStorage.removeItem("usuario");

    window.location.href =
    "index.html";
});