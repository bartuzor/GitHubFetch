const btnSearch = document.querySelector('.search');
const btnDelete = document.querySelector('.delete');
const  a =  document.querySelector('.users');
const repo = document.querySelector('.repos');
const alert = document.querySelector('.alert');
const last = document.querySelector('.last');
const lastList = document.querySelector('.list');
let lastSearchs = JSON.parse(localStorage.getItem("lastSearchs")) || [];

localStorage.setItem("lastSearchs",JSON.stringify(lastSearchs));
    



loadSearchs();
btnSearch.addEventListener('click', ()=>{
    const name = document.querySelector('#name').value;
    if(name.length >= 3){
    alert.classList.add('invisible');
    fetchData(document.querySelector('#name').value);
    JSON.parse(localStorage.getItem("lastSearchs")) || [];
    if(!lastSearchs.includes(name)){
    lastSearchs.push(name);
    localStorage.setItem("lastSearchs",JSON.stringify(lastSearchs));
    loadSearchs();
    }
    a.classList.remove('invisible');
    repo.classList.remove('invisible');
    }
    else{
        alert.classList.remove('invisible');
    }

});
btnDelete.addEventListener('click',()=>{
    lastSearchs = [];
    localStorage.removeItem("lastSearchs");
    lastList.innerHTML="";
    last.classList.remove('invisible');
    lastList.classList.add('invisible');
})


function loadSearchs(){
    if(lastSearchs.length>0){
        last.classList.add('invisible');
        lastList.classList.remove('invisible');
    }
    lastList.innerHTML="";
    lastSearchs.forEach(user=>{
        
        lastListElement = document.createElement('div');
        lastListElement.classList.add('row');
        const lastListLink = document.createElement('a');
        lastListLink.innerText=user;
        lastListLink.href="#";
        lastListLink.addEventListener('click',()=>{
            fetchData(user);
            a.classList.remove('invisible');
            repo.classList.remove('invisible');
        });
        lastListElement.appendChild(lastListLink);
        lastList.appendChild(lastListElement);
    })
}

function updateUser(data){
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
        last.classList.add('invisible');
}
function updateRepos(dataRepos){
    const repos =document.querySelector('.list-repos');
    repos.innerHTML ="";
    dataRepos.forEach(repo => {
        listitem = document.createElement('div');
        listitem.classList.add('row');
        listitem.innerText = repo.name;
        const container = document.createElement('div');
        container.classList.add('box-row');
        const box1 = document.createElement('div');
        box1.classList.add('box','first');
        box1.innerText ="Starlar: " +repo.watchers_count;
        container.appendChild(box1);
        const box2 = document.createElement('div');
        box2.classList.add('box','second');
        box2.innerText="Forklar: " + repo.forks_count;
        container.appendChild(box2);
        listitem.appendChild(container);
        repos.appendChild(listitem);})    
}

async function fetchData(user) {
    const last = document.querySelector('.last');
    try{
        const response = await fetch(`https://api.github.com/users/${user}`)
        if(!response.ok){
            throw new Error("Could not fetch resource")
        }
        const data = await response.json();
        updateUser(data);
                
    }
    catch(error){
        console.error(error);
    }
    try{
        const responseRepos = await fetch(`https://api.github.com/users/${user}/repos`)
        if(!responseRepos.ok){
            throw new Error("Couldnt fetch repos data");
        }
        const dataRepos = await responseRepos.json(); 
        updateRepos(dataRepos);       
    }
    catch(error){
        console.error(error);
    }
}