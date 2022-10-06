const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector(".search-button");
const mainContent = document.querySelector(".main-content");
const italianDiv = document.querySelector(".Italian");
const chineseDiv = document.querySelector(".Chinese");
const indianDiv = document.querySelector(".Indian");
const arabianDiv = document.querySelector(".Arabian");
const africanDiv = document.querySelector(".African");
const europeanDiv = document.querySelector(".European");
const americanDiv = document.querySelector(".American");

let cuisinesArray = [
	italianDiv,
	chineseDiv,
	indianDiv,
	arabianDiv,
	africanDiv,
	europeanDiv,
	americanDiv,
];

function getLocation(name) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			console.log(position);

			getData(lat, lon, name);
		});
	}
}

async function getData(lat, lon, name) {
	await fetch(
		`https://developers.zomato.com/api/v2.1/search?q=${name}&count=20&lat=${lat}&lon=${lon}&radius=3000&sort=real_distance&order=asc`,
		{ headers: { "user-key": "cec772b3e1dadbda85a7708bc383a235" } }
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			let output = data.restaurants
				.map((i) => {
					return `<ul class="bullet-points">
              <li>Restaurant: ${i.restaurant.name} </li>
              <li>Rating: ${i.restaurant.user_rating.aggregate_rating}/10</li>
              <li>Address: ${i.restaurant.location.address}</li>
            </ul>`;
				})
				.join("");

			mainContent.innerHTML = "";
			mainContent.insertAdjacentHTML("afterbegin", output);
		})
		.catch((error) => console.log(error));
}

searchButton.addEventListener("click", () => getLocation(searchBox.value));
cuisinesArray.forEach((cuisine) => {
	cuisine.addEventListener("click", function () {
		getLocation(cuisine.className);
	});
});
