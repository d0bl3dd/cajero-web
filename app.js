console.log("KAJERO SUPABASE OK");

const SUPABASE_URL =
    "https://vqesmgngorugxznkamla.supabase.co";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZXNtZ25nb3J1Z3h6bmthbWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTk1MTcsImV4cCI6MjA5MzkzNTUxN30.KoW2iKYr023ExOKbetHqOeEMi88asX09X7kSOBUlJWc";

const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

/* LOGIN */

const btnLogin = document.getElementById("btnLogin");

if (btnLogin) {

    btnLogin.addEventListener("click", async () => {

        const cuenta = document
            .getElementById("cuenta")
            .value
            .trim();

        const pin = document
            .getElementById("pin")
            .value
            .trim();

        const mensaje = document
            .getElementById("mensaje");

        mensaje.innerText = "";

        if (!cuenta || !pin) {
            mensaje.innerText =
                "Completa todos los campos";
            return;
        }

        const { data, error } = await client
            .from("usuarios")
            .select("*")
            .eq("cuenta", cuenta)
            .eq("pin", pin)
            .single();

        console.log(data);
        console.log(error);

        if (error || !data) {

            mensaje.innerText =
                "Cuenta o PIN incorrectos";

            return;
        }

        localStorage.setItem(
            "usuario",
            JSON.stringify(data)
        );

        window.location.href =
            "dashboard.html";
    });
}

/* DASHBOARD */

const usuario = JSON.parse(
    localStorage.getItem("usuario")
);

/* PROTEGER DASHBOARD */

if (
    window.location.pathname.includes("dashboard")
) {

    if (!usuario) {
        window.location.href = "index.html";
    }
}

/* CARGAR DATOS */

window.addEventListener("DOMContentLoaded", () => {

    const nombre = document.getElementById("nombre");
    const saldo = document.getElementById("saldo");

    if (usuario) {

        if (nombre) {
            nombre.innerText =
                usuario.nombre || usuario.cuenta;
        }

        if (saldo) {
            saldo.innerText =
                "$ " + Number(usuario.saldo)
                .toLocaleString();
        }
    }
});

/* LOGOUT */

function logout() {

    localStorage.removeItem("usuario");

    window.location.href = "index.html";
}

/* DEPOSITAR */

async function depositar() {

    const monto = Number(
        document.getElementById("deposito")
        .value
    );

    if (!monto || monto <= 0) {
        alert("Monto inválido");
        return;
    }

    const nuevoSaldo =
        Number(usuario.saldo) + monto;

    const { error } = await client
        .from("usuarios")
        .update({
            saldo: nuevoSaldo
        })
        .eq("id", usuario.id);

    if (error) {
        alert("Error al depositar");
        console.log(error);
        return;
    }

    usuario.saldo = nuevoSaldo;

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    document.getElementById("saldo")
    .innerText =
        "$ " + nuevoSaldo.toLocaleString();

    document.getElementById("deposito")
    .value = "";

    alert("Depósito realizado");
}

/* RETIRAR */

async function retirar() {

    const monto = Number(
        document.getElementById("retiro")
        .value
    );

    if (!monto || monto <= 0) {
        alert("Monto inválido");
        return;
    }

    if (monto > usuario.saldo) {
        alert("Saldo insuficiente");
        return;
    }

    const nuevoSaldo =
        Number(usuario.saldo) - monto;

    const { error } = await client
        .from("usuarios")
        .update({
            saldo: nuevoSaldo
        })
        .eq("id", usuario.id);

    if (error) {
        alert("Error al retirar");
        console.log(error);
        return;
    }

    usuario.saldo = nuevoSaldo;

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    document.getElementById("saldo")
    .innerText =
        "$ " + nuevoSaldo.toLocaleString();

    document.getElementById("retiro")
    .value = "";

    alert("Retiro realizado");
} 