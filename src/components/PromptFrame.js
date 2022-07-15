import React, { useState } from 'react';
import classes from './PromptFrame.module.css';

const PromptFrame = (props) => {

    const INPUT_LENGTH_MAX = 50;
    const INPUT_LENGTH_MIN = 1;
    const [formInput, setFormInput] = useState('');
    const [inputIsValid, setInputIsValid] = useState(true);

    const inputFieldHandler = (e) => {
        setInputIsValid(true);
        setFormInput(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!checkValidInput()) {
            return;
        }
        props.onSubmitInput(formInput);
    };

    const checkValidInput = () => {

        if (formInput.length < INPUT_LENGTH_MIN ||
            formInput.length >= INPUT_LENGTH_MAX) {
            setInputIsValid(false);
            return false;
        } else {
            setInputIsValid(true);
            return true;
        }
    };

    return (
        <div className={ classes.frame }>
            <h1>{ props.title }</h1>
            <form className={ classes.input } id='promptframe-input-form'>
                <label htmlFor="promptframe-description-input">{ props.inputField }</label>
                <input
                    type="text"
                    id="promptframe-description-input"
                    minLength={ INPUT_LENGTH_MIN }
                    maxLength={ INPUT_LENGTH_MAX }
                    placeholder="Enter here..."
                    onChange={ inputFieldHandler }
                    className={ !inputIsValid ? classes[`input-invalid`] : '' }
                />
                <div className={ classes.warning }>
                    { !inputIsValid &&
                        <div className={ classes['invalid-msg'] }>
                            { `Must be ${ INPUT_LENGTH_MIN }-${ INPUT_LENGTH_MAX } characters...` }
                        </div> }
                </div>
            </form>
            <div className={ classes.buttons }>
                <button onClick={ props.onCloseModal }>Cancel</button>
                <button
                    type='submit'
                    form='promptframe-input-form'
                    onClick={ submitHandler }>{ props.affirmAction }</button>
            </div>
        </div>
    );
};

export default PromptFrame;