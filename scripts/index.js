const GP_KEY = "gp";
const PRIO_KEY = "prio";
const WOW_ID_KEY = "wowID";
const WOW_HEAD_LINK = "https://classic.wowhead.com/";

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
	renderBWL(data);
}

function renderBWL(bwlMap) {
	let bwlSection = document.createElement("table");
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
			let gpHeader = document.createElement("td");

			let gpValue = bwlMap[boss][item][GP_KEY] == 0 ? "?" : bwlMap[boss][item][GP_KEY];
			gpHeader.classList.add("gp-header");
			gpHeader.innerText = "(GP: " + gpValue + ")";
			itemTr.appendChild(gpHeader);

			let itemHeader = document.createElement("td");
			itemHeader.classList.add("item-header");
			itemHeader.innerText = item + " (GP: " + bwlMap[boss][item][GP_KEY] + ") ";
			
			if (bwlMap[boss][item][WOW_ID_KEY] != 0) {
				let wowIdKey = "item=" + bwlMap[boss][item][WOW_ID_KEY];
				let itemAnchor = document.createElement('a');  
				itemHeader.appendChild(itemAnchor);
				itemAnchor.href = (WOW_HEAD_LINK + wowIdKey);
				itemAnchor.setAttribute("data-wowhead", wowIdKey);
			} else {
				itemHeader.innerText = item;
			}		

			bossTable.appendChild(itemTr);
			itemTr.appendChild(itemHeader);
			for (var prioIndex in bwlMap[boss][item][PRIO_KEY]) {
				let prio = bwlMap[boss][item][PRIO_KEY][prioIndex];
				let prioTd = document.createElement("td");
				prioTd.innerText = prio;
				itemTr.appendChild(prioTd);
			}
		}
	}

	const wrapper = document.querySelector(".wrapper");
	wrapper.appendChild(bwlSection);
}