// console.log('phone js connecting')
const loadData = async (searchText='a') =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data;
    displayPhone(phone)
}

const displayPhone = phones => {
    // console.log(phones)

    const btn = document.getElementById('show-all-container');

    if(phones.length > 12){
        btn.classList.remove('hidden');
    }
    else{
        btn.classList.add('hidden');
    }

    phones = phones.slice(0,12);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        // console.log(phone)
        const cardDib = document.createElement('dib');
        cardDib.classList = `card bg-gray-200 w-70 shadow-xl p-4`;
        cardDib.innerHTML = `
            <figure>
                    <img
                    src="${phone.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>${phone.slug}</p>
                    <div class="card-actions justify-end">
                    <button onclick="handlePhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                    </div>
                    </div> `;
            phoneContainer.appendChild(cardDib);
    });
    loderRing(false);
}

    const handleSearch = () => {
        // console.log('clicked')
        loderRing(true);
        const inputField = document.getElementById('inputFiled');
        const inputValur = inputField.value;
        loadData(inputValur);
    }

    // const handleSearch2 = () =>{
    //     loderRing(true);
    //     const inputField2 = document.getElementById('inputFiled2');
    //     const inputValur = inputField2.value;
    //     loadData(inputValur);
    // }

    const handlePhoneDetails = async (id) => {
        // console.log('clicked',id)
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await res.json();
        showPhoneDetails(data)
    }

    const showPhoneDetails =(phone) =>{

        const showDetailContainer = document.getElementById('show-details-container');
        showDetailContainer.innerHTML = `
        <img class="w-50" src="${phone.data.image}" alt="phone"/>
        <h2 class="card-title my-3">${phone.data.name}</h2>
        <p>Storage : ${phone.data.mainFeatures.storage}</p>
        <p>Chipset : ${phone.data.mainFeatures.chipSet}</p>
        <p>Display Size : ${phone.data.mainFeatures.displaySize}</p>
        <p>Available Memony : ${phone.data.mainFeatures.memory}</p>
        `;
        my_modal.showModal()
        console.log(phone.data)
    }

    const loderRing = (isLoading) =>{
        const loder = document.getElementById('loder-container');
        if(isLoading){
            loder.classList.remove('hidden');
        }
        else{
            loder.classList.add('hidden');
        }
    };

loadData()