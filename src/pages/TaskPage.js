import React from 'react';
import CategoryFrame from '../UI/CategoryFrame';
import pageStyle from './Pages.module.css';
import classes from './TaskPage.module.css';
import TaskItem from '../components/TaskItem';

const TaskPage = (props) => {

    return (
        <div className={ pageStyle.page }>
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
                                        onCheck={ props.onCheck }
                                    />;
                                })
                            }
                        </CategoryFrame>
                    );
                })
            }
        </div>
    );

};

export default TaskPage;