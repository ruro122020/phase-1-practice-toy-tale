let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {

//Event listeners
  document.querySelector('form').addEventListener('submit', handleSubmit)
  
//Event Handlers
function handleSubmit(e){
  e.preventDefault()
  let objToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  addToy(objToy)
}

//DOM render functions
  function renderToy(toy) {
    const cardContainer = document.getElementById('toy-collection')
    //create an h2, img, p, and a button
    const card = document.createElement('div')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const btn = document.createElement('button')
    //set attributes to card img and button
    card.setAttribute('class', 'card')
    btn.setAttribute('class', 'like-btn')
    img.setAttribute('class', 'toy-avatar')
    btn.id = toy.id
    img.src = toy.image
    //add text to h2, p, btn elements
    h2.textContent = toy.name
    p.textContent = `${toy.likes} Likes`
    btn.textContent = 'Like ❤️'
    //append h2, img, p, and btn to card
    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(btn)
    cardContainer.appendChild(card)
    //add likes to the card when like button is clicked
    btn.addEventListener('click',() => {
      toy.likes = toy.likes + 1
      p.textContent = `${toy.likes} Likes`
      editToy(toy)
    })
  }


  //Fetch requests
  function getAllToys() {
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then((toys) => toys.forEach(toy => renderToy(toy)))
  }

  function addToy(objToy) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(objToy)
    })
      .then(res => res.json())
      .then(toy => renderToy(toy))
  }

  function editToy(toyObj){
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify(toyObj)
    })
    .then((res)=>res.json())
    .then(data => console.log('data from editToy function', data))
  }

  //initializ Render
  function init() {
    getAllToys()
  }
  init()
})