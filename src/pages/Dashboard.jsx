import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdWork, MdEventNote, MdThumbUp, MdThumbDown } from 'react-icons/md';

import { useApplications } from '../hooks/useApplications';
import StatsCard from '../components/StatsCard';
import Charts from '../components/Charts';
import { getPipelineData, formatDate } from '../utils/helpers';

const Dashboard = () => {
  const { applications, stats } = useApplications();
  const navigate = useNavigate();

  const pipelineData = getPipelineData(applications);
  const recentJobs = applications.slice(0, 5);

  let recentListHTML = null;
  if (recentJobs.length === 0) {
    recentListHTML = <p style={{ color: 'var(--text-muted)' }}>No jobs added yet.</p>;
  } else {
    let htmlItems = [];
    for (let i = 0; i < recentJobs.length; i++) {
      let app = recentJobs[i];

      let badgeClass = 'badge';
      if (app.status === 'Applied') badgeClass = 'badge badge-Applied';
      if (app.status === 'Interviewing') badgeClass = 'badge badge-Interviewing';
      if (app.status === 'Offer') badgeClass = 'badge badge-Offer';
      if (app.status === 'Rejected') badgeClass = 'badge badge-Rejected';

      htmlItems.push(
        <div key={app.id} className="recent-item" onClick={() => navigate('/applications/' + app.id)}>
          <div className="recent-info">
            <div className="recent-company">{app.company}</div>
            <div className="recent-role">{app.role}</div>
          </div>
          <div style={{ paddingRight: '16px' }}>
            <span className={badgeClass}>{app.status}</span>
          </div>
          <div className="recent-date">{formatDate(app.appliedDate)}</div>
        </div>
      );
    }
    recentListHTML = htmlItems;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Track your job search progress</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard icon={<MdWork color="#4f8ef7" />} label="Total Applications" value={stats.total} />
        <StatsCard icon={<MdEventNote color="#f59e0b" />} label="Interviewing" value={stats.interviewing} />
        <StatsCard icon={<MdThumbUp color="#22c55e" />} label="Offers" value={stats.offer} />
        <StatsCard icon={<MdThumbDown color="#ef4444" />} label="Rejected" value={stats.rejected} />
      </div>

      <div className="charts-grid">
        <Charts data={pipelineData} />
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <div className="section-header">
          <h2 className="section-title">Recent Applications</h2>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/applications')}>
            View All
          </button>
        </div>

        <div className="recent-list">
          {recentListHTML}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
