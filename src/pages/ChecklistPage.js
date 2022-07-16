import React, { useState } from 'react';
import classes from './ChecklistPage.module.css';
import pageStyle from './Pages.module.css';
import CategoryFrame from '../UI/CategoryFrame';
import { useHistory } from 'react-router-dom';
import Modal from '../UI/Modal';
import PromptFrame from '../components/PromptFrame';
import AddFrameButton from '../components/AddFrameButton';

const ChecklistPage = (props) => {

    const history = useHistory();
    const [addingList, setAddingList] = useState(false);

    const selectList = (e) => {
        let urlFormat = e.target.innerHTML.replace(/\s/g, '-');
        props.onTaskPageChange(e.target.innerHTML);
        history.push(`/userinfo/my-checklists/${ urlFormat }`);
    };

    const addChecklistModal = (
        <Modal>
            <PromptFrame
                title="New Checklist"
                inputField="Checklist Title"
                affirmAction="Create"
                onCloseModal={ () => { setAddingList(false); } }
                onSubmitInput={ (e) => {
                    props.onAddChecklist(e);
                    setAddingList(false);
                } }
            />
        </Modal>);

    return (
        <div className={ pageStyle.page }>
            { addingList ? addChecklistModal : '' }
            <CategoryFrame title="My Checklists">
                <div className={ classes.lists }>
                    {
                        props.checklistState.checklists.map(checklist => {
                            return (
                                <button key={ checklist.id } onClick={ selectList }>
                                    { checklist.name }
                                </button>
                            );
                        })
                    }
                </div>
            </CategoryFrame>
            <AddFrameButton
                title="Add Checklist"
                onClick={ () => { setAddingList(true); } } />
        </div>
    );
};

export default ChecklistPage;