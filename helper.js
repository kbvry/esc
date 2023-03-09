const sleep = () => new Promise((r) => setTimeout(r, 1000));

const loading = (url) => {
	url = url.replace("https://", "");
	url = url.replace("http://", "");
	url = url.replace("www.", "");
	document.getElementById("fetching").innerText = url;
};

const getHTTP = async (url) => {
	loading(url);
	let http = new XMLHttpRequest();
	http.open("GET", url, false);
	http.send(null);
	return http;
};

const getCode = async (url) => {
	let http = await getHTTP(url);
	let parser = new DOMParser();
	return parser.parseFromString(http.responseText, "text/html");
};
