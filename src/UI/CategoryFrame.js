import React from 'react';
import classes from './CategoryFrame.module.css';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryFrame = (props) => {
    return (
        <div className={ classes.frame }>
            <div className={classes.header}>
                <h1>{ props.title }</h1>
                <button>
                    <FontAwesomeIcon icon={ faPenToSquare } size="lg" className={classes['header-icon']}/>
                </button>
            </div>
            <div className={ classes.window }>
                { props.children }
            </div>
        </div>
    );
};

export default CategoryFrame;