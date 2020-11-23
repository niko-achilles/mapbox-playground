const MarkerIcon = ({ size, color, onClick }) => (
  <span>
    <i
      onClick={onClick}
      style={{ fontSize: size, color }}
      className="fas fa-map-marker-alt"
    />
  </span>
);

export default MarkerIcon;
