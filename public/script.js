const API_URL = "https://DEIN-RENDER-API.onrender.com/contact"; // später Render-URL eintragen

document.getElementById('y').textContent = new Date().getFullYear();

document.getElementById('cta').addEventListener('click', ()=> {
  document.getElementById('kontakt').scrollIntoView({behavior:'smooth'});
});

document.getElementById('contactForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());

  try {
    const r = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });
    const j = await r.json();
    if (j.ok) {
      alert(`Danke, ${data.name}! Wir melden uns zeitnah.`);
      e.target.reset();
    } else {
      alert("Senden fehlgeschlagen. Bitte später erneut.");
    }
  } catch {
    alert("Netzwerkfehler. Bitte später erneut versuchen.");
  }
});
