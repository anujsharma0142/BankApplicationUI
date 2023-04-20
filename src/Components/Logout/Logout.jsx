import React ,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router';
import { DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { UncontrolledDropdown } from 'reactstrap';
// import './Logout.css';

function clearLocalStorage(nav) {
    localStorage.removeItem("token");
    nav('/login');
}
function Logout({resouceName}) {
    const navigate = new useNavigate();
    return (
        <div>            
            <div className='btn btn-danger' onClick={(nav)=>clearLocalStorage(navigate)}>
                Logout
            </div>
        </div>
    );
}

export default Logout;