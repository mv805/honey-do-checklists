import React from 'react';
import classes from './ChecklistPage.module.css';
import pageStyle from './Pages.module.css';
import CategoryFrame from '../UI/CategoryFrame';
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';
import Modal from '../UI/Modal';
import PromptFrame from '../components/PromptFrame';

const ChecklistPage = (props) => {

    const history = useHistory();

    const addChecklist = () => {
        props.onAddChecklist('Test List Confirmed');
    };

    const selectList = (e) => {
        let urlFormat = e.target.innerHTML.replace(/\s/g, '-');
        props.onTaskPageChange(e.target.innerHTML);
        history.push(`/userinfo/my-checklists/${urlFormat}`);
    };

    return (
        <div className={ pageStyle.page }>
        <Modal>
            <PromptFrame />
        </Modal>
            <CategoryFrame title="My Checklists">
                <div className={ classes.lists }>
                    { Object.keys(props.data).map(checklist => {
                        return (
                            <button key={ uniqid() } onClick={selectList}>
                                { checklist }
                            </button>);
                    }) }
                </div>
            </CategoryFrame>
            <button onClick={addChecklist}>Add list</button>
        </div>
    );
};

export default ChecklistPage;