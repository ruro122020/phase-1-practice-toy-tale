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

document.addEventListener('DOMContentLoaded', ()=>{
  function toyCollection (){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then((toys)=>{
      const cardContainer = document.getElementById('toy-collection')
      /*
      <div class="card">
       <h2>Woody</h2>
       <img src="[toy_image_url]" class="toy-avatar" />
       <p>4 Likes</p>
       <button class="like-btn" id="[toy_id]">Like ❤️</button>
      </div>
      */
      toys.forEach((toyObj)=>{
        //create an h2, img, p, and a button
         const card = document.createElement('div')
         const h2 = document.createElement('h2')
         const img = document.createElement('img')
         const p = document.createElement('p')
         const btn = document.createElement('button')
         //set attributes to img and button
         card.setAttribute('class', 'card')
         btn.setAttribute('class', 'like-btn')
         img.setAttribute('class', 'toy-avatar')
         btn.id = toyObj.id
         img.src = toyObj.image
         //add text to h2, p, btn elements
         
         //append h2, img, p, and btn to card
         card.appendChild(h2)
         card.appendChild(img)
         card.appendChild(p)
         card.appendChild(btn)
         cardContainer.appendChild(card)
      })
     

    })
  }
  toyCollection()
})