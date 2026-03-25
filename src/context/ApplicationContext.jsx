import { createContext, useContext, useState, useEffect } from 'react';
import { generateId } from '../utils/helpers';
import { fetchMockJobs } from '../services/api';

const ApplicationContext = createContext();

export const useApplicationContext = () => {
  return useContext(ApplicationContext);
};

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedJobs = window.localStorage.getItem('my_saved_jobs');
        let parsedJobs = savedJobs ? JSON.parse(savedJobs) : [];
        
        const apiJobsLoaded = window.localStorage.getItem('api_jobs_loaded');
        const hasApiJobs = parsedJobs.some(job => String(job.id).startsWith('job_api_'));
        
        if (!apiJobsLoaded && !hasApiJobs) {
          const mockJobsFromAPI = await fetchMockJobs();
          setApplications([...mockJobsFromAPI, ...parsedJobs]);
          window.localStorage.setItem('api_jobs_loaded', 'true');
        } else {
          if (!apiJobsLoaded) window.localStorage.setItem('api_jobs_loaded', 'true');
          setApplications(parsedJobs);
        }
      } catch (error) {
        console.error("Failed to load initial data", error);
        const savedJobs = window.localStorage.getItem('my_saved_jobs');
        if (savedJobs) setApplications(JSON.parse(savedJobs));
      } finally {
        setIsLoaded(true);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem('my_saved_jobs', JSON.stringify(applications));
    }
  }, [applications, isLoaded]);

  const addApplication = (newJobData) => {
    newJobData.id = generateId();
    newJobData.bookmarked = false;
    const newList = [newJobData, ...applications];
    setApplications(newList);
  };

  const updateApplication = (id, editedData) => {
    const newList = [];
    for (let i = 0; i < applications.length; i++) {
      if (applications[i].id === id) {
        newList.push({ ...applications[i], ...editedData });
      } else {
        newList.push(applications[i]);
      }
    }
    setApplications(newList);
  };

  const deleteApplication = (id) => {
    const newList = [];
    for (let i = 0; i < applications.length; i++) {
      if (applications[i].id !== id) {
        newList.push(applications[i]);
      }
    }
    setApplications(newList);
  };

  const getApplication = (id) => {
    for (let i = 0; i < applications.length; i++) {
      if (applications[i].id === id) return applications[i];
    }
    return null;
  };

  const toggleBookmark = (id) => {
    const newList = [];
    for (let i = 0; i < applications.length; i++) {
      if (applications[i].id === id) {
        newList.push({ ...applications[i], bookmarked: !applications[i].bookmarked });
      } else {
        newList.push(applications[i]);
      }
    }
    setApplications(newList);
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      addApplication,
      updateApplication,
      deleteApplication,
      getApplication,
      toggleBookmark,
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};
