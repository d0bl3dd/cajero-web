console.log("VERSION NUEVA REAL");

const SUPABASE_URL =
"https://bwvyxmyzojuiuwmrjfsu.supabase.co";

const SUPABASE_KEY =
"TU_SUPABASE_KEY";

const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const btnLogin =
document.getElementById("btnLogin");

btnLogin.addEventListener("click", async () => {

    const cuenta =
    document.getElementById("cuenta").value.trim();

    const pin =
    document.getElementById("pin").value.trim();

    const mensaje =
    document.getElementById("mensaje");

    mensaje.innerText = "";

    try {

        const { data, error } = await client
            .from("usuarios")
            .select("*")
            .eq("cuenta", cuenta)
            .eq("pin", pin);

        console.log(data);
        console.log(error);

        if(error){

            mensaje.innerText =
            "Error de conexión";

            return;
        }

        if(data.length > 0){

            // GUARDAR SESIÓN

            localStorage.setItem(
                "usuario",
                JSON.stringify(data[0])
            );

            // REDIRECCIÓN

            window.location.href =
            "dashboard.html";

        }else{

            mensaje.innerText =
            "Cuenta o PIN incorrecto";
        }

    } catch(err){

        console.log(err);

        mensaje.innerText =
        "Error inesperado";
    }

});