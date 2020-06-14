function loadJson() {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(e) {
		if (this.readyState == 4 && this.status == 200)
			process(this.response);
	}
	xhr.open('GET', 'http://github.com/BenDriller/KTLOSLoot/KTLOSBWLLoot.json');
	xhr.send();
}

loadJson();

function process(data) {
	renderBWL(data["BWL"]);
}

function renderBWL(bwlMap) {
	console.log(bwlMap);
	var bwlSection = document.createElement("div");
	bwlSection.innerText = "BWL";

	for (var key in bwlMap) {
		let keyDiv = document.createElement("div");
		keyDiv.innerText = key;
		bwlSection.appendChild(keyDiv);
		for (var item in bwlMap[key]) {
			let itemDiv = document.createElement("div");
			itemDiv.innerText = item + ": ";
			for (var prioIndex in bwlMap[key][item]["prio"]) {
				let prio = bwlMap[key][item]["prio"][prioIndex];
				itemDiv.innerText += prio;
			}
			keyDiv.appendChild(itemDiv);
		}
	}

	const wrapper = document.querySelector(".wrapper");
	wrapper.appendChild(bwlSection);
}