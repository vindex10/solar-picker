const BACKEND_URL = "http://127.0.0.1:8000";

function init_map() {
	const map = L.map("map").setView([45.120053, 29.509277], 6);
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);
	map.on("click", async (e) => {
		await onMapClick(e, map);
	});
}

async function onMapClick(e, map) {
	const [lat, lon] = [e.latlng.lat, e.latlng.lng];
	const response = await fetch(
		`${BACKEND_URL}/hmax?` +
			new URLSearchParams({
				lat: lat,
				lon: lon,
			}).toString()
	);
	const data = await response.json();
	const popup = L.popup()
		.setLatLng(e.latlng)
		.setContent(`Max wave height at latlng ${e.latlng} is ${data["hmax"]}`)
		.openOn(map);
}

(() => {
	init_map();
})();
