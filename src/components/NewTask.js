import React, { Fragment, useState } from 'react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './NewTask.module.css';
import Modal from '../UI/Modal';
import PromptFrame from './PromptFrame';

const NewTask = (props) => {

    const [creatingNewTask, setCreatingNewTask] = useState(false);

    const createNewTaskWindow = (

        <Modal>
            <PromptFrame
                title="New Task"
                inputField="Task Description"
                affirmAction="Create"
                onCloseModal={ () => setCreatingNewTask(false) }
                onSubmitInput={ (e) => {
                    props.onCreateNewTask(e);
                    setCreatingNewTask(false);
                } }
            />
        </Modal>
    );

    return (
        <Fragment>
            { creatingNewTask ? createNewTaskWindow : '' }
            <button className={ classes.button } onClick={ () => setCreatingNewTask(true) }>
                <FontAwesomeIcon icon={ faCirclePlus } size="xl" />
            </button>
        </Fragment>
    );
};

export default NewTask;