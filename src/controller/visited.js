let date = new Date();
document.getElementById('date').innerHTML = `${date.getDate()}/${(date.getMonth() +1)}/${date.getFullYear()}`;

document.getElementById('register').addEventListener('click', ()=>{
    document.getElementById('infoModal').style.display = 'inherit';
});

document.getElementById('closeButton').addEventListener('click', ()=>{
    document.getElementById('infoModal').style.display = 'none';
});
