const loadCategory = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
  const resData = await res.json();
  showCategory(resData.categories);
};

const showCategory = (categories) => {
  const categoryContainer = document.getElementById('category-container');
  if (!categoryContainer) return;

  categories.forEach((element) => {
    const div = document.createElement('div');
    div.innerHTML = `
        <button onclick="loadPets('${element.category}')" class="btn">${element.category}
        <img class="w-8" src="${element.category_icon}">
        </button>
    `;
    categoryContainer.appendChild(div);
  });
};

const loadPets = async (categoryName) => {
  const petContainer = document.getElementById('petContainer');
  const statusMessage = document.getElementById('status');

  petContainer.classList.remove("hidden");
  statusMessage.classList.add("hidden");


  show('spiner')
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
  const data = await res.json();

  if (data.data) {
    displayPets(data.data);
    makeHidden('spiner')

  }

};

const displayPets = (pets) => {
  const petContainer = document.getElementById('petContainer');
  const statusMessage = document.getElementById('status');

  petContainer.innerHTML = '';

  if (pets.length === 0) {
    petContainer.classList.add("hidden"); // Hide pet container
    statusMessage.classList.remove("hidden"); // Show "no data" message
    return;
  } else {
    petContainer.classList.remove("hidden");
    statusMessage.classList.add("hidden");
  }

  pets.forEach((pet) => {
    const div = document.createElement('div');

    div.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
          <figure>
            <img class="object-cover h-[250px]" src="${pet.image}" />
          </figure>
            <div class="card-body">
            <h2 class="card-title">${pet.breed}</h2>
            <p class="text-ellipsis line-clamp-2">${pet.pet_details}</p>
            <div class="card-actions ">
            <button class="btn bg-gray-200 w-full btnAllSelect">Select</button>
            <button onclick="handleDetails('${pet.petId}')" class="btn bg-gray-200 w-full details">Details</button>
            </div>
          </div>
        </div>
    `;
    petContainer.appendChild(div);
  });
  const allSelectBtn = document.getElementsByClassName('btnAllSelect');
  for (const button of allSelectBtn) {
    button.addEventListener('click', (e) => {
      const title = e.target.parentNode.parentNode.childNodes[1].innerText;
      console.log(title);
      const selectedContainer = document.getElementById('selected-container');
      const div = document.createElement('div');
      div.classList.add('flex', 'gap-6', 'justify-center', 'item-center', 'mt-10')
      div.innerHTML = `
     <li class="list-none ">${title}</li>
     <button class="btn">Delete</button>
      `;
      selectedContainer.appendChild(div);
      const prevCount = numberValue('count');
      const sum = prevCount + 1;
      document.getElementById('count').innerText = sum;
    })
  }
};

const makeHidden = (id) => {
  document.getElementById(id).style.display = 'none';
};
const show = (id) => {
  document.getElementById(id).style.display = 'block';
};

const numberValue = (id) => {
  const value = document.getElementById(id).innerText;
  const number = parseInt(value);
  return number;
};

const handleDetails = async(petId) => {
  const petDetails = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
  const res = await petDetails.json();
  console.log(res.petData);
}





loadPets('cat');
loadCategory();
