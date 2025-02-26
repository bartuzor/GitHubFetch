const btnSearch = document.querySelector('.btn');
const btnDelete = document.querySelector('.delete');
const user =  document.querySelector('.users');
const repo = document.querySelector('.repos');
let lastSearchs = [];

localStorage.setItem("lastSearchs",JSON.stringify(lastSearchs));
    

btnSearch.addEventListener('click', ()=>{
    const name = document.querySelector('#name').value;
    fetchData();
    JSON.parse(localStorage.getItem("lastSearchs")) || [];
    lastSearchs.push(name);
    localStorage.setItem("lastSearchs",JSON.stringify(lastSearchs));
    user.classList.remove('invisible');
    repo.classList.remove('invisible');
});

async function fetchData() {
    const name = document.querySelector('#name').value;
    try{
        const response = await fetch(`https://api.github.com/users/${name}`)
        if(!response.ok){
            throw new Error("Could not fetch resource")
        }
        const data = await response.json();
        console.log(data);
        const logo = document.querySelector('.logo');
        logo.src = data.avatar_url;
        const title = document.querySelector('.title');
        title.innerHTML = data.login;
        const box_first = document.querySelector('.follows');
        box_first.innerText = data.followers;
        const box_second = document.querySelector('.following');
        box_second.innerHTML = data.following;
        const box_third = document.querySelector('.repo');
        box_third.innerHTML = data.public_repos;
        const loc = document.querySelector('.i-loc');
        loc.innerHTML = data.location;
        const mail = document.querySelector('.i-mail');
        mail.innerHTML = data.email;
    }
    catch(error){
        console.error(error);
    }
    try{
        const responseRepos = await fetch(`https://api.github.com/users/${name}/repos`)
        if(!responseRepos.ok){
            throw new Error("Couldnt fetch repos data");
        }
        const dataRepos = await responseRepos.json();
        console.log(dataRepos);
    }
    catch(error){
        console.error(error);
    }
}


