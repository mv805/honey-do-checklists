import React, {useState} from 'react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './AddFrameButton.module.css';

const AddFrameButton = (props) => {

    const [hovering, setHovering] = useState(false);
    return (
        <button
            className={ classes.button }
            onClick={ props.onClick }
            onMouseEnter={ () => { setHovering(true) } }
            onMouseLeave={ () => {setHovering(false)}}>
            <h1 className={hovering ? classes.highlight : ''}>{ props.title }</h1>
            <FontAwesomeIcon icon={ faCirclePlus } size="2x" />
        </button>
    );
};

export default AddFrameButton;