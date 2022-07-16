import React, { useState } from 'react';
import classes from './TaskItem.module.css';
import { faPenToSquare, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TaskItem = (props) => {

    const [isChecked, setIsChecked] = useState(props.isChecked);

    const toggleCheck = () => {

        setIsChecked(prevState => !prevState);

        props.onCheck({
            title: props.taskName,
            category: props.taskCategory,
        });
    };

    return (
        <div className={ classes.bar }>
            <button className={ classes.button }>
                <FontAwesomeIcon icon={ faPenToSquare } size="2x" />
            </button>
            <p>{ props.taskName }</p>
            <button
                className={ `${ classes.button } ${ isChecked ? `${ classes.checked }` : '' }` }
                onClick={ toggleCheck }>
                { !isChecked && <FontAwesomeIcon icon={ faToggleOff } size="3x" /> }
                { isChecked && <FontAwesomeIcon icon={ faToggleOn } size="3x" /> }
            </button>
        </div>
    );
};

export default TaskItem;