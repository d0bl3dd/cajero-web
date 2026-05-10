console.log("SUPABASE LOGIN OK");

const SUPABASE_URL =
    "https://vqesmgngorugxznkamla.supabase.co";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZXNtZ25nb3J1Z3h6bmthbWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTk1MTcsImV4cCI6MjA5MzkzNTUxN30.KoW2iKYr023ExOKbetHqOeEMi88asX09X7kSOBUlJWc";

const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

document
.getElementById("btnLogin")
.addEventListener("click", async () => {

    const cuenta =
        document.getElementById("cuenta")
        .value
        .trim();

    const pin =
        document.getElementById("pin")
        .value
        .trim();

    const mensaje =
        document.getElementById("mensaje");

    if (!cuenta || !pin) {
        mensaje.innerText =
            "Completa todos los campos";
        return;
    }

    const { data, error } = await client
        .from("usuarios")
        .select("*");

    console.log(data);
    console.log(error);

    if (error) {
        mensaje.innerText =
            "Error conectando con Supabase";

        console.error(error);

        return;
    }

    const user = data.find(
        u =>
        u.cuenta === cuenta &&
        u.pin === pin
    );

    if (!user) {
        mensaje.innerText =
            "Cuenta o PIN incorrectos";

        return;
    }

    localStorage.setItem(
        "usuario",
        JSON.stringify(user)
    );

    window.location.href =
        "dashboard.html";
}); 