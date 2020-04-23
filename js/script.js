
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
      .then(res => res.json())
      .then(generateEmployeeData)
      .catch(error => console.log('Looks like there is a problem', error))
      
  

  //Helper Function

  function generateEmployeeData(EmployData){
      let employeeHTML= '';
    employData.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
      employeeHTML = `
      <div class='card' data-index="${index}">
      <img class='photo' src='${picture}>
      <div class="main-info">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
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