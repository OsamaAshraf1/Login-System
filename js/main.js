const nameSignUp = document.getElementById('nameSignUp');
const mailSignUp = document.getElementById('mailSignUp');
const passSignUp = document.getElementById('passSignUp');
const btnSignUp = document.getElementById('btnSignUp');


const loginMail = document.getElementById('loginMail');
const loginPass = document.getElementById('loginPass');
const btnLogin = document.getElementById('btnLogin');


let array = [];

if(localStorage.getItem('informationUser') !== null){
  array = JSON.parse(localStorage.getItem('informationUser'));
}
// else {} // فاضيه array او ال data هيرجع ال 

function createUser(){
  let user = {
    name: nameSignUp.value,
    mail: mailSignUp.value,
    pass: passSignUp.value
  };
  array.push(user);
  localStorage.setItem('informationUser', JSON.stringify(array));
  clearForm();
  setTimeout(() =>{
    // window.location.replace('login.html');
    // window.location.assign('login.html');
    window.location.href = 'login.html'
  } ,2000);
};

// Optional Chaning
btnSignUp?.addEventListener('click', function(){
  if(check() && isExist()){
    createUser()
  }
})

function clearForm(){
  nameSignUp.value = null;
  mailSignUp.value = null; 
  passSignUp.value = null;
  
  nameSignUp.classList.remove("is-valid", "is-invalid");
  mailSignUp.classList.remove("is-valid", "is-invalid");
  passSignUp.classList.remove("is-valid", "is-invalid");
}


function validationInputs(element){
  let text = element.value;
  if(text == ""){
    element.classList.remove("is-valid", "is-invalid");
    element.nextElementSibling.classList.replace('d-block', 'd-none'); // مباشرة input العنصر ال بعد ال 
    return false;  // 
  }
  let regux = {
    nameSignUp: /^[A-Z][a-z]{2,6}$/,
    mailSignUp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    passSignUp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  }
  if(regux[element.id].test(text)){
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace('d-block', 'd-none'); // مباشرة input العنصر ال بعد ال 
  }
  else{
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace('d-none', 'd-block'); // مباشرة input العنصر ال بعد ال 
  }
}

document.querySelectorAll('input').forEach((input)=>{
  // console.log(input);
  
  input.addEventListener('input', function(){
    validationInputs(input);
    // isExist(input); 
  })
})

function check(){
  let isValid = true
  if(nameSignUp.value ==="" || mailSignUp.value ==="" || passSignUp.value ===""){
      Swal.fire({
          title: 'Error',
          text: 'Please fill all fields',
          icon: 'error',
      })
      isValid = false
  }
  else {
      document.querySelectorAll('input').forEach((input)=>{
          if(!input.classList.contains('is-valid')){
              isValid = false
          }
      })
  }
  return isValid
}

// solution 2 better
// function check() {
//   if (nameSignUp.value === "" || mailSignUp.value === "" || passSignUp.value === "") {
//     Swal.fire({
//       title: 'Error',
//       text: 'Please fill all fields',
//       icon: 'error',
//     });
//     return false;
//   }

//   for (let input of [nameSignUp, mailSignUp, passSignUp]) {
//     if (!input.classList.contains('is-valid')) {
//       Swal.fire({
//         title: 'Error',
//         text: 'Please correct the invalid fields',
//         icon: 'error',
//       });
//       return false;
//     }
//   }
//   return true;
// }


function isExist() {
  for (let i = 0; i < array.length; i++) {
      if (array[i].mail == mailSignUp.value) {
          Swal.fire({
              title: 'Error',
              text: 'This email is already exist',
              icon: 'error',
          })
          return false
      }
  }
  Swal.fire({
      title: 'Success',
      text: 'You have been registered successfully',
      icon: 'success',
  })
  return true
}


btnLogin?.addEventListener('click' , ()=>{
  let userFound=false
  for (let i = 0; i < array.length; i++) {
      if(array[i]?.mail==loginMail.value && array[i]?.pass==loginPass.value){
          localStorage.setItem('loginUser' ,array[i].name)
          Swal.fire({
              title: 'Success',
              text: 'You have been logged in successfully',
              icon: 'success',
              confirmButtonText: 'Ok',
              timer:2000,
              willClose:()=>{
                  window.location.href = 'welcome.html';
                  // window.location.replace('welcome.html');
              }
          })
          // or:
          // .then(()=>{
          //   window.location.replace('welcome.html')
          // })
          userFound=true
          break;
      }        
  }
  if(!userFound){
      Swal.fire({
          title: 'Error',
          text: 'Invalid username or password',
          icon: 'error',
          confirmButtonText: 'Ok'
      })
  }
})




function welcaome(){
  document.getElementById("welcome").innerHTML = 'welcome ' + localStorage.getItem('loginUser');
}

window.addEventListener('load', welcaome);


let logOut = document.getElementById('logOut')
logOut?.addEventListener('click' , function(){
    localStorage.removeItem('loginUser');
    window.location.href = 'login.html';
    // window.location.replace('login.html');
})