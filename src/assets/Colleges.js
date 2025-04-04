// rose, peach, mustard, yellow
// main color, font color, line color
const colorSchemes = [
  ["D88888", "E5B964", "FFB8A7"],
  ["FFB8A7", "F3EA99", "D88888"],
  ["E5B964", "D88888", "F3EA99"],
  ["F3EA99", "D88888", "E5B964"],
];

function CollegeCard() {
  return (
    <article>
      <h4>SchoolName</h4>
      <div className="line"></div>
      <div>
        <p>City</p>
        <p>Cost</p>
        <p>Focus</p>
      </div>
    </article>
  );
}
