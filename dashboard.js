const usuario =
JSON.parse(
    localStorage.getItem("usuario")
);

if (!usuario) {

    window.location.href =
    "index.html";
}

const nombre =
document.getElementById("nombre");

const cuenta =
document.getElementById("cuenta");

const saldo =
document.getElementById("saldo");

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
    "$ " +
    Number(usuario.saldo)
    .toLocaleString();
}

function actualizarSaldo() {

    saldo.innerText =
    "$ " +
    Number(usuario.saldo)
    .toLocaleString();

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );
}

function depositar() {

    const input =
    document.getElementById("deposito");

    const monto =
    Number(input.value);

    if (
        isNaN(monto) ||
        monto <= 0
    ) {

        alert("Monto inválido");
        return;
    }

    usuario.saldo += monto;

    actualizarSaldo();

    input.value = "";

    alert(
        "Depósito realizado correctamente"
    );
}

function retirar() {

    const input =
    document.getElementById("retiro");

    const monto =
    Number(input.value);

    if (
        isNaN(monto) ||
        monto <= 0
    ) {

        alert("Monto inválido");
        return;
    }

    if (
        monto > usuario.saldo
    ) {

        alert(
            "Saldo insuficiente"
        );

        return;
    }

    usuario.saldo -= monto;

    actualizarSaldo();

    input.value = "";

    alert(
        "Retiro realizado correctamente"
    );
}

const logoutBtn =
document.getElementById("logout");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "usuario"
            );

            window.location.href =
            "index.html";
        }
    );
}