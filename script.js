const form = document.getElementById("form");
let inputSeq = document.getElementsByTagName("strong")[0];
let tbody = document.getElementsByTagName("tbody")[0];
let input_sequence = document.getElementsByTagName("span")[0];

//Объект, включающий в себя последовательности
let CollOfIputSeq = {};

//Заполняю объект i случайными последовательностями
for(let i=0; i<4; i++){
	CollOfIputSeq[i] = getRandomSeq();
}

//Количество переменных в объекте
let numOfEl = Object.keys(CollOfIputSeq).length;

let numOfseq=0;	//индекс, ходящий по последовательностям
inputSeq.textContent = CollOfIputSeq[numOfseq];
let inputSeqVal = inputSeq.innerHTML;

//показывает сколько всего будет последовательностей
input_sequence.textContent = "Входная последовательность " + "(осталось " + numOfEl + "): ";

let popup1 = document.getElementsByClassName("pop-up1")[0];
let popup2 = document.getElementsByClassName("pop-up2")[0];
let end_button = document.getElementsByClassName("end_button")[0];
let bOk1 = document.getElementById("bOk1");
let bOk2 = document.getElementById("bOk2");

//при нажатии на кнопку отправить ответ
function retrieveFormValue(event) 
{
	event.preventDefault(); //отправлять на сервер не нужно
	valOfseq = form.querySelector('[name="output_sequence"]');

	value = {
		output_sequence: valOfseq.value,
	};

	console.log("v1", value);

	let answer = buildAnswer(inputSeqVal);

	if (valOfseq.value == answer) 
	{
		//alert("Correct answer");
		popup1.style.display = "block";

		numOfseq++; //при правильном ответе идет другая последовательность
		inputSeq.textContent = CollOfIputSeq[numOfseq];
		inputSeqVal = inputSeq.innerHTML;

		//количество элементов - номер последовательности
		let seqLeft = numOfEl-numOfseq;
		if(seqLeft>0){
			input_sequence.textContent = "Входная последовательность " + "(осталось " + seqLeft + "): ";
		} else{
			input_sequence.textContent = "Входная последовательность: ";
		}

		let valInputSeq = document.getElementsByClassName("valueOfsequence")[0];
		valInputSeq.value = "";

		if (numOfseq == numOfEl) alert("GOOD!");	//Если все ответы правильны
	}
	else if (checkForm(form)) popup2.style.display = "block";
	//alert("Incorrect answer! Try it again.");
}
form.addEventListener("submit", retrieveFormValue);
bOk1.onclick = function(){popup1.style.display = "none";}
bOk2.onclick = function(){popup2.style.display = "none";}


//-------------------------------------------------------------------------------//

//функция построения ответа
function buildAnswer(inputSeqVal) {
	let readyAns = "";
	let state = 1;
	let sumOfinputChar = tbody.children.length - 1;

	//объект, содержащий в себе ключ-значение входного символа и его номера
	let symbolID = {};
	for (let i = 0; i < sumOfinputChar; i++) {
		symbolID[String.fromCharCode(97 + i)] = i + 1;
	}

	//проход по входной последовательности
	for (let i = 0; i < inputSeqVal.length; i++) {
		//читаю значение ячейки
		let val = tbody.children[symbolID[inputSeqVal[i]]].children[state].innerHTML;
		//сохраняю следующие состояние
		state = val[0];
		//формирую ответ
		readyAns += val[2];
	}

	return readyAns;
}

//функция проверки формы на корректность 
function checkForm(form){
	let e = 0;
	let valInputSeq = document.getElementsByClassName("valueOfsequence")[0];
	for (let i = 0; i < form.length - 1; i++) 
	{
		valInputSeq.style.border = "1px dashed grey";
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

//Функция, получающая случайную последовательность случайной длины
function getRandomSeq(){
	let test = "";
	let randInd = getRandomIntInclusive(5,7);
	for(let i=0; i<randInd; i++){
		test += String.fromCharCode(97 + getRandomIntInclusive(0, tbody.children.length-2))
	}
	return test;
}

//возвращает рандомное число от min до max
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
