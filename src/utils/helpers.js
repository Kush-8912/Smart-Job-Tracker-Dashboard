import { format } from 'date-fns';

export const generateId = () => {
  const randomNum = Math.floor(Math.random() * 1000000);
  return 'job_' + randomNum;
};

export const formatDate = (dateString) => {
  if (!dateString || dateString === '') {
    return '—';
  }
  const dateObj = new Date(dateString);
  return format(dateObj, 'MMM dd, yyyy');
};

export const getPipelineData = (applications) => {
  let appliedCount = 0;
  let interviewCount = 0;
  let offerCount = 0;
  let rejectedCount = 0;

  for (let i = 0; i < applications.length; i++) {
    const job = applications[i];
    if (job.status === 'Applied') appliedCount += 1;
    if (job.status === 'Interviewing') interviewCount += 1;
    if (job.status === 'Offer') offerCount += 1;
    if (job.status === 'Rejected') rejectedCount += 1;
  }

  return [
    { name: 'Applied', value: appliedCount, fill: '#4f8ef7' },
    { name: 'Interviewing', value: interviewCount, fill: '#f59e0b' },
    { name: 'Offer', value: offerCount, fill: '#22c55e' },
    { name: 'Rejected', value: rejectedCount, fill: '#ef4444' },
  ];
};

export const STATUSES = ['Applied', 'Interviewing', 'Offer', 'Rejected'];
export const PLATFORMS = ['LinkedIn', 'Indeed', 'Company Website', 'Referral', 'Glassdoor', 'Other'];
export const LOCATIONS = ['Remote', 'On-site', 'Hybrid'];
