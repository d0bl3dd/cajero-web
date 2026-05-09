const SUPABASE_URL =
"https://bwvxyymzojuiuwmrjfsu.supabase.co";

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dnl4bXl6b2p1aXV3bXJqZnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQxNzksImV4cCI6MjA5Mzg3MDE3OX0.T1URlauIxhysbNY8wd86VEiAYN1v11qC4os2AD-ljZk";

const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const btnLogin =
document.getElementById("btnLogin");

btnLogin.addEventListener("click", async () => {

    const cuenta =
    document.getElementById("cuenta").value;

    const pin =
    document.getElementById("pin").value;

    const mensaje =
    document.getElementById("mensaje");

    mensaje.innerText = "";

    // CONSULTA

    const { data, error } = await client
        .from("usuarios")
        .select("*")
        .eq("cuenta", cuenta)
        .eq("alfiler", pin);

    // ERROR

    if(error){

        console.log(error);

        mensaje.innerText =
        "Error de conexión";

        return;
    }

    // LOGIN CORRECTO

    if(data.length > 0){

        localStorage.setItem(
            "usuario",
            JSON.stringify(data[0])
        );

        window.location.href =
        "dashboard.html";

    }else{

        mensaje.innerText =
        "Cuenta o PIN incorrecto";
    }
});