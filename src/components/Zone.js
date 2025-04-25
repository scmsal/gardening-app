//Credit: https://rapidapi.com/fireside-worldwide-fireside-worldwide-default/api/plant-hardiness-zone

import axios from "axios";

const zip = "11746";
const options = {
  method: "GET",
  url: `https://plant-hardiness-zone.p.rapidapi.com/zipcodes/${zip}`,
  headers: {
    "x-rapidapi-key": "d5354a5946msh7840313d8a1f013p18983cjsn00553f639024",
    "x-rapidapi-host": "plant-hardiness-zone.p.rapidapi.com",
  },
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    console.log(response.data.hardiness_zone);
  } catch (error) {
    console.error(error);
  }
}

fetchData();

//eventually integrate data from here: https://github.com/waldoj/frostline to a) get temperatures for each zone and b) generate maps.

//otherwise, link to https://planthardiness.ars.usda.gov/ that shows all that info searchable by zip code.
