import React, { useState } from 'react';
import classes from './TaskItem.module.css';
import { faPenToSquare, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../UI/Modal';
import PromptFrame from './PromptFrame';

const TaskItem = (props) => {

    const [isComplete, setIsComplete] = useState(props.isChecked);
    const [isEditingTask, setisEditingTask] = useState(false);

    const editTaskWindow = (

        <Modal>
            <PromptFrame
                title="Edit Task"
                inputField="Task Description"
                affirmAction="Edit"
                deleteItem="Task"
                onDelete={ props.onDeleteTask }
                onCloseModal={ () => setisEditingTask(false) }
                onSubmitInput={ (e) => {
                    props.onChangeTaskName(e);
                    setisEditingTask(false);
                } }
            />
        </Modal>
    );

    const toggleComplete = () => {

        setIsComplete(prevState => !prevState);

        props.onComplete({
            title: props.taskName,
            category: props.taskCategory,
        });
    };

    return (
        <div className={ classes.bar }>
            { isEditingTask ? editTaskWindow : '' }
            <button className={ classes.button } onClick={ () => setisEditingTask(true) }>
                <FontAwesomeIcon icon={ faPenToSquare } size="2x" />
            </button>
            <p>{ props.taskName }</p>
            <button
                className={ `${ classes.button } ${ isComplete ? `${ classes.checked }` : '' }` }
                onClick={ toggleComplete }>
                { !isComplete && <FontAwesomeIcon icon={ faToggleOff } size="3x" /> }
                { isComplete && <FontAwesomeIcon icon={ faToggleOn } size="3x" /> }
            </button>
        </div>
    );
};

export default TaskItem;