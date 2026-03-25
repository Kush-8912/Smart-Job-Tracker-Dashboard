const EmptyState = ({ title, subtitle }) => {
  let displayTitle = title;
  if (!displayTitle) {
    displayTitle = 'No applications found';
  }

  let displaySubtitle = subtitle;
  if (!displaySubtitle) {
    displaySubtitle = 'Try adjusting your search or add a new job.';
  }

  return (
    <div className="empty-state">
      <div className="empty-icon">📂</div>
      <div className="empty-title">{displayTitle}</div>
      <div className="empty-desc">{displaySubtitle}</div>
    </div>
  );
};

export default EmptyState;
