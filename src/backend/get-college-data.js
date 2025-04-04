require('dotenv').config(); // Load .env

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";

// user input params
let maxCost = 20000;
let zipCode = "94602";
let maxDistance = 50;

async function getCollegeData(maxCost, zipCode) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    fields: "id,school.name,school.city,school.state,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,location.lat,location.lon",
    "school.degrees_awarded.predominant": "2,3",
    zip: zipCode,
    distance: `${maxDistance}mi`, // only show colleges within distance of zip
    per_page: 25,
  });

  const url = `${BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // later: create a new card element for each college
    if (data.results && data.results.length > 0) {
        console.log(`Colleges found near ${zipCode} and under ${maxCost}:`);
      data.results.forEach((college) => {
        console.log(
          `${college["school.name"]} - ${college["school.city"]}`
        );
      });

    // if filters do not fit a college
    } else {
      console.log("No colleges found that match filters");
    }
  } catch (error) {
    console.error("Could not fetch college data :(", error);
  }
}

getCollegeData(maxCost, zipCode);
