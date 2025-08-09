document.getElementById('y').textContent = new Date().getFullYear();
document.getElementById('cta').addEventListener('click', ()=> {
  document.getElementById('kontakt').scrollIntoView({behavior:'smooth'});
});
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  alert(`Danke, ${data.name}! Wir melden uns zeitnah unter ${data.email}.`);
  e.target.reset();
});
