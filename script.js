const codeParser = async (url) => {
	const doc = await getCode(url);

	if (!doc.querySelectorAll(".rates").length) {
		return;
	}

	const id = "id" + Math.floor(Math.random() * 99999999);
	const name = doc.querySelector("h1").innerText;
	const pic = doc.querySelector(".modelProfilePic a img").src;

	const tbody = document.querySelector("table tbody");

	const headHtml = `
		<tr>
			<td>Kız</td>
			<td>
				<div class="rateDetails">
					<div>Zaman</div>
					<div>Incall</div>
					<div>Outcall</div>
				</div>
			</td>
		</tr>
	`;

	const html = `
		<tr>
			<td>
				<a href="${url}" target="_blank">
					<div><img src="${pic}" /></div>
					<div>${name.split(" ")[0].slice(0, 7)}</div>
				</a>
			</td>
			<td id="${id}"></td>
		</tr>
	`;

	if (!tbody.innerHTML) {
		tbody.insertAdjacentHTML("beforeend", headHtml);
	}

	tbody.insertAdjacentHTML("beforeend", html);
	document.querySelector("#" + id).appendChild(doc.querySelector(".rates"));
};

const getPages = async (url) => {
	const doc = await getCode(url);

	for (el of doc.querySelectorAll("[data-escortid]")) {
		await sleep();
		await codeParser(el.getAttribute("data-url"));
	}

	await sleep();

	const link = doc?.querySelector("link[rel='next']");

	if (link) {
		getPages(link.getAttribute("href"));
	}
};

const init = async () => {
	await sleep();

	const http = await getHTTP("http://bit.ly/turkey-escort");

	await sleep();
	getPages(http.responseURL + "/en/escorts/istanbul");
};

init();
