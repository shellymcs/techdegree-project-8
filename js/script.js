
//$.ajax({
 //   url: 'https://randomuser.me/api/?results=12',
 //   dataType: 'json',
  //  success: function(data) {
 //     console.log(data);
  //  }
 // });
      
  const API ="https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US"
  const mainGrid = document.querySelector('.grid-container');
  const card = document.querySelector('.card');
  let employData =[];
  

  fetch(API)
      .then(checkStatus)
      .then(response => response.json())
      .then(data =>generateEmployeeData(data.results))
      .catch(error => console.log('Looks like there is a problem', error))
      
  

  //Helper Function

  function generateEmployeeData(employData){
    console.dir(employData);
      let employeeHTML= '';
    employData.forEach((employee, index) => {
      employeeHTML += `
      <div class='card' data-index="${index}">
      <img class='photo' src='${employee.picture.large}'>
      <div class="main-info">
      <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
      <p class="email">${employee.email}</p>
      <p class="address">${employee.location.state}</p>
      </div>
     </div>
     `
    });
     mainGrid.innerHTML = employeeHTML;

  };

  function checkStatus(response){
      if (response.ok){return Promise.resolve(response);
  }else{return Promise.reject(newError(response.statusText));
}}

//=====Modal========

const overlay = document.querySelector('.overlay');
const modalCard = document.querySelector('.modal-card');
const modalClose  = document.querySelector('.modal-close');
const modal  = document.querySelector('.modal-container');

card.addEventListener('click', e =>{
  overlay.classList.remove("hidden");
   let modalHTML= '';
  employData.forEach((employee, index) => {
    modalHTML += `
    <div class='modalCard' data-index="${index}">
    <img class='photo' src='${employee.picture.large}'>
    <div class="modal-info">
    <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
    <p class="email">${employee.email}</p>
    <p class="address">${employee.location.state}</p>
    </div>
    <div class="extraInfo">
    <p class="phone">${employee.phone}</p>
    <p class="full-address">${employee.location.street}, ${employee.location.city}, ${employee.location.postcode}</p>
    <p class="dob">Birthday: ${employee.dob.date}</p>
    
    </div>
   </div>
   `
  });

   modal.innerHTML = modalHTML;
});

modalClose.addEventListener('click', e =>{
  overlay.classList.add("hidden");
})