console.log("LOGIN JS CARGADO");

const SUPABASE_URL = "https://bwvyxmyzojuiuwmrjfsu.supabase.co";
const SUPABASE_KEY = "TU_ANON_KEY_REAL";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById("btnLogin").addEventListener("click", async () => {

    const cuenta = document.getElementById("cuenta").value.trim();
    const pin = document.getElementById("pin").value.trim();
    const mensaje = document.getElementById("mensaje");

    mensaje.innerText = "";

    // 🔥 IMPORTANTE: traer todo sin filtros
    const { data, error } = await client
        .from("usuarios")
        .select("*");

    console.log("DATA COMPLETA:", data);
    console.log("ERROR:", error);

    if (error) {
        mensaje.innerText = "Error de conexión con Supabase";
        return;
    }

    // 🔥 filtrado local (evita 401 completamente)
    const user = data.find(u =>
        String(u.cuenta) === String(cuenta) &&
        String(u.pin) === String(pin)
    );

    if (!user) {
        mensaje.innerText = "Cuenta o PIN incorrecto";
        return;
    }

    localStorage.setItem("usuario", JSON.stringify(user));

    window.location.href = "dashboard.html";
});