//TODO add game class and move these in
function addGameCellListener(doc){
	let gameCells = doc.getElementsByClassName("game__cell");
	console.log("gamecells: ",gameCells.length);
	for(let i=0;i<gameCells.length;i++){
		gameCells[i].addEventListener("click", ()=>writeMark(gameCells[i]));
	}
	function writeMark(element,mark){
		element.innerHTML='<svg version="1.1" xmlns="http://www.w3.org/2000/svg">'+
	        '<circle cx="50" cy="50" r="40" stroke="#fff" fill="transparent" stroke-width="3"/>'+
	      '</svg>';
	}
}

window.onload = function main() {
	addGameCellListener(document);
}