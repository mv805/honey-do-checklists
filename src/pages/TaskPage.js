import CategoryFrame from '../UI/CategoryFrame';
import pageStyle from './Pages.module.css';
import classes from './TaskPage.module.css';
import TaskItem from '../components/TaskItem';
import NewTask from '../components/NewTask';
import { useState } from 'react';
import Modal from '../UI/Modal';
import PromptFrame from '../components/PromptFrame';
import AddFrameButton from '../components/AddFrameButton';

const TaskPage = (props) => {

    const [addingCategory, setAddingCategory] = useState(false);

    const addingTaskCategory = (
        <Modal>
            <PromptFrame
                title="New Category"
                inputField="Category Title"
                affirmAction="Create"
                onCloseModal={ () => setAddingCategory(false) }
                onSubmitInput={ (e) => {
                    props.onAddTaskCategory(
                        {
                            newCategoryName: e,
                        }
                    );
                    setAddingCategory(false);
                } }
            />
        </Modal>
    );

    return (
        <div className={ pageStyle.page }>
            { addingCategory ? addingTaskCategory : '' }
            <h1 className={ classes.title }>{ props.currentChecklist.name }</h1>
            {
                props.currentChecklist.categories.map(category => {
                    return (
                        <CategoryFrame
                            title={ category.name }
                            key={ category.id }
                            modifyTitle="true"
                            frameType="Category"
                            onSubmitInput={ (e) => {

                                props.onChangeCategoryName(
                                    {
                                        newName: e,
                                        currentList: props.currentChecklist.name,
                                        category: category.name
                                    }
                                );

                            } }>

                            {
                                category.tasks.map((task) => {
                                    return <TaskItem
                                        key={ task.id }
                                        taskCategory={ category.name }
                                        taskName={ task.title }
                                        isChecked={ task.complete }
                                        onComplete={ props.onComplete }
                                        onDeleteTask={ () => {
                                            props.onDeleteTask(
                                                {
                                                    title: task.title,
                                                    category: category.name
                                                }
                                            );
                                        }
                                        }
                                        onChangeTaskName={ (e) => {
                                            props.onChangeTaskName(
                                                {
                                                    oldTitle: task.title,
                                                    newTitle: e,
                                                    category: category.name
                                                }
                                            );
                                        } }
                                    />;
                                })
                            }
                            <NewTask onCreateNewTask={ (e) => {
                                props.onCreateNewTask(
                                    {
                                        taskName: e,
                                        category: category.name
                                    }
                                );
                            } } />
                        </CategoryFrame>
                    );
                })
            }
            <AddFrameButton
                title="Add Category"
                onClick={ () => { setAddingCategory(true); } } />
        </div>
    );

};

export default TaskPage;