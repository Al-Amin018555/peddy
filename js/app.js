const showCategories = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    data.categories.forEach(item => {
        const categoryContainer = document.getElementById('all-categories');
        const div = document.createElement('div');
        div.innerHTML = `<button id="btn-${item.category.toLowerCase()}" onclick="handleClick('${item.category}')" class="btn category-btn btn-xl rounded-xl w-[170px] lg:w-[312px] p-8 lg:p-10 text-xl lg:text-2xl font-bold font-[Inter,sans-serif]"> <img src = ${item.category_icon} class="mr-4" /> ${item.category}</button>`;
        categoryContainer.appendChild(div);
    })
}

const handleClick = (value) => {
    // const catName = category-value;
    // const categoryButton = document.getElementById(`${catName}`);
    // categoryButton.classList.add('bg-red-300')
    // console.log(value)
    const categoryContainer = document.getElementById('all-categories');


    const lowerCaseValue = value.toLowerCase();
    showAllPets(`category/${lowerCaseValue}`)


}

const likedPet = (likePet) => {
    const chosenPet = document.getElementById('chosen-pet');
    const div = document.createElement('div');
    div.classList.add('h-[200px]')
    div.innerHTML = `
    <img class="" src = "${likePet}"/>
    
    `;
    chosenPet.appendChild(div);
}

const loadDetails = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    console.log(data.petData)
    // displayDetails(data.petData);
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = `
    
        <img class="w-full mb-6" src="${data.petData.image}"/>
        <p class="font-[Inter,sans-serif] font-bold text-2xl mb-4"> ${data.petData.pet_name} </p>
        <div class="space-y-4 grid grid-cols-2">
        <div class="flex items-center gap-2">
            <img class="w-[30px] h-[30px]" src="images/breed.jpg"/>
            <p> Breed : ${data.petData.breed} </p>
        </div>
        <div class="flex items-center gap-2">
            <img class="w-[30px] h-[30px]" src="images/birth.jpg"/>
            <p> Birth : ${data.petData.date_of_birth} </p>
        </div>
        <div class="flex items-center gap-2">
            <img class="w-[30px] h-[30px]" src="images/gender.jpg"/>
            <p> Gender : ${data.petData.gender} </p>
        </div>
        <div class="flex items-center gap-2">
            <img class="w-[30px] h-[30px]" src="images/price.jpg"/>
            <p> Price : ${data.petData.price}$ </p>
        </div>
        <div class="flex items-center gap-2">
            <img class="w-[30px] h-[30px]" src="images/vaccinated.jpg"/>
            <p> Vaccinated Status : ${data.petData.vaccinated_status} </p>
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

function removeActiveClass() {
    const buttons = document.getElementsByClassName('category-btn');
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
}

const showAllPets = async (categoryName = 'pets') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/${categoryName}`);
    const data = await res.json();
    removeActiveClass()

    if (categoryName !== 'pets') {
        const slicedCategoryName = categoryName.slice(9);
        const activeBtn = document.getElementById(`btn-${slicedCategoryName}`);
        activeBtn.classList.add('active');
    }

    let currentData;
    categoryName === 'pets' ? currentData = data.pets : currentData = data.data;

    const card = document.getElementById('pet-cards');
    card.innerHTML = "";

    if (currentData.length == 0) {
        card.classList.remove('grid')
        const div = document.createElement('div');
        div.classList.add('space-y-6', 'flex', 'flex-col', 'justify-center', 'text-center');
        div.innerHTML = `
        <img class="w-[150px] mx-auto" src ="images/no-data.jpg"/>
        <h3 class="font-[Inter,sans-serif] text-[#131313] font-bold text-2xl lg:text-3xl"> No Information Available </h3>
        <p class ="text-[rgba(19,19,19,0.7)] w-[200px] mx-auto lg:w-[636px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a. </p>
        
        `;

        card.classList.add('bg-[rgba(19,19,19,0.03)]', 'py-[50px]', 'lg:py-[100px]');
        card.appendChild(div)
        return
    }
    
    card.classList.add('grid');
    card.classList.remove('bg-[rgba(19,19,19,0.03)]', 'py-[50px]', 'lg:py-[100px]');
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
            <h2 class="font-[Inter,sans-serif] font-bold text-[#131313] text-[20px]">${pet.pet_name ? pet.pet_name : 'Not Available'}</h2>
            <div class="space-y-2 mt-2"> 
                <div class="flex gap-2"> 
                <img src="images/breed.jpg"/>
                 <p class="text-[rgba(19,19,19,0.7)]"> Breed: ${pet.breed ? pet.breed : 'Not Available'} </p>
                 </div>
                <div class="flex gap-2"> 
                <img src="images/birth.jpg"/> 
                <p class="text-[rgba(19,19,19,0.7)]"> Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Available'}  </p> 
                </div>
                <div class="flex gap-2"> 
                <img src="images/gender.jpg"/> 
                <p class="text-[rgba(19,19,19,0.7)]"> Gender: ${pet.gender ? pet.gender : 'Not Available'} </p> </div>
                <div class="flex gap-2">
                 <img src="images/price.jpg"/> 
                 <p class="text-[rgba(19,19,19,0.7)]"> Price: ${pet.price ? pet.price : 'Not Available'} </p> </div>
            </div>
            <div class="divider m-0"></div>
            <div class="card-actions flex justify-between">
             <button onclick="likedPet('${pet.image}')" class="btn w-[90px]"><img class="w-5" src="images/likee.png"/></button>
             <button class="btn hover:bg-[#0e79813e] font-bold text-[18px] w-[90px] text-[#0E7A81]">Adopt</button>
             <button onclick="loadDetails('${pet.petId}')" class="btn font-bold text-[18px] w-[90px] text-[#0E7A81]">Details</button>
            </div>
            </div>
            
         </div>
        
        `;
        card.appendChild(div);
    })
}
const viewMoreButton = document.getElementById('viewMoreBtn');
viewMoreButton.addEventListener('click',() =>{
    const adoptSection = document.getElementById('adoptSection');
    if(adoptSection){
        adoptSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});
showCategories()
showAllPets()