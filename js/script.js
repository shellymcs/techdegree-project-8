
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
  
      let employeeHTML= '';
    employData.forEach((employee, index) => {
      employeeHTML += `
      <div class='card' data-index="${index}">
      <img class='photo' src='${employee.picture}>
      <div class="main-info">
      <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
      <p class="email">${employee.email}</p>
      <p class="address">${employee.city}</p>
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