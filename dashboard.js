console.log("DASHBOARD OK");

const usuario =
JSON.parse(localStorage.getItem("usuario"));

console.log("USUARIO:");
console.log(usuario);

// VALIDACIÓN

if(!usuario){

    alert("No hay sesión iniciada");

    window.location.href =
    "index.html";
}

// ELEMENTOS

const bienvenida =
document.getElementById("bienvenida");

const numeroCuenta =
document.getElementById("numeroCuenta");

const saldo =
document.getElementById("saldo");

// RENDER

bienvenida.innerText =
`Hola, ${usuario.nombre || "Usuario"}`;

numeroCuenta.innerText =
usuario.cuenta || "Sin cuenta";

saldo.innerText =
"$ " + Number(usuario.saldo || 0)
.toLocaleString();

// LOGOUT

const cerrarSesion =
document.getElementById("cerrarSesion");

cerrarSesion.addEventListener("click", () => {

    localStorage.removeItem("usuario");

    window.location.href =
    "index.html";
});