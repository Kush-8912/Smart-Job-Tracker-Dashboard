import { useApplicationContext } from '../context/ApplicationContext';

export const useApplications = () => {
  const context = useApplicationContext();

  const stats = {
    total: context.applications.length,
    applied: context.applications.filter((a) => a.status === 'Applied').length,
    interviewing: context.applications.filter((a) => a.status === 'Interviewing').length,
    offer: context.applications.filter((a) => a.status === 'Offer').length,
    rejected: context.applications.filter((a) => a.status === 'Rejected').length,
    bookmarked: context.applications.filter((a) => a.bookmarked === true).length,
  };

  return {
    ...context,
    stats,
  };
};
