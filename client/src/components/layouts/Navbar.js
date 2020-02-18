import React,{ Component } from 'react';
import { FaAlignRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Logo from '../../images/logo.png';


export default class Navbar extends Component{
    state={
        isOpen: false
    }

    handleToggle = () => {
        this.setState({
            isOpen: !isOpen
        });
    }

    render(){
        return(
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/"><img src={ Logo } alt="Coding Finance"></img></Link>
                        <button type="button"
                            onClick={this.handleToggle}
                            className="nav-btn">
                            <FaAlignRight className="nav-icon"></FaAlignRight>
                        </button>
                    </div>               
                    <ul className={ this.state.isOpen? "nav-links show-links" :" show-links"} >
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>                
            </nav>
        )
    }
}