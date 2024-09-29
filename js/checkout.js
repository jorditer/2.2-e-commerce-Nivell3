
// Exercise 6
function validate() {
	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");  
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");
	
	// Validate fields entered by the user: name, phone, password, and email
	errorName.classList.remove('d-block');
	errorEmail.classList.remove('d-block');
	errorAddress.classList.remove('d-block');
	errorLastN.classList.remove('d-block');
	errorPassword.classList.remove('d-block');
	errorPhone.classList.remove('d-block');

	if(fName.value == "" || fName.value.length < 3){
		errorName.classList.add('d-block');
		error++;
	} 

	if(fEmail.value == "" || !/^(?=.*@).{3,}$/.test(fEmail.value)){
		errorEmail.classList.add('d-block');
		error++;
	}

	if(fAddress.value == "" || fAddress.value.length < 3){
		errorAddress.classList.add('d-block');
		error++;
	}

	if(fLastN.value == "" || fLastN.value.length < 3){
		errorLastN.classList.add('d-block');
		error++;
	}


	if(fPassword.value == "" || !/(?=.*\d)(?=.*[a-zA-Z]).{3,}/.test(fPassword.value)){
		errorPassword.classList.add('d-block');
		error++;
	}

	if(fPhone.value == "" || !/^\d{9}$/.test(fPhone.value.trim())){
		errorPhone.classList.add('d-block');
		error++;
	}

	if(error>0){
		event.preventDefault();
		alert("Error");
	} else {
		alert("OK");
	}

}
