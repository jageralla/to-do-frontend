import React from 'react';

const FilterNavItem = ({ filter, currentFilter, setFilter, children }) => {
  return (
    <li
      role="presentation"
      className={`nav-item ${filter === currentFilter ? 'active' : ''}`}
      onClick={() => setFilter(filter)}
    >
      <a href="#" className={`nav-link ${filter === currentFilter ? 'active-link' : ''} fw-bold`}>
        {children}
      </a>
    </li>
  );
};

export default FilterNavItem;
