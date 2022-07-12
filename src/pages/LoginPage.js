import React from 'react';
import CategoryFrame from '../UI/CategoryFrame';
import classes from './LoginPage.module.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className={ classes.login }>
            <CategoryFrame title="Login">
                <h1>Username</h1>
                <p>field</p>
                <h1>Password</h1>
                <p>field</p>
            </CategoryFrame>
            <button><Link to="/userinfo/my-checklists">Submit</Link></button>
        </div>
    );
};

export default LoginPage;

