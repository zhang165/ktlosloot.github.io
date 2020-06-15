const GP_KEY = "gp";
const PRIO_KEY = "prio";
const WOW_ID_KEY = "wowID";
const WOW_HEAD_LINK = "https://classic.wowhead.com/";
const BASE_REQUEST_LINK = "https://bendriller.github.io/";
const JSON_REQUEST_MAP = {"aq40" : "KTLOSAQ40Loot.json", "bwl": "KTLOSBWLLoot.json", "mc":"KTLOSMCLoot.json"};
const RAID_NAME_MAP = {"aq40" : "Temple of Ahn'Qiraj", "bwl": "Blackwing Lair", "mc":"Molten Core"};

function loadJsonAndRender(raidName) {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(e) {
		if (this.readyState == 4 && this.status == 200) {
			clearDataSection();
			process(this.response, raidName);
		}
	}
	let jsonUrl = BASE_REQUEST_LINK + JSON_REQUEST_MAP[raidName];
	xhr.open('GET', jsonUrl);
	xhr.send();
}

function loadBWL() {
	loadJsonAndRender("bwl");
}

function loadAQ40() {
	loadJsonAndRender("aq40");
}

function loadMC() {
	loadJsonAndRender("mc");
}

function clearDataSection() {
	var dataSection = document.getElementById("data-section");
	if (dataSection != undefined) {
		dataSection.remove();
	}
	var raidHeader = document.getElementById("raid-header");
	if (raidHeader != undefined) {
		raidHeader.remove();
	}
}

function process(data, raidName) {
	renderTable(data, raidName);
}

function renderTable(dataMap, raidName) {
	const dataWrapper = document.querySelector("#data-wrapper");

	let raidHeader = document.createElement("div");
	raidHeader.setAttribute("id","raid-header");
	dataWrapper.appendChild(raidHeader);
	raidHeader.innerText = RAID_NAME_MAP[raidName];

	let dataSection = document.createElement("table");
	dataSection.setAttribute("id","data-section");
	dataWrapper.appendChild(dataSection);

	for (var boss in dataMap) {
		let bossRow = document.createElement("tr");
		let bossTd = document.createElement("td");
		bossTd.innerText = boss;
		bossTd.classList.add("boss-header");
		bossRow.appendChild(bossTd);
		dataSection.appendChild(bossRow);

		let bossItems = document.createElement("td");

		bossRow.appendChild(bossItems);
		let bossTable = document.createElement("table");
		bossTable.classList.add("boss-table");
		bossItems.appendChild(bossTable);

		var isEven = true;
		for (var item in dataMap[boss]) {
			let itemTr = document.createElement("tr");
			if (isEven) { 
				itemTr.classList.add("even");
			}
			isEven = !isEven;
			let gpHeader = document.createElement("td");

			let gpValue = dataMap[boss][item][GP_KEY] == undefined ? "" : dataMap[boss][item][GP_KEY];
			gpHeader.classList.add("gp-header");
			gpHeader.innerText = "(GP: " + gpValue + ")";
			gpHeader.classList.add("prio");
			itemTr.appendChild(gpHeader);

			let itemHeader = document.createElement("td");
			itemHeader.classList.add("item-header");
			itemHeader.classList.add("prio");
			
			if (dataMap[boss][item][WOW_ID_KEY] != 0) {
				let wowIdKey = "item=" + dataMap[boss][item][WOW_ID_KEY];
				let itemAnchor = document.createElement('a');  
				itemHeader.appendChild(itemAnchor);
				itemAnchor.href = (WOW_HEAD_LINK + wowIdKey);
				itemAnchor.setAttribute("data-wowhead", wowIdKey);
				itemAnchor.innerText = item;
			} else {
				itemHeader.innerText = item;
			}		

			bossTable.appendChild(itemTr);
			itemTr.appendChild(itemHeader);
			for (var prioIndex in dataMap[boss][item][PRIO_KEY]) {
				let prio = dataMap[boss][item][PRIO_KEY][prioIndex];
				let prioTd = document.createElement("td");
				prioTd.classList.add("prio");
				prioTd.innerText = prio;
				itemTr.appendChild(prioTd);
			}
		}
	}
}

// By default render AQ40;
loadJsonAndRender("aq40");