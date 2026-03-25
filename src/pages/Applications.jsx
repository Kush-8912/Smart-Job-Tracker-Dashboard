import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useApplications } from '../hooks/useApplications';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

const TABS = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected', 'Bookmarked'];

const Applications = () => {
  const { applications, deleteApplication } = useApplications();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  let filteredList = [];
  for (let i = 0; i < applications.length; i++) {
    const job = applications[i];
    let keepJob = true;

    if (activeTab === 'Bookmarked') {
      if (job.bookmarked !== true) keepJob = false;
    } else if (activeTab !== 'All') {
      if (job.status !== activeTab) keepJob = false;
    }

    if (searchQuery !== '') {
      const searchStr = searchQuery.toLowerCase();
      const compStr = job.company.toLowerCase();
      const roleStr = job.role.toLowerCase();
      if (compStr.includes(searchStr) === false && roleStr.includes(searchStr) === false) {
        keepJob = false;
      }
    }

    if (platformFilter !== '') {
      if (job.platform !== platformFilter) keepJob = false;
    }

    if (locationFilter !== '') {
      if (job.location !== locationFilter) keepJob = false;
    }

    if (keepJob === true) {
      filteredList.push(job);
    }
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (confirmDelete === true) {
      deleteApplication(id);
    }
  };

  let contentArea = null;
  if (filteredList.length === 0) {
    contentArea = <EmptyState title="No jobs found." subtitle="Try a different filter or add a new job." />;
  } else {
    let cardsArray = [];
    for (let i = 0; i < filteredList.length; i++) {
      cardsArray.push(
        <JobCard
          key={filteredList[i].id}
          app={filteredList[i]}
          onDelete={handleDelete}
        />
      );
    }
    contentArea = <div className="jobs-grid">{cardsArray}</div>;
  }

  let tabButtons = [];
  for (let i = 0; i < TABS.length; i++) {
    let tabClass = 'tab-btn';
    if (activeTab === TABS[i]) {
      tabClass = 'tab-btn tab-btn-active';
    }
    tabButtons.push(
      <button key={TABS[i]} className={tabClass} onClick={() => setActiveTab(TABS[i])}>
        {TABS[i]}
      </button>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
      <div className="section-header">
        <h1 className="page-title">Applications</h1>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/applications/new')}>
          + Add Job
        </button>
      </div>

      <div className="tabs-row">
        {tabButtons}
      </div>

      <div className="controls-row">
        <SearchBar onSearch={handleSearch} />

        <Filters
          platformFilter={platformFilter}
          locationFilter={locationFilter}
          onPlatformChange={setPlatformFilter}
          onLocationChange={setLocationFilter}
        />
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
        Found {filteredList.length} jobs.
      </p>

      {contentArea}
    </motion.div>
  );
};

export default Applications;
