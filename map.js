// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCD4ADT9v9OUUDFxtLz98HfFme9K4Ku1E4&libraries=places">

let map;
let service;
let infowindow;

//load map and use geolocation to find user
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
	});
	infoWindow = new google.maps.InfoWindow();
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				infoWindow.setPosition(pos);
				infoWindow.setContent('Location found.');
				infoWindow.open(map);
				map.setCenter(pos);
			},
			() => {
				handleLocationError(true, infoWindow, map.getCenter());
			}
		);
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation
			? 'Error: The Geolocation service failed.'
			: "Error: Your browser doesn't support geolocation."
	);
	infoWindow.open(map);
}

function createMarker(place) {
	const marker = new google.maps.Marker({
		map,
		position: place.geometry.location,
	});
	google.maps.event.addListener(marker, 'click', () => {
		infowindow.setContent(place.name);
		infowindow.open(map);
	});
}