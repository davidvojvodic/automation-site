"use client";

export function CheckmarkAnimation() {
  return (
    <div className="flex justify-center mb-8">
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className="text-color-1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circle */}
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="checkmark-circle"
        />
        {/* Checkmark */}
        <path
          d="M 25 40 L 35 50 L 55 30"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="checkmark-check"
        />
      </svg>
      <style jsx>{`
        @keyframes drawCircle {
          from {
            stroke-dashoffset: 226;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes drawCheck {
          from {
            stroke-dashoffset: 50;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .checkmark-circle {
          stroke-dasharray: 226;
          stroke-dashoffset: 226;
          animation: drawCircle 0.6s ease-out forwards;
        }

        .checkmark-check {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: drawCheck 0.4s 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
