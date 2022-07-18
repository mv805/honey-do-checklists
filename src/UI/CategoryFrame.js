import React, { useState } from 'react';
import classes from './CategoryFrame.module.css';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import PromptFrame from '../components/PromptFrame';

const CategoryFrame = (props) => {

    const [modifyingFrame, setModifyingFrame] = useState(false);

    const editButton = (
        <button onClick={ () => setModifyingFrame(true) }>
            <FontAwesomeIcon
                icon={ faPenToSquare }
                size="lg"
                className={ classes['header-icon'] } />
        </button>
    );

    const modifyFrameTitleWindow = (
        <Modal>
            <PromptFrame
                title={ `Modify ${ props.frameType }` }
                inputField="New Description"
                affirmAction="Modify"
                onCloseModal={ () => setModifyingFrame(false) }
                onSubmitInput={ (e) => {
                    props.onSubmitInput(e);
                    setModifyingFrame(false);
                } }
            />
        </Modal>
    );

    return (
        <div className={ classes.frame }>
            { modifyingFrame ? modifyFrameTitleWindow : '' }
            <div className={ classes.header }>
                <h1>{ props.title }</h1>
                { props.modifyTitle ? editButton : '' }
            </div>
            <div className={ classes.window }>
                { props.children }
            </div>
        </div>
    );
};

export default CategoryFrame;