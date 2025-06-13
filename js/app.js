const showCategories = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    data.categories.forEach(item => {
        const categoryContainer = document.getElementById('all-categories');
        const div = document.createElement('div');
        div.innerHTML = `<button onclick="handleClick('${item.category}')" class="btn btn-xl rounded-xl w-[170px] lg:w-[312px] p-8 lg:p-10 text-xl lg:text-2xl font-bold font-[Inter,sans-serif]"> <img src = ${item.category_icon} class="mr-4" /> ${item.category}</button>`;
        categoryContainer.appendChild(div);
    })
}

const handleClick = (value) =>{
    // console.log(value)
    const lowerCaseValue = value.toLowerCase();
    showAllPets(`category/${lowerCaseValue}`)

   
}

const adoption = (adoptedPet) => {
    const chosenPet = document.getElementById('chosen-pet');
    const div = document.createElement('div');
    div.classList.add('h-[200px]')
    div.innerHTML = `
    <img class="" src = "${adoptedPet}"/>
    
    `;
    chosenPet.appendChild(div);
}

const loadDetails = async(petId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    console.log(data.petData)
    // displayDetails(data.petData);
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = `
    
        <img class="w-full mb-6" src="${data.petData.image}"/>
        <p class="font-[Inter,sans-serif] font-bold text-2xl mb-4"> ${data.petData.pet_name} </p>
        <div class="space-y-4 grid grid-cols-2">
        <div class="flex gap-2">
            <img src="images/breed.jpg"/>
            <p> Breed : ${data.petData.breed} </p>
        </div>
        <div class="flex gap-2">
            <img src="images/birth.jpg"/>
            <p> Birth : ${data.petData.date_of_birth} </p>
        </div>
        <div class="flex gap-2">
            <img src="images/gender.jpg"/>
            <p> Gender : ${data.petData.gender} </p>
        </div>
        <div class="flex gap-2">
            <img src="images/price.jpg"/>
            <p> Price : ${data.petData.price} </p>
        </div>
        <div class="flex gap-2">
            <img src="images/vaccinated.jpg"/>
            <p> Price : ${data.petData.vaccinated_status} </p>
        </div>
        </div>
        <div class="divider"></div>
        <div>
            <p class="font-[Inter,sans-serif] font-semibold"> Details Information </p>
            <p class="font-[Inter,sans-serif] text-[rgba(19,19,19,0.7)]"> ${data.petData.pet_details} </p>
        </div>
        
   
    `;
   
    document.getElementById('customModal').showModal()

}

// const displayDetails = (pet) => {
//     console.log(pet)
//     const detailsContainer = document.getElementById('modal-content');
//     detailsContainer.innerHTML = `
    
//         <img class="w-full" src="${pet.image}"/>
   
//     `;
   
//     document.getElementById('customModal').showModal()
// }

const showAllPets = async (categoryName = 'pets' ) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/${categoryName}`);
    const data = await res.json();
    // console.log(categoryName)
    let currentData;
    categoryName === 'pets' ? currentData = data.pets : currentData = data.data;
    const card = document.getElementById('pet-cards');
    card.innerHTML = "";
    currentData.forEach(pet => {
        const card = document.getElementById('pet-cards');
        const div = document.createElement('div');
        div.innerHTML = `
             <div class="card bg-base-100 shadow-sm p-5">
             <figure>
                <img
                 src="${pet.image}" class="rounded-lg" />
             </figure>
            <div class="card-body p-0 mt-6">
            <h2 class="font-[Inter,sans-serif] font-bold text-[#131313] text-[20px]">${pet.pet_name}</h2>
            <div class="space-y-2 mt-2"> 
                <div class="flex gap-2"> 
                <img src="images/breed.jpg"/>
                 <p class="text-[rgba(19,19,19,0.7)]"> Breed: ${pet.breed} </p>
                 </div>
                <div class="flex gap-2"> 
                <img src="images/birth.jpg"/> 
                <p class="text-[rgba(19,19,19,0.7)]"> Birth: ${pet.date_of_birth}  </p> 
                </div>
                <div class="flex gap-2"> 
                <img src="images/gender.jpg"/> 
                <p class="text-[rgba(19,19,19,0.7)]"> Gender: ${pet.gender} </p> </div>
                <div class="flex gap-2">
                 <img src="images/price.jpg"/> 
                 <p class="text-[rgba(19,19,19,0.7)]"> Price: ${pet.price} </p> </div>
            </div>
            <div class="divider m-0"></div>
            <div class="card-actions flex justify-between">
             <button class="btn w-[90px]"><img class="w-5" src="images/likee.png"/></button>
             <button onclick="adoption('${pet.image}')" class="btn font-bold text-[18px] w-[90px] text-[#0E7A81]">Adopt</button>
             <button onclick="loadDetails('${pet.petId}')" class="btn font-bold text-[18px] w-[90px] text-[#0E7A81]">Details</button>
            </div>
            </div>
            
         </div>
        
        `;
        card.appendChild(div);
    })
}

showCategories()
showAllPets()