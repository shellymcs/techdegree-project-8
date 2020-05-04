
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
    searchNames(employData);
  };

  function checkStatus(response){
      if (response.ok){return Promise.resolve(response);
  }else{return Promise.reject(newError(response.statusText));
}}

function searchNames() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementsByClassName('search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.ul.getElementsByTagName('li');
    li.push(card.getElementsByTagName('h2'));
    
     for ( i =0; i< li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = li.textContent || li.innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1){
     li[i].style.display ="";
 }else {
     li[i].style.display = "none";
 }
     }
 }

 searchNames();


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