import { useState, useEffect } from 'react';
import '../styles/Filter.css';
import { fetchCategories } from '../api';

const Filter = ({ onPageSizeChange, onSearch, filters, filterValues, setFilterValues, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res.data || []); // Expecting an array of category strings
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 100);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm, onSearch]);
  
  const handleFilterChange = (field, value) => {
    const newFilterValues = { [field]: value };
    setFilterValues(newFilterValues);
    onFilterChange(field, value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="filter-container" onKeyPress={handleKeyPress}>
      {/* Search Section */}
      <div className="search-section">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search table..."
            className="search-input"
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="page-size">Items per page</label>
          <select
            id="page-size"
            onChange={(e) => onPageSizeChange(e.target.value)}
            defaultValue="5"
            className="page-size-select"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        {filters.map((filter) => (
          <div className="filter-group" key={filter.field}>
            <label htmlFor={filter.field}>{filter.label}</label>
            {filter.field === "category" ? (
              <select
                id={filter.field}
                onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                className="filter-select"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option value={cat.slug} key={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={filter.field}
                placeholder={`Filter by ${filter.label}`}
                value={filterValues[filter.field] || ""}
                onChange={(e) => setFilterValues((prev) => ({ [filter.field]: e.target.value }))}
                onBlur={(e) => handleFilterChange(filter.field, e.target.value)}
                className="filter-input"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;