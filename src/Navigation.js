import React from 'react';
import {Link} from 'react-router-dom';

function Navigation(){
    return(
        <nav>
            <ul className="nav-links">
                <Link className = {'navStyle'} to='/'>
                <li>ORDO</li>
                </Link>
                <Link className = 'navStyle' to='/profile'>
                <li>Profile</li>
                </Link>
                <Link className = 'navStyle' to = 'options'>
                <li>WeekTable</li>
                </Link>
            </ul>

        </nav>
    )
}

export default Navigation;