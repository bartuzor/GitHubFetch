const btnSearch = document.querySelector('.btn');
const btnDelete = document.querySelector('.delete');
const user =  document.querySelector('.users');
const repo = document.querySelector('.repos');

let lastSearchs = [];

localStorage.setItem("lastSearchs",JSON.stringify(lastSearchs));
    

btnSearch.addEventListener('click', ()=>{
    fetchData();
    JSON.parse(localStorage.getItem("lastSearchs")) || [];
    lastSearchs.push(name);
    localStorage.setItem("lastSearchs",JSON.stringify(lastSearchs));
    user.classList.remove('invisible');
    repo.classList.remove('invisible');
});

async function fetchData() {
    try{
        const name = document.querySelector('#name').value;
        const response = await fetch(`https://api.github.com/users/${name}`)
        if(!response.ok){
            throw new Error("Could not fetch resource")
        }
        const data = await response.json();
        console.log(data);
        const logo = document.querySelector('.logo');
        const avatar = data.avatar_url;
        logo.src= avatar;
    }
    catch(error){
        console.error(error);
    }
}


