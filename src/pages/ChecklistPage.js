import React from 'react';
import classes from './ChecklistPage.module.css';
import pageStyle from './Pages.module.css';
import CategoryFrame from '../UI/CategoryFrame';
import uniqid from 'uniqid';

const ChecklistPage = (props) => {
    return (
        <div className={pageStyle.page}>
            <CategoryFrame title="My Checklists">
                <div className={classes.lists}>
                    {Object.keys(props.data).map(checklist => {
                        return <button key={uniqid()}>{checklist}</button>
                    })}
                </div>
            </CategoryFrame>
        </div>
    );
};

export default ChecklistPage;