import React from 'react'
import { Link} from 'react-router-dom'

const DashboardAction=()=>{
    return(
<div className="dash-buttons">
        <Link to="/edit-profile" className="btn bg-deep-purple2"
          ><i className="fas fa-user-circle text-primary"/> Edit Profile</Link>
        <Link to="/add-experience" className="btn bg-deep-purple2"
          ><i className="fab fa-black-tie text-primary"/> Add Experience</Link>
        <Link to="/add-education" className="btn bg-deep-purple2"
          ><i className="fas fa-graduation-cap text-primary"/> Add Education</Link>
      </div>
    )
}

export default DashboardAction