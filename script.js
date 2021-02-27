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

//показать все ответы
for(let i=0; i<numOfEl; i++)
{
	console.log(buildAnswer(CollOfIputSeq[i]));
}

//при нажатии на кнопку отправить ответ
function retrieveFormValue(event) {
	event.preventDefault(); //отправлять на сервер не нужно
	valOfseq = form.querySelector('[name="output_sequence"]');

	value = {
		output_sequence: valOfseq.value,
	};

	console.log("v1", value);

	let answer = buildAnswer(inputSeqVal);

	if (valOfseq.value == answer) {
		alert("Correct answer");

		numOfseq++; //при правильном ответе идет другая последовательность
		inputSeq.textContent = CollOfIputSeq[numOfseq];
		inputSeqVal = inputSeq.innerHTML;

		let seqLeft = numOfEl-numOfseq;
		input_sequence.textContent = "Входная последовательность " + "(осталось " + seqLeft + "): ";
		
		let valInputSeq = document.getElementsByClassName("valueOfsequence")[0];
		valInputSeq.value = "";

		if (numOfseq == numOfEl) alert("GOOOOOD!!!!");	//Если все ответы правильны
	}
	else if (checkForm(form)) alert("Incorrect answer! Try it again.");
}
form.addEventListener("submit", retrieveFormValue);

//-------------------------------------------------------------------------------//

//функция построения ответа
function buildAnswer(inputSeqVal) {
  let readyAns = "";
  let state = 1;
  let sumOfinputChar = tbody.children.length - 1;

  //объект, содержаий в себе ключ-значение входного символа и его номера
  let symbolID = {};
  for (let i = 0; i < sumOfinputChar; i++) {
    symbolID[String.fromCharCode(97 + i)] = i + 1;
  }

  //проход по входной последовательности
  for (let i = 0; i < inputSeqVal.length; i++) {
    //читаю значение ячейки
    let val = tbody.children[symbolID[inputSeqVal[i]]].children[state].innerHTML;
    //сохраняю следуюoие состояние
    state = val[0];
    //формирую ответ
    readyAns += val[2];
  }

  return readyAns;
}

//функция проверки формы на корректность 
function checkForm(form){
	let e = 0;
	for (let i = 0; i < form.length - 1; i++) 
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
