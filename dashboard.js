const SUPABASE_URL =
"https://bwvyxmyzojuiuwmrjfsu.supabase.co";

const SUPABASE_KEY =
"TU_KEY";

const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// SESIÓN

const usuario =
JSON.parse(localStorage.getItem("usuario"));

if(!usuario){

    window.location.href = "index.html";
}

// UI

document.getElementById("bienvenida")
.innerText =
`Hola, ${usuario.nombre}`;

document.getElementById("numeroCuenta")
.innerText =
usuario.cuenta;

document.getElementById("saldo")
.innerText =
"$ " + Number(usuario.saldo).toLocaleString();

// LOGOUT

document
.getElementById("cerrarSesion")
.addEventListener("click", () => {

    localStorage.removeItem("usuario");

    window.location.href =
    "index.html";
});

// RETIRO

const btnRetirar =
document.getElementById("btnRetirar");

btnRetirar.addEventListener("click", async () => {

    const monto =
    Number(
        document.getElementById("montoRetiro").value
    );

    if(monto <= 0){

        alert("Monto inválido");
        return;
    }

    if(monto > usuario.saldo){

        alert("Saldo insuficiente");
        return;
    }

    const nuevoSaldo =
    usuario.saldo - monto;

    // UPDATE SALDO

    const { error } = await client
        .from("usuarios")
        .update({
            saldo: nuevoSaldo
        })
        .eq("cuenta", usuario.cuenta);

    if(error){

        console.log(error);

        alert("Error al retirar");

        return;
    }

    // INSERT MOVIMIENTO

    await client
        .from("movimientos")
        .insert({
            cuenta: usuario.cuenta,
            tipo: "Retiro",
            monto: monto
        });

    usuario.saldo = nuevoSaldo;

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    document.getElementById("saldo")
    .innerText =
    "$ " + Number(usuario.saldo).toLocaleString();

    document.getElementById("montoRetiro")
    .value = "";

    cargarMovimientos();

    alert("Retiro exitoso");
});

// HISTORIAL

async function cargarMovimientos(){

    const { data } = await client
        .from("movimientos")
        .select("*")
        .eq("cuenta", usuario.cuenta)
        .order("fecha", {
            ascending: false
        });

    const historial =
    document.getElementById("historial");

    historial.innerHTML = "";

    document.getElementById(
        "cantidadMovimientos"
    ).innerText = data.length;

    data.forEach(mov => {

        historial.innerHTML += `

        <div class="bg-slate-900 rounded-2xl p-5 border border-white/5">

            <div class="flex justify-between items-center">

                <div>

                    <h3 class="text-white font-bold">
                        ${mov.tipo}
                    </h3>

                    <p class="text-slate-400 text-sm">
                        ${new Date(mov.fecha)
                            .toLocaleString()}
                    </p>

                </div>

                <h2 class="text-red-400 font-black text-xl">
                    - $${Number(mov.monto)
                        .toLocaleString()}
                </h2>

            </div>

        </div>
        `;
    });
}

cargarMovimientos();