const form = document.getElementById("form");

//функция проверки формы на корректность 
function checkForm(form){
	var e = 0;
	for (var i = 0; i < form.length - 1; i++) 
	{
		if (!form[i].value.replace(/^\s+|\s+$/g, "")) 
		{
			form[i].style.border = "1px solid red";
			e = 1;
		}
	}
	if (e) 
	{
		alert("Заполните все поля");
		return false;
	} else return true;
}

function retrieveFormValue(event) 
{
	event.preventDefault(); //отправлять на сервер не нужно
	valOfseq = form.querySelector('[name="output_sequence"]');

	value = {
		output_sequence: valOfseq.value,
	};

	console.log("v1", value);

	let answer = "121222";

	if (valOfseq.value == answer) alert("Correct answer");
	else if(checkForm(form)) alert("Incorrect answer");
}
  
form.addEventListener("submit", retrieveFormValue);
