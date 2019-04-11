let toroll = [0,0,0,0,0,0];
// [boost, ability, proficiency, setback, difficulty, challenge]
let savedroll = [0,3,0,0,1,0];
let rawresult = "0";
let result = "0";
let logcounter = 0;

function test(){
	alert("test is tested");
}
function reset(){
	toroll = [0,0,0,0,0,0];
	update();
}
function boost(){
	toroll[0] = toroll[0]+1;
	update();
}
function ability(){
	toroll[1] = toroll[1]+1;
	update();
}
function proficiency(){
	toroll[2] = toroll[2]+1;
	update();
}
function setback(){
	toroll[3] = toroll[3]+1;
	update();
}
function difficulty(){
	toroll[4] = toroll[4]+1;
	update();
}
function challenge(){
	toroll[5] = toroll[5]+1;
	update();
}
function roll(){
	let bstring = "roll_boost()+";
	let astring = "roll_ability()+";
	let pstring = "roll_proficiency()+";
	let sstring = "roll_setback()+";
	let dstring = "roll_difficulty()+";
	let cstring = "roll_challenge()+";
	let rollstring = bstring.repeat(toroll[0])+astring.repeat(toroll[1])+pstring.repeat(toroll[2])+sstring.repeat(toroll[3])+dstring.repeat(toroll[4])+cstring.repeat(toroll[5]);
	rollstring = rollstring.slice(0,-1)
	rawresult = eval(rollstring);
	successes = rawresult.split("+").length - 1;
	failures = rawresult.split("-").length - 1;
	advantages = rawresult.split("A").length - 1;
	threats = rawresult.split("B").length - 1;
	triumphs = rawresult.split("T").length - 1;
	despairs = rawresult.split("D").length - 1;
	result = [successes-failures, advantages-threats, triumphs-despairs];

	document.getElementById("log").innerHTML = "<b>" + logcounter + "</b>: " + toroll + " // <b>" + result + " </b><br>" + document.getElementById("log").innerHTML ;
	
	logcounter = logcounter + 1;
	
	update();
	function roll_boost(){
		let val = rolldie(6);
		switch(val){
			case 1:
				return " ";
			case 2:
				return " ";
			case 3:
				return "+";
			case 4:
				return "+A";
			case 5:
				return "AA";
			case 6:
				return "A";
		}
	}
	function roll_ability(){
		let val = rolldie(8);
		switch(val){
			case 1:
				return " ";
			case 2:
				return "+";
			case 3:
				return "+";
			case 4:
				return "++";
			case 5:
				return "A";
			case 6:
				return "A";
			case 7:
				return "+A";
			case 8:
				return "AA";
		}
	}
	function roll_proficiency(){
		let val = rolldie(12);
		switch(val){
			case 1:
				return " ";
			case 2:
				return "+";
			case 3:
				return "+";
			case 4:
				return "++";
			case 5:
				return "++";
			case 6:
				return "A";
			case 7:
				return "+A";
			case 8:
				return "+A";
			case 9:
				return "+A";
			case 10:
				return "AA";
			case 11:
				return "AA";
			case 12:
				return "T";
		}
	}
	function roll_setback(){
		let val = rolldie(6);
		switch(val){
			case 1:
				return " ";
			case 2:
				return " ";
			case 3:
				return "-";
			case 4:
				return "-";
			case 5:
				return "B";
			case 6:
				return "B";
		}
	}
	function roll_difficulty(){
		let val = rolldie(8);
		switch(val){
			case 1:
				return " ";
			case 2:
				return "-";
			case 3:
				return "--";
			case 4:
				return "B";
			case 5:
				return "B";
			case 6:
				return "B";
			case 7:
				return "BB";
			case 8:
				return "-B";
		}
	}
	function roll_challenge(){
		let val = rolldie(12);
		switch(val){
			case 1:
				return " ";
			case 2:
				return "-";
			case 3:
				return "-";
			case 4:
				return "--";
			case 5:
				return "--";
			case 6:
				return "B";
			case 7:
				return "B";
			case 8:
				return "-B";
			case 9:
				return "-B";
			case 10:
				return "BB";
			case 11:
				return "BB";
			case 12:
				return "D";
		}
	}
}
function save(){
	savedroll = toroll.slice();
	update();
}
function load(){
	toroll = savedroll.slice();
	update();
}
function rolldie(ix){
	return Math.floor(Math.random()*ix)+1;
}
function update(){
	document.getElementById("display1").innerHTML=toroll;
	document.getElementById("display2").innerHTML=rawresult;
	document.getElementById("display3").innerHTML=result;
	document.getElementById("display4").innerHTML=savedroll;
}

update()