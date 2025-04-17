import React from "react";
import "./CircularProgressBar.css";

function CircularProgressBar({ percentage = 0 }) {
  const strokeDashoffset = 377 - (377 * percentage) / 100;

  return (
    <div className="circular-progress-bar">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <defs>
          <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3e2a72" />
            <stop offset="100%" stopColor="#974aaa" />
          </linearGradient>
        </defs>

        <circle
          className="circle-bg"
          cx="70"
          cy="70"
          r="60"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="12"
        />
        <circle
          className="circle-progress"
          cx="70"
          cy="70"
          r="60"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="377"
          strokeDashoffset={strokeDashoffset}
        />
        <text
          x="50%"
          y="43%"
          textAnchor="middle"
          fill="#b4a0eb"
          fontSize="1em"
          dy=".3em"
        >
          {`${percentage}%`}
        </text>
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fill="#b4a0eb"
          fontSize="1em"
          dy=".3em"
        >
          {`completed`}
        </text>
      </svg>
    </div>
  );
}
export default CircularProgressBar;
