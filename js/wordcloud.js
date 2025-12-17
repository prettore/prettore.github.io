const words = [
  { text: "network", size: 80 },
  { text: "data", size: 70 },
  { text: "tactical", size: 60 },
  { text: "systems", size: 55 },
  { text: "sensor", size: 50 },
  { text: "scenarios", size: 48 },
  { text: "intra-vehicular", size: 45 },
  { text: "vehicular", size: 42 },
  { text: "fusion", size: 40 },
  { text: "intelligent", size: 38 },
  { text: "space", size: 36 },
  { text: "queuing", size: 34 },
  { text: "rates", size: 32 },
  { text: "heterogeneous", size: 30 },
  { text: "ever-changing", size: 28 },
  { text: "communication", size: 26 },
  { text: "military", size: 24 },
  { text: "authentication", size: 22 }
];

const width = document.getElementById("wordCloud").offsetWidth;
const height = 400;

const svg = d3.select("#wordCloud")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const layout = d3.layout.cloud()
  .size([width, height])
  .words(words)
  .padding(5)
  .rotate(() => (Math.random() > 0.7 ? 90 : 0))
  .font("Arial")
  .fontSize(d => d.size)
  .on("end", draw);

layout.start();

function draw(words) {
  svg.append("g")
    .attr(
      "transform",
      `translate(${width / 2}, ${height / 2})`
    )
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", d => `${d.size}px`)
    .style("font-family", "Arial")
    .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
    .attr("text-anchor", "middle")
    .attr(
      "transform",
      d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`
    )
    .text(d => d.text);
}
