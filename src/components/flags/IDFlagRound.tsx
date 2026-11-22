export const IDFlagRound = ({ width = "32px", height = "32px" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)">
          <path
            fill="white"
            d="M16,32c8.8,0,16-7.2,16-16H0C0,24.8,7.2,32,16,32z"
          />
          <path fill="red" d="M16,0C7.2,0,0,7.2,0,16h32C32,7.2,24.8,0,16,0z" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h32v32H0z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
