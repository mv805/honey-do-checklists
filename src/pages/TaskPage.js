import React from 'react';
import CategoryFrame from '../UI/CategoryFrame';
import pageStyle from './Pages.module.css';
import classes from './TaskPage.module.css';
import uniqid from 'uniqid';
import TaskItem from '../components/TaskItem';

const TaskPage = (props) => {

    const categories = props.checklists[`${ props.currentChecklist }`].Categories;

    return (
        <div className={ pageStyle.page }>
            <h1 className={ classes.title }>{ props.currentChecklist }</h1>
            {
                Object.entries(categories).map(([category, tasks]) => {
                    return (
                        <CategoryFrame title={ category } key={ uniqid() }>
                            {
                                tasks.map((task) => {
                                    return <TaskItem 
                                    key={ uniqid() } 
                                    taskCategory={category}
                                    taskName={ task.title }
                                    isChecked={task.complete}
                                    onCheck = {(e) => {props.onCheck(e)}}
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