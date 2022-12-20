import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="Nav">
        <Link to='/register'>Create Account</Link> | <Link to='/login'>Login</Link>
    </div>
  );
}

export default Nav;