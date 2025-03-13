const loadCategory =async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const resData = await res.json();
    showCategory(resData.categories);
}

const showCategory = (categories)=>{
    
    categories.forEach((element)=>{
        
        const categoryContainer = document.getElementById('category-container');

        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="loadPets('${element.category}')" class="btn">${element.category}
        <img class="w-8" src=${element.category_icon}>
        </button>
        `;
        categoryContainer.appendChild(div)
    })
}

const loadPets = async(categoryName)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
    const data = await res.json();
    displayPets(data.data);
};

const displayPets =(pets)=>{
    pets.forEach((pet =>{
        console.log(pet);
        const petContainer = document.getElementById('petContainer');
        const div = document.createElement('div');
        div.innerHTML =`
        <div class="card bg-base-100  shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `;
        petContainer.appendChild(div);
    }))
}
loadPets()
loadCategory();