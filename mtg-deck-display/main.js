// code on start

document.getElementById("textbox").value = "ancient excavation\nanimate dead\nblighted agent\nburied alive\ncareful study\nchart a course\nconsuming aberration\ncorrupted conscience\ncrucible of worlds\ndark deal\ndarksteel myr\ndeep analysis\ndimir infiltrator\ndimir signet\nentomb\nfar // away\nheartstone\nhedron archive\nhinder\nhunted horror\ninvisible stalker\nkefnet the mindful\nlazav, dimir mastermind\nleveler\nlooter il-kor";

// code on start end

// request
// starts on click of search button
// displays cards
async function cardSearch(){
	let div = document.getElementById("div");
	div.innerHTML = "";
	
	let names = document.getElementById("textbox").value.replace(/ \/{2} /g, "-").replace(/ /g, "+").split("\n");
	for(let x = 0; x < names.length; x++){
		let cardName = names[x];
		if(cardName.trim() == "") break;
		let url = "https://api.scryfall.com/cards/named?fuzzy=" + cardName;
		let card = await request(url);
		let str = generateHTML(card)
		div.innerHTML += str;
	}
	
	
}

// request
// input: http request url string
// return: card data object
function request(url){
	return new Promise(resolve => {
		setTimeout(() => {
		
			let http = new XMLHttpRequest();
			http.open("GET", url);
			http.send();
			http.onreadystatechange=e=>{
				if(http.readyState == XMLHttpRequest.DONE){
					resolve(JSON.parse(http.responseText));
				}
			}
	
		},
		100
		);
	})
}

// generateHTML
// input: card data object
// output: html string
function generateHTML(card){
	console.log(card.image_uris.small);
	
	return `
	<div class="card tooltip">
		<img src=${card.image_uris.small}>
			<div class="tooltiptext">
				${card.name}<br>
				${card.mana_cost} <br> 
				${card.type_line} <br> 
				${("card_faces" in card ? card.card_faces[0].oracle_text.replace(/\n/g, "<br>") + "//<br>" + card.card_faces[1].oracle_text.replace(/\n/g, "<br>") : card.oracle_text.replace(/\n/g, "<br>"))}
			</div>
		</img>
	</div>
	`;
	
}

/*
the old version

function cardSearch(){
	div.innerHTML = "";
	let div = document.getElementById("div");
	let names = document.getElementById("textbox").value.replace(/ \/{2} /g, "-").replace(/ /g, "+").split("\n");
	console.log(names);
	let htmlString = "";
	
	let counter = 1;
	names.forEach(
		function(cardName){
			setTimeout(
				function(){
					let Http = new XMLHttpRequest();
					console.log(cardName);
					let url="https://api.scryfall.com/cards/named?fuzzy=" + cardName;
					console.log(url);
					Http.open("GET", url);
					Http.send();
					Http.onreadystatechange=(e)=>{
						if(Http.readyState == XMLHttpRequest.DONE){
							let card = JSON.parse(Http.responseText);
							div.innerHTML += `<div class="card tooltip"><img src=${card.image_uris.small}><div class="tooltiptext">${card.name}<br>${card.mana_cost} <br> ${card.type_line} <br> ${("card_faces" in card ? card.card_faces[0].oracle_text.replace(/\n/g, "<br>") + "//<br>" + card.card_faces[1].oracle_text.replace(/\n/g, "<br>") : card.oracle_text.replace(/\n/g, "<br>"))} ${("power" in card ? `<br>${card.power}&sol;${card.toughness}`: "")}</div></img></div>`;
						}
					}
				},
				200 * counter
			);
			counter += 1;
		}
	)
	
}

*/