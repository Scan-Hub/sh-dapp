import React from "react";

const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct , r }) => {
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 + pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={110}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"1.5rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
    //   strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage }) => {
  return (
    <text
      x="55%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
      colour={"#0D0F20"}
      stroke="white"
    >
      {percentage/10}
    </text>
  );
};

const Piepercent = ({ percentage, colour ,r }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="#0D0F20" r={r} />
        <Circle colour={colour} pct={pct} r={r} />
      </g>
      <Text  percentage={pct} />
    </svg>
  );
};

export default Piepercent;
