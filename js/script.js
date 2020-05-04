
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
    mainGrid.querySelectorAll('.card').forEach((card, index) => {
      card.addEventListener('click', () => {
        modal(employData[index]);
        selectedEmployee = index;
      });
    });
  
  };

  function checkStatus(response){
      if (response.ok){return Promise.resolve(response);
  }else{return Promise.reject(newError(response.statusText));
}}

function searchNames() {
    const input = document.querySelector('search');
   let filter = input.value.toUpperCase();
   const cards = document.querySelectorAll('.card');
   const names = document.querySelectorAll('.name');
    
   for (i = 0; i < names.length; i++) {
    let txtValue = names[i].textContent;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}



//=====Modal========



generateEmployeeData(employData);


const modal = employee => {
  const modalContainer = document.querySelector('.modal-container');
  const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language); // Formats date depending on users locale.
  
  modalContainer.innerHTML = `
    <div class="modal">
      <div class="modal-info-container">
         <p class="modal-close">X</p>
        <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first}'s profile picture">
        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="modal-text">${employee.email}</p>
        <p class="modal-text cap">${employee.location.city}</p><hr>
        <p class="modal-text">${employee.phone}</p>
        <p class="modal-text cap">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p>
        <p class="modal-text">Birthday: ${dob}</p>
        <p class="arrows"><span class="arrow-back">&larr;</span>&nbsp;&nbsp;&nbsp;       
        &nbsp;&nbsp;&nbsp; <span class="arrow-forward">&rarr;</span></p> 
      </div>
    </div>
  `;

  modalContainer.style.display = 'block';
  modalContainer.querySelector('.modal-close').addEventListener('click', () => {
    modalContainer.style.display  ="none";
  });
 
  modalContainer.addEventListener('click', (e => {

    let selectedEmployee = 0;
    employData.push(selectedEmployee)
    if(e.target === modalContainer.querySelector('.arrow-forward')){
    modal(employData[selectedEmployee++]);
  }else if (e.target === modalContainer.querySelector('.arrow-back')){
    modal(employData[selectedEmployee--]);
  } else {
    return;
  }
  }));

};