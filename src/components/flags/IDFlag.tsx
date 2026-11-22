export const IDFlag = ({ width = "640px", height = "480px" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      width={width}
      height={height}
    >
      <path fill="#fff" d="M0 0H900V600H0z" />
      <path fill="red" d="M0 0H900V300H0z" />
    </svg>
  );
};
