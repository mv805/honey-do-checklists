import React from 'react';
import classes from './CategoryFrame.module.css';

const CategoryFrame = (props) => {
    return (
        <div className={ classes.frame }>
            <h1>{ props.title }</h1>
            <div className={ classes.window }>
                { props.children }
            </div>
        </div>
    );
};

export default CategoryFrame;