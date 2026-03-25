import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

import { useApplications } from '../hooks/useApplications';
import { STATUSES, PLATFORMS, LOCATIONS } from '../utils/helpers';

const schema = yup.object({
  company: yup.string().required('Required'),
  role: yup.string().required('Required'),
  status: yup.string().required('Required'),
  appliedDate: yup.string().required('Required'),
  location: yup.string(),
  platform: yup.string(),
  salary: yup.number().nullable().transform((val, orig) => (orig === '' ? null : val)),
  interviewDate: yup.string(),
  notes: yup.string(),
});

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplication, updateApplication } = useApplications();

  const selectedJob = getApplication(id);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (selectedJob !== null) {
      reset({
        company: selectedJob.company,
        role: selectedJob.role,
        status: selectedJob.status,
        appliedDate: selectedJob.appliedDate || '',
        location: selectedJob.location || 'Remote',
        platform: selectedJob.platform || 'LinkedIn',
        salary: selectedJob.salary || '',
        interviewDate: selectedJob.interviewDate || '',
        notes: selectedJob.notes || '',
      });
    }
  }, [selectedJob, reset]);

  if (selectedJob === null) {
    return <div className="page-content">Job not found!</div>;
  }

  const onSubmit = (formData) => {
    updateApplication(id, formData);
    toast.success('Changes Saved!');
    navigate('/applications');
  };

  let companyError = null;
  if (errors.company) companyError = <p className="form-error">{errors.company.message}</p>;

  let roleError = null;
  if (errors.role) roleError = <p className="form-error">{errors.role.message}</p>;

  let dateError = null;
  if (errors.appliedDate) dateError = <p className="form-error">{errors.appliedDate.message}</p>;

  let locationOptions = [];
  for (let i = 0; i < LOCATIONS.length; i++) {
    locationOptions.push(<option key={LOCATIONS[i]} value={LOCATIONS[i]}>{LOCATIONS[i]}</option>);
  }

  let statusOptions = [];
  for (let i = 0; i < STATUSES.length; i++) {
    statusOptions.push(<option key={STATUSES[i]} value={STATUSES[i]}>{STATUSES[i]}</option>);
  }

  let platformOptions = [];
  for (let i = 0; i < PLATFORMS.length; i++) {
    platformOptions.push(<option key={PLATFORMS[i]} value={PLATFORMS[i]}>{PLATFORMS[i]}</option>);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
      <h1 className="page-title">Edit Job</h1>

      <div className="form-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">

            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input {...register('company')} className="form-input" />
              {companyError}
            </div>

            <div className="form-group">
              <label className="form-label">Job Role *</label>
              <input {...register('role')} className="form-input" />
              {roleError}
            </div>

            <div className="form-group">
              <label className="form-label">Current Status *</label>
              <select {...register('status')} className="form-select">
                {statusOptions}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Application Platform</label>
              <select {...register('platform')} className="form-select">
                {platformOptions}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location Type</label>
              <select {...register('location')} className="form-select">
                {locationOptions}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date Applied *</label>
              <input {...register('appliedDate')} type="date" className="form-input" />
              {dateError}
            </div>

            <div className="form-group">
              <label className="form-label">Interview Date</label>
              <input {...register('interviewDate')} type="date" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Salary Range (per year)</label>
              <input {...register('salary')} type="number" placeholder="e.g. 80000" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea {...register('notes')} className="form-input" rows="3" placeholder="Any notes about this application..."></textarea>
            </div>

          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditApplication;
