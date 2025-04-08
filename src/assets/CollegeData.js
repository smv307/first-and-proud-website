import React, { useEffect, useState } from "react";

const API_KEY = "u0MSwGAJeHpEmDJZrsVbtgAVvMy1GVcFkExDlJy2";
const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";

// color schemes for each college card, randomized
const colorSchemes = [
  ["D88888", "E5B964", "FFB8A7"],
  ["FFB8A7", "F3EA99", "D88888"],
  ["E5B964", "D88888", "F3EA99"],
  ["F3EA99", "D88888", "E5B964"],
];
// title, line, info color ^

const CollegeGrid = ({
  zipCode = "94602",
  maxDistance = 50,
  maxCost = 20000,
}) => {
  // use states
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      // filters to search for
      const params = new URLSearchParams({
        api_key: API_KEY,
        fields:
          "id,school.name,school.city,school.state,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,location.lat,location.lon",
        "school.degrees_awarded.predominant": "2,3", // mostly awards 2-year and 4-year degrees
        zip: zipCode,
        distance: `${maxDistance}mi`, // only show colleges within # miles of zip
        per_page: 25,
      });

      // get data from API
      try {
        const url = `${BASE_URL}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          console.log(`Colleges found near ${zipCode} and under ${maxCost}:`);
          data.results.forEach((college) => {
            console.log(
              `${college["school.name"]} - ${college["school.city"]}`
            );
          });

          setColleges(data.results); // set colleges to the data from API
        } else {
          console.log("No colleges found that match filters");
        }
      } catch (error) {
        console.error("Could not fetch college data :(", error);
        setError(error); // set the error state
      } finally {
        setLoading(false); // set loading to false
      }
    };

    fetchColleges();
  }, [zipCode, maxDistance, maxCost]); // run again when zipCode, maxDistance, or maxCost changes

  // show results in a grid
  return (
    <article>
      {/* status updates */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div id="college-grid">
        {colleges.map((college) => (
          <div
            key={college.id}
            id="college-card"
          >
            <h3>{college["school.name"]}</h3>
            <p>{college["school.city"]}, {college["school.state"]}</p>
            <p>Tuition: ${college["latest.cost.tuition.in_state"]}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default CollegeGrid;
