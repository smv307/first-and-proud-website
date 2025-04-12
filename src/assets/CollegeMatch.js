import React, { useEffect, useState } from "react";
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";

// =========================
// C O L O R  S C H E M E S
// =========================

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

// =========================
// F I L T E R S
// =========================

// slider component
const Slider = ({ min, max, step, label, unit, suffix, initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue); // value is max cost to search for

  const updateValue = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className="filter">
      <label htmlFor="slider">{label}:</label>
      <br />
      <span className="rose-text">
        {unit}{min} - {unit}{value} {suffix} 
      </span>
      <input
        className="slider"
        id="slider"
        type="range"
        min={min}
        max={max} // max possible cost to search for
        step={step}
        value={value}
        onChange={updateValue}
      />
    </div>
  );
};


const Filters = ({
  zipCode,
  setZipCode,
  maxDistance,
  setMaxDistance,
  maxCost,
  setMaxCost,
}) => {
  return (
    <section id="filters" className="darker-off-white-bg small-font isotok-web">
      <h3>LOCATION</h3>

      {/* user zip code */}

      <section className="filter rose-text">
        <label htmlFor="zip">Zip Code: </label>
        <input
          type="text"
          id="zip"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </section>

      {/* max distance from zip */}

      <Slider
        min={30}
        max={1000}
        step={30}

        label="Distance"
        suffix="miles"
        className="filter"

        initialValue={maxDistance}
        onChange={setMaxDistance}
      />

      {/* max tuition price */}

      <div className="line"></div>
      <h3>COST</h3>

      <Slider
        min={1000}
        max={100000}
        step={1000}

        label="Tuition"
        unit="$"
        className="filter"

        initialValue={maxCost}
        onChange={setMaxCost}
      />
    </section>
  );
};

// =========================
// D A T A
// =========================

const CollegeGrid = ({
  zipCode,
  maxDistance,
  maxCost,
}) => {
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
        "latest.cost.tuition.in_state__range": `0..${maxCost}`, // only show colleges with tuition less than maxCost
        distance: `${maxDistance}mi`, // only show colleges within # miles of zip
        per_page: 25,
      });

      // get data from API
      try {
        const url = `${BASE_URL}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
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
        setError(error);
      } finally {
        setLoading(false); // set loading to false once done
      }
    };

    fetchColleges();
  }, [zipCode, maxDistance, maxCost]); // run again when zipCode, maxDistance, or maxCost changes BE SURE TO ADD NEW SEARCH PARAMETERS HERE

// =========================
// G R I D
// =========================

  return (
    <article>
      {/* show loading and error messages */}
      {loading && <p>Loading...</p>} 
      {error && <p>Error: {error.message}</p>}

      <div id="college-grid">
        {colleges.map((college) => {
          const [bgColor, infoColor, lineColor] = college.colorScheme; // assign values to individual colors

          return (
            // per college card, display name, city, state, and tuition
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
                  Tuition: ${college["latest.cost.tuition.in_state"]}
                </p>
              </section>
            </div>
          );
        })}
      </div>
    </article>
  );
};

// =========================
// P A G E
// =========================

const CollegeMatch = () => {
  const [zipCode, setZipCode] = useState("");
  const [maxDistance, setMaxDistance] = useState(100);
  const [maxCost, setMaxCost] = useState(25000);

  return (
    <main className="flex-parent">
      <Filters
        zipCode={zipCode}
        setZipCode={setZipCode}
        maxCost={maxCost}
        setMaxCost={setMaxCost}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
      />
      <CollegeGrid
        maxDistance={maxDistance}
        maxCost={maxCost}
        zipCode={zipCode}
      />
    </main>
  );
};

export default CollegeMatch;
