import { STATUSES, PLATFORMS, LOCATIONS } from '../utils/helpers';

const Filters = ({ platformFilter, locationFilter, onPlatformChange, onLocationChange }) => {

  let platformOptions = [];
  for (let i = 0; i < PLATFORMS.length; i++) {
    platformOptions.push(<option key={PLATFORMS[i]} value={PLATFORMS[i]}>{PLATFORMS[i]}</option>);
  }

  let locationOptions = [];
  for (let i = 0; i < LOCATIONS.length; i++) {
    locationOptions.push(<option key={LOCATIONS[i]} value={LOCATIONS[i]}>{LOCATIONS[i]}</option>);
  }

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

      <select
        value={platformFilter}
        onChange={(e) => onPlatformChange(e.target.value)}
        className="form-select"
        style={{ maxWidth: '180px' }}
      >
        <option value="">All Platforms</option>
        {platformOptions}
      </select>

      <select
        value={locationFilter}
        onChange={(e) => onLocationChange(e.target.value)}
        className="form-select"
        style={{ maxWidth: '180px' }}
      >
        <option value="">All Locations</option>
        {locationOptions}
      </select>
    </div>
  );
};

export default Filters;
