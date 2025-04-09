import React, { useEffect, useState } from "react";

const API_KEY = "u0MSwGAJeHpEmDJZrsVbtgAVvMy1GVcFkExDlJy2";
const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";

// color schemes for each college card, randomized
const colorSchemes = [
  ["#D88888", "#E5B964", "#FFB8A7"], // bg, text, line
  ["#FFB8A7", "#F3EA99", "#D88888"],
  ["#E5B964", "#D88888", "#F3EA99"],
  ["#F3EA99", "#D88888", "#E5B964"],
];

function randomColorScheme() {
  const randomScheme = Math.floor(Math.random() * colorSchemes.length);
  return colorSchemes[randomScheme];
}

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
          const colleges = data.results.map((college) => ({
            ...college,
            colorScheme: randomColorScheme(), // assign a random color scheme to each college
          }));

          setColleges(colleges); // set college data
        } else {
          console.log("No colleges found that match filters");
        }
      } catch (error) {
        console.error("Could not fetch college data :(", error);
        setError(error); // set the error state
      } finally {
        setLoading(false); // set loading to false once done
      }
    };

    fetchColleges();
  }, [zipCode, maxDistance, maxCost]); // run again when zipCode, maxDistance, or maxCost changes

  // show results in a grid
  return (
    <article>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div id="college-grid">
        {colleges.map((college) => {
          const [bgColor, infoColor, lineColor] = college.colorScheme; // define colors

          return (
            <div
              key={college.id}
              className="college-card small-font inria-sans"
              style={{ backgroundColor: bgColor }}
            >
              <h3 className="med-font black-text">{college["school.name"]}</h3>
              <div
                style={{ width: "100%", height: 2, backgroundColor: lineColor }}
              ></div>
              <section style={{ color: infoColor, fontWeight: "550" }}>
                <p>
                  {college["school.city"]}, {college["school.state"]}
                </p>
                <p>
                  Tuition: ${college["latest.cost.tuition.in_state"] ?? "N/A"}
                </p>
              </section>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default CollegeGrid;
