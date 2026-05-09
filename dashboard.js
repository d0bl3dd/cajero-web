console.log("DASHBOARD CARGADO");

const usuario = JSON.parse(localStorage.getItem("usuario"));

console.log("USUARIO:", usuario);

if (!usuario) {
    window.location.href = "index.html";
}

document.getElementById("bienvenida").innerText = `Hola, ${usuario.nombre}`;
document.getElementById("numeroCuenta").innerText = usuario.cuenta;
document.getElementById("saldo").innerText = "$ " + Number(usuario.saldo).toLocaleString();

document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
});