const BWL_KEY = "BWL";

function loadJson() {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(e) {
		if (this.readyState == 4 && this.status == 200) {
			process(this.response);
		}
	}
	xhr.open('GET', 'https://ktlosloot.github.io/data/KTLOSBWLLoot.json');
	xhr.send();
}

loadJson();

function process(data) {
	renderBWL(data[BWL_KEY]);
}

function renderBWL(bwlMap) {
	var bwlSection = document.createElement("table");
	bwlSection.innerText = "Black Wing Lair";

	for (var boss in bwlMap) {
		let bossRow = document.createElement("tr");
		let bossTd = document.createElement("td");
		bossTd.innerText = boss;
		bossTd.classList.add("boss-header");
		bossRow.appendChild(bossTd);
		bwlSection.appendChild(bossRow);

		let bossItems = document.createElement("td");


		bossRow.appendChild(bossItems);
		let bossTable = document.createElement("table");
		bossTable.classList.add("boss-table");
		bossItems.appendChild(bossTable);

		for (var item in bwlMap[boss]) {
			let itemTr = document.createElement("tr");
			let itemHeader = document.createElement("td");
			itemHeader.classList.add("item-header");

			itemHeader.innerText = item + " (GP: " + bwlMap[boss][item]["gp"] + ") ";
			let itemAnchor = document.createElement('a');  
			itemHeader.appendChild(itemAnchor);
			itemAnchor.href = "#";
			// TODO: set appropriate item nums from wowhead.
			itemAnchor.setAttribute("data-wowhead","item=19395");

			bossTable.appendChild(itemTr);
			itemTr.appendChild(itemHeader);
			for (var prioIndex in bwlMap[boss][item]["prio"]) {
				let prio = bwlMap[boss][item]["prio"][prioIndex];
				let prioTd = document.createElement("td");
				prioTd.innerText = prio;
				itemTr.appendChild(prioTd);
			}
		}
	}

	const wrapper = document.querySelector(".wrapper");
	wrapper.appendChild(bwlSection);
}