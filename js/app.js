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

const showAllPets = async (categoryName = 'pets' ) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/${categoryName}`);
    const data = await res.json();
    // console.log(categoryName)
    let currentData;
    categoryName === 'pets' ? currentData = data.pets : currentData = data.data;
    // console.log(currentData.length)
    // if(currentData.length <= 0){
    //     const card = document.getElementById('pet-cards');
    //     const div = document.createElement('div');
    //     div.innerHTML = `
    //      <h1 class="border-2 text-7xl"> hello </h1>
    //     `;
    //     card.appendChild(div);
    //     return;
        
    // }
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
             <button class="btn font-bold text-[18px] w-[90px] text-[#0E7A81]">Details</button>
            </div>
            </div>
            
         </div>
        
        `;
        card.appendChild(div);
    })
}

showCategories()
showAllPets()