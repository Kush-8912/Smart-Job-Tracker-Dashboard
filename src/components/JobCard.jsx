import { Link } from 'react-router-dom';
import { MdEdit, MdDelete, MdLocationOn, MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import { formatDate } from '../utils/helpers';
import { useApplications } from '../hooks/useApplications';

const JobCard = ({ app, onDelete }) => {
  const { toggleBookmark } = useApplications();

  let badgeClass = 'badge';
  if (app.status === 'Applied') badgeClass = 'badge badge-Applied';
  if (app.status === 'Interviewing') badgeClass = 'badge badge-Interviewing';
  if (app.status === 'Offer') badgeClass = 'badge badge-Offer';
  if (app.status === 'Rejected') badgeClass = 'badge badge-Rejected';

  const handleBookmark = () => {
    toggleBookmark(app.id);
  };

  return (
    <div className="job-card">
      <div className="card-top">
        <div className="company-row">
          <div>
            <div className="company-name">{app.company}</div>
            <div className="role-name">{app.role}</div>
          </div>
        </div>

        <div className="card-actions">
          <button className="icon-btn" onClick={handleBookmark}>
            {app.bookmarked ? <MdBookmark size={16} color="#f59e0b" /> : <MdBookmarkBorder size={16} />}
          </button>
          <Link to={'/applications/' + app.id} className="icon-btn">
            <MdEdit size={16} />
          </Link>
          <button className="icon-btn danger" onClick={() => onDelete(app.id)}>
            <MdDelete size={16} />
          </button>
        </div>
      </div>

      <div>
        <span className={badgeClass}>{app.status}</span>
      </div>

      <div className="card-meta">
        <span className="meta-item"><MdLocationOn size={14} /> {app.location}</span>
      </div>

      <div className="card-meta">
        <span className="meta-item">Platform: {app.platform}</span>
      </div>

      <div className="card-meta">
        <span className="meta-item">Applied: {formatDate(app.appliedDate)}</span>
      </div>

      {app.salary && (
        <div className="card-meta">
          <span className="meta-item">Salary: ${Number(app.salary).toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

export default JobCard;
