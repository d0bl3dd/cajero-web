console.log("LOGIN CARGADO");

const SUPABASE_URL = "https://bwvyxmyzojuiuwmrjfsu.supabase.co";
const SUPABASE_KEY = "sb_publishable_TkQbvH4IyYfXsVVAgFiFcQ_YtEHbQA4";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById("btnLogin").addEventListener("click", async () => {

    const cuenta = document.getElementById("cuenta").value.trim();
    const pin = document.getElementById("pin").value.trim();
    const mensaje = document.getElementById("mensaje");

    mensaje.innerText = "";

    console.log("LOGIN INTENTO:", cuenta, pin);

    const { data, error } = await client
        .from("usuarios")
        .select("*")
        .eq("cuenta", cuenta)
        .eq("pin", pin)
        .single();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error || !data) {
        mensaje.innerText = "Cuenta o PIN incorrecto";
        return;
    }

    localStorage.setItem("usuario", JSON.stringify(data));

    window.location.href = "dashboard.html";
});