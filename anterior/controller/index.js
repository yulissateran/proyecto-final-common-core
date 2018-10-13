
document.getElementById('adm').addEventListener('click', ()=>{
    window.location.href = "view/visited.html";
});

document.getElementById('visits').addEventListener('click', ()=>{
    document.getElementById('container').style.display = 'none';
    document.getElementById('indexContainer').style.display = 'inherit';
});


document.getElementById('checkoutButton').addEventListener('click', ()=>{
    window.location.href = "view/check-out.html";
});


document.getElementById('registerButton').addEventListener('click', () => {
  window.location.href = 'view/check-in.html';
});

