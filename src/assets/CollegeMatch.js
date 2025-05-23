import React, { useEffect, useState } from "react";


const API_KEY = process.env.REACT_APP_COLLEGE_SCORECARD_API_KEY; // API key for College Scorecard API
const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";

// =========================
// C O L O R  S C H E M E S
// =========================

const colorSchemes = [
  ["#D88888", "#E5B964", "#FFB8A7"], // bg, text, line color
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
const Slider = ({
  min,
  max,
  step,
  label,
  unit,
  suffix,
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  // update output
  const updateValue = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="filter">
      <label htmlFor="slider">{label}:</label>
      <br />
      <span className="rose-text">
        {unit}
        {min} - {unit}
        {value} {suffix}
      </span>
      <input
        className="slider"
        id="slider"
        type="range"
        min={min}
        max={max}
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
  onSubmit,
}) => {
  return (
    <form
      id="filters"
      className="darker-off-white-bg small-font isotok-web"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h3>LOCATION</h3>
      <section className="filter rose-text">
        <label htmlFor="zip">Zip Code: </label>
        <input
          type="text"
          id="zip"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </section>
      <Slider
        min={30}
        max={1500}
        step={30}
        label="Distance"
        suffix="miles"
        className="filter"
        initialValue={maxDistance}
        onChange={setMaxDistance}
      />
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
      <button type="submit" id="search-button">Search</button>
    </form>
  );
};

// =========================
// D A T A
// =========================

const CollegeGrid = ({ zipCode, maxDistance, maxCost }) => {
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!zipCode) return; // don't search until a zip code is given

    const fetchColleges = async () => {
      setLoading(true);
      const params = new URLSearchParams({
        api_key: API_KEY,
        fields:
          "id,school.name,school.city,school.state,latest.cost.tuition.in_state,avg_net_price.public,avg_net_price.private,location.lat,location.lon,school.school_url,latest.earnings.10_yrs_after_entry.median,size",
        zip: zipCode,
        "latest.cost.tuition.in_state__range": `0..${maxCost}`,
        distance: `${maxDistance}mi`,
        per_page: 1000,
      });

      try {
        const url = `${BASE_URL}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        // =========================
        // S O R T 
        // =========================
        if (
          data.results &&
          Array.isArray(data.results) &&
          data.results.length > 0
        ) {
          const colleges = data.results
            .map((college) => ({
              ...college,
              colorScheme: college.colorScheme || randomColorScheme(),
            }))
            .sort(
              (a, b) =>
                (b["latest.earnings.10_yrs_after_entry.median"] || 0) -
                (a["latest.earnings.10_yrs_after_entry.median"] || 0)
            ); // sort descending by rank

          setColleges(colleges);
        } else {
          setColleges([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [zipCode, maxDistance, maxCost]);

  // =========================
  // G R I D
  // =========================

  return (
    <article>
      {/* show loading and error messages */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div id="college-grid">
        {colleges.length > 0 ? (
          colleges.map((college, idx) => {
            const [bgColor, infoColor, lineColor] = college.colorScheme;
            return (
              <div
                key={college.id}
                className="college-card small-font inria-sans"
                style={{ backgroundColor: bgColor }}
              >
                <a href={college["school.school_url"]}>
                  <h3 className="med-font black-text">
                    #{idx + 1} {college["school.name"]}
                  </h3>
                </a>
                <div
                  style={{
                    width: "100%",
                    height: 2,
                    backgroundColor: lineColor,
                  }}
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
          })
        ) : (
          <p>No colleges found that match the filters.</p>
        )}
      </div>
    </article>
  );
};

// =========================
// P A G E
// =========================

const CollegeMatch = () => {
  // user-controlled filter values
  const [zipCode, setZipCode] = useState("94112");
  const [maxDistance, setMaxDistance] = useState(100);
  const [maxCost, setMaxCost] = useState(25000);

  // active search values
  const [searchZip, setSearchZip] = useState("94112");
  const [searchDistance, setSearchDistance] = useState(100);
  const [searchCost, setSearchCost] = useState(25000);

  const handleSearch = () => {
    setSearchZip(zipCode);
    setSearchDistance(maxDistance);
    setSearchCost(maxCost);
  };

  return (
    <main id="college-match" className="flex-parent">
      <Filters
        zipCode={zipCode}
        setZipCode={setZipCode}
        maxCost={maxCost}
        setMaxCost={setMaxCost}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        onSubmit={handleSearch}
      />
      <CollegeGrid
        maxDistance={searchDistance}
        maxCost={searchCost}
        zipCode={searchZip}
      />
    </main>
  );
};

export default CollegeMatch;
