import React, { useState } from 'react';
import classes from './ChecklistPage.module.css';
import pageStyle from './Pages.module.css';
import CategoryFrame from '../UI/CategoryFrame';
import uniqid from 'uniqid';
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
                    { Object.keys(props.data).map(checklist => {
                        return (
                            <button key={ uniqid() } onClick={ selectList }>
                                { checklist }
                            </button>);
                    }) }
                </div>
            </CategoryFrame>
            {/* <button onClick={ () => { setAddingList(true); } }>Add list</button> */}
            <AddFrameButton title="Add Checklist" onClick={ () => { setAddingList(true); } }/>
        </div>
    );
};

export default ChecklistPage;