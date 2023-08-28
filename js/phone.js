const loadPhone = async (searchText=13,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    
    displayPhones(phones,isShowAll);

}

const displayPhones = (phones,isShowAll) => {
    // console.log(phones.length);

   const phoneContainer = document.getElementById('phone-container');
   /* clear phone container cards before adding new cards */
   phoneContainer.innerText=' ';
   const showAllContainer = document.getElementById('show-all-container');
   if(phones.length>12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
   }
   else{
    showAllContainer.classList.add('hidden');
   }
  /*  console.log('Is show all :',isShowAll) */

/* if the phones are more than twelve phones ,Show the 'show more button' */

   /* display only twelve phones if not show all*/
   if(!isShowAll){
    phones = phones.slice(0,12);
   }
   /* console.log(phones.length); */



    phones.forEach(phone => {
         /* console.log(phone);  */
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card padding-4f bg-gray-100 shadow-xl`;

        phoneCard.innerHTML=`
        <figure>
        <img src="${phone.image}" />
        </figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
        /* remove loading spinner  */
        toggleLoadingSpinner(false);

    });
}
/* click handler to the search button */
const handleSearch =(isShowAll)=>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    /* console.log(searchText) */
    loadPhone(searchText,isShowAll)
}

/* loading spinner handling */
const toggleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
   if(isLoading){
    loadingSpinner.classList.remove('hidden')
   }
   else{
    loadingSpinner.classList.add('hidden')
   }
}

/* handle show all  */
const handleShowAll = ()=>{
    handleSearch(true);
}

/* show details for each card */

const handleShowDetail=async (id)=>{
    //  console.log('show details is clicked',id) 
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   const phone = data.data;
   showPhoneDetails(phone)

}

const showPhoneDetails = (phone)=>{
                
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}">
    <p> <span> Storage: </span> ${phone?.mainFeatures?.storage}
    <p> <span> Display Size: </span> ${phone?.mainFeatures?.displaySize}
    <p> <span> ChipSet: </span> ${phone?.mainFeatures?.chipSet}
    <p> <span> Brand: </span> ${phone?.brand}
    <p> <span>GPS: </span> ${phone?.others?.GPS || 'No GPS'}
    <p> <span> Release Date : </span> ${phone?.releaseDate}
    
       

    `



    /* show the modal */
    console.log(phone)
    show_details_modal.showModal()
}





loadPhone();