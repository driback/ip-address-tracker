const input = document.querySelector(".tracker__input");
const button = document.querySelector(".tracker__button");
const ipAddress = document.querySelector(".ipaddress");
const locations = document.querySelector(".locations");
const timezones = document.querySelector(".timezone");
const isps = document.querySelector(".isp");

//MAP
const map = L.map("map", { zoomControl: false, zoom: 10 });
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const atrribut =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const icons = {
  iconUrl: "./images/icon-location.svg",
  iconSize: [20, 25],
  iconAnchor: [20, 25],
};

const iconMap = L.icon(icons);
const tiles = L.tileLayer(tileUrl, { atrribut }).addTo(map);
const marker = L.marker([0, 0], { icon: iconMap }).addTo(map);

map.setView([0, 0], 5);

//Fetch IPAdsress API
const fetchApi = async () => {
  const inputVal = input.value;
  const API_KEY = "at_RfI2LEKeQyE7DAeP3xw4p3ggaf6iM";
  const IP = inputVal;
  const API = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${IP}`;

  return (await fetch(API)).json();
};

const datas = async () => {
  let data;

  try {
    data = await fetchApi();

    const { ip, isp } = data;
    const { city, timezone, postalCode, lat, lng } = data.location;
    const latlong = [lat, lng];

    ipAddress.innerText = ip;
    timezones.innerText = `UTC ${timezone}`;
    isps.innerText = isp;
    locations.innerText = `${city}, ${postalCode}`;

    marker.setLatLng(latlong);
    map.setView(latlong, 20);
  } catch (error) {
    console.log(error);
  }
};

const inputData = (event) => {
  event.preventDefault();

  const nothing = input.value === null || input.value === "";

  nothing
    ? (input.style.border = "1px solid red")
    : fetchApi()
    ? datas()
    : console.log(error);

  ipAddress.innerText = "loading...";
  timezones.innerText = "loading...";
  isps.innerText = "loading...";
  locations.innerText = "loading...";
};

button.addEventListener("click", inputData);
