import React from 'react';
import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div className="no-match">
      <h2>Page Not Found</h2>
      <p>
        Sorry, the page you are looking for does not exist. Go back to the <Link to="/">homepage</Link>.
      </p>
    </div>
  );
}

export default NoMatch;
