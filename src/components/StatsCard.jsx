const StatsCard = ({ icon, label, value }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>
      <div>
        <div className="stat-number">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
};

export default StatsCard;
