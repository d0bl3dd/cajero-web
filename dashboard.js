const usuario = JSON.parse(
    localStorage.getItem("usuario")
);

if (!usuario) {
    window.location.href = "index.html";
}

const nombre = document.getElementById("nombre");
const cuenta = document.getElementById("cuenta");
const saldo = document.getElementById("saldo");

if (nombre) {
    nombre.innerText =
        usuario.nombre || "Usuario";
}

if (cuenta) {
    cuenta.innerText =
        usuario.cuenta || "----";
}

if (saldo) {
    saldo.innerText =
        "$ " + Number(usuario.saldo)
        .toLocaleString();
}

function logout() {

    localStorage.removeItem("usuario");

    window.location.href = "index.html";
}