import { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import useDebounce from '../hooks/useDebounce';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
        <MdSearch size={18} />
      </span>
      <input
        type="text"
        placeholder="Search by company or role..."
        value={inputValue}
        onChange={handleChange}
        className="form-input"
        style={{ paddingLeft: '34px', minWidth: '260px' }}
      />
    </div>
  );
};

export default SearchBar;
