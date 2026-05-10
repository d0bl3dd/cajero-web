console.log("SUPABASE LOGIN");

const SUPABASE_URL =
"https://vqesmgngorugxznkamla.supabase.co";

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZXNtZ25nb3J1Z3h6bmthbWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTk1MTcsImV4cCI6MjA5MzkzNTUxN30.KoW2iKYr023ExOKbetHqOeEMi88asX09X7kSOBUlJWc";

const { createClient } = supabase;

const client = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

document
.getElementById("btnLogin")
.addEventListener("click", async () => {

    const cuenta =
    document
    .getElementById("cuenta")
    .value
    .trim();

    const pin =
    document
    .getElementById("pin")
    .value
    .trim();

    const mensaje =
    document.getElementById("mensaje");

    mensaje.innerText = "Conectando...";

    try {

        const { data, error } =
        await client
        .from("usuarios")
        .select("*");

        console.log(data);
        console.log(error);

        if (error) {

            mensaje.innerText =
            error.message;

            return;
        }

        const user = data.find(u =>

            String(u.cuenta) === cuenta

            &&

            String(u.pin) === pin
        );

        if (!user) {

            mensaje.innerText =
            "Cuenta o PIN incorrecto";

            return;
        }

        localStorage.setItem(
            "usuario",
            JSON.stringify(user)
        );

        window.location.href =
        "dashboard.html";

    } catch(err) {

        console.log(err);

        mensaje.innerText =
        "Error real: " + err.message;
    }
});