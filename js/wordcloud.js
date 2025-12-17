const words = [
  { text: "network", size: 90, color: "#ff4d4d" },
  { text: "data", size: 80, color: "#4dd2ff" },
  { text: "tactical", size: 65, color: "#ffd11a" },
  { text: "systems", size: 60, color: "#ff6666" },
  { text: "sensor", size: 55, color: "#ff944d" },
  { text: "scenarios", size: 52, color: "#ff9933" },
  { text: "intra-vehicular", size: 48, color: "#9966ff" },
  { text: "iot", size: 45, color: "#66ccff" },
  { text: "fusion", size: 44, color: "#33cccc" },
  { text: "intelligent", size: 42, color: "#ffcc66" },
  { text: "resilience", size: 40, color: "#ff9966" },
  { text: "queuing", size: 38, color: "#66ff66" },
  { text: "cybersecurity", size: 36, color: "#ffcc00" },
  { text: "heterogeneous", size: 34, color: "#9966cc" },
  { text: "ever-changing", size: 32, color: "#66ffcc" },
  { text: "communication", size: 30, color: "#ff9933" },
  { text: "military", size: 28, color: "#ff6699" },
  { text: "context-awareness", size: 26, color: "#66b3ff" }
];

const container = document.getElementById("wordCloud");
const width = container.offsetWidth;
const height = 420;

const svg = d3.select("#wordCloud")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const layout = d3.layout.cloud()
  .size([width, height])
  .words(words)
  .padding(4)
  .rotate(d => {
    if (d.text === "intra-vehicular") return 90;
    if (d.text === "vehicular") return 90;
    return 0;
  })
  .font("Helvetica, Arial, sans-serif")
  .fontSize(d => d.size)
  .spiral("archimedean")
  .on("end", draw);

layout.start();

function draw(words) {
  svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`)
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", d => `${d.size}px`)
    .style("font-family", "Helvetica, Arial, sans-serif")
    .style("fill", d => d.color)
    .attr("text-anchor", "middle")
    .attr("transform", d =>
      `translate(${d.x}, ${d.y}) rotate(${d.rotate})`
    )
    .text(d => d.text);
}
