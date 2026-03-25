import axios from 'axios';

export const fetchMockJobs = async () => {
  const response = await axios.get('https://dummyjson.com/users?limit=3');

  let jobsList = [];

  const statuses = ['Applied', 'Interviewing', 'Offer'];

  for (let i = 0; i < response.data.users.length; i++) {
    let dummyUser = response.data.users[i];

    jobsList.push({
      id: 'job_api_' + i,
      company: dummyUser.company.name,
      role: dummyUser.company.title,
      location: 'Remote',
      salary: 60000 + (i * 10000),
      platform: 'LinkedIn',
      status: statuses[i % statuses.length],
      appliedDate: '2026-03-01',
      interviewDate: '',
      notes: '',
      bookmarked: false,
    });
  }

  return jobsList;
};
