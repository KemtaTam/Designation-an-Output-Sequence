const form = document.getElementById("form");
let inputSeq = document.getElementsByTagName("strong")[0].innerHTML;
let tbody = document.getElementsByTagName("tbody")[0];

function buildAnswer()
{
	let readyAns="";
	let state = 1;
	let sumOfinputChar = tbody.children.length-1;

	//объект, содержаий в себе ключ-значение входного символа и его номера
	let symbolID = {};
	for(j=0; j<sumOfinputChar; j++){
		symbolID[String.fromCharCode(97+j)] = j+1;
	}

	//проход по входной последовательности
	for(i=0; i<inputSeq.length; i++)
	{
		//читаю значение ячейки
		let val = tbody.children[symbolID[inputSeq[i]]].children[state].innerHTML;
		//сохраняю следуюoие состояние
		state = val[0];
		//формирую ответ
		readyAns += val[2];
	}

	return readyAns;
}
console.log(buildAnswer()); 

//при нажатии на кнопку отправить ответ
function retrieveFormValue(event) 
{
	event.preventDefault(); //отправлять на сервер не нужно
	valOfseq = form.querySelector('[name="output_sequence"]');

	value = {
		output_sequence: valOfseq.value,
	};

	console.log("v1", value);

	let answer = buildAnswer();
	
	if (valOfseq.value == answer) alert("Correct answer");
	else if(checkForm(form)) alert("Incorrect answer");
}
form.addEventListener("submit", retrieveFormValue);



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
