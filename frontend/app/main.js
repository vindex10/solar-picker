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
	const [str_lat, str_lon] = [lat.toFixed(4), lon.toFixed(4)];
	const msg = data["hmax"]
		? `Max observed wave height at (${str_lat}, ${str_lon}) is ${data["hmax"].toFixed(2)}m`
		: `We don't have information about this location: (${str_lat}, ${str_lon})`;
	L.popup().setLatLng(e.latlng).setContent(msg).openOn(map);
}

(() => {
	init_map();
})();
