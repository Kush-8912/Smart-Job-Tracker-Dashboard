import { useApplications } from '../hooks/useApplications';
import { getPipelineData } from '../utils/helpers';
import Charts from '../components/Charts';

const Analytics = () => {
  const { applications, stats } = useApplications();

  const pipelineData = getPipelineData(applications);

  let interviewRate = 0;
  let offerRate = 0;

  if (stats.total > 0) {
    const totalInterviews = stats.interviewing + stats.offer;
    const interviewPercent = (totalInterviews / stats.total) * 100;
    interviewRate = Math.round(interviewPercent);

    const offerPercent = (stats.offer / stats.total) * 100;
    offerRate = Math.round(offerPercent);
  }

  return (
    <div className="page-content">
      <h1 className="page-title">Analytics</h1>
      <p className="page-subtitle" style={{ marginBottom: '24px' }}>
        Understand your job search performance
      </p>

      <div className="charts-grid" style={{ marginBottom: '24px' }}>
        <div className="card rate-card">
          <div className="rate-label">Interview Rate</div>
          <div className="rate-value" style={{ color: '#f59e0b' }}>{interviewRate}%</div>
          <div className="rate-bar">
            <div className="rate-fill" style={{ width: interviewRate + '%', background: '#f59e0b' }}></div>
          </div>
          <div className="rate-desc">of your applications led to an interview</div>
        </div>

        <div className="card rate-card">
          <div className="rate-label">Offer Rate</div>
          <div className="rate-value" style={{ color: '#22c55e' }}>{offerRate}%</div>
          <div className="rate-bar">
            <div className="rate-fill" style={{ width: offerRate + '%', background: '#22c55e' }}></div>
          </div>
          <div className="rate-desc">of your applications resulted in job offers</div>
        </div>
      </div>

      <div className="charts-grid">
        <Charts data={pipelineData} />
      </div>
    </div>
  );
};

export default Analytics;
