import { Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import { useReducer, useState } from 'react';
import MainHeader from './components/MainHeader';
import ChecklistPage from './pages/ChecklistPage';
import LoginPage from './pages/LoginPage';
import checklistsJSON from './checklists.json';
import TaskPage from './pages/TaskPage';

function App() {

  const checklistReducer = (state, action) => {

    switch (action.type) {
      case 'ADD_CHECKLIST':
        return {
          ...state,
          [`${ action.title }`]: {
            Categories: {
              General: [
                {
                  title: 'New Task',
                  complete: false
                }
              ]
            }
          }
        };
      case 'CHECK_TASK':

        let modifiedList = {
          ...state,
          [`${ action.list }`]: {
            Categories: {
              ...state[`${ action.list }`].Categories,
              [`${ action.category }`]: [
                ...state[`${ action.list }`].Categories[`${ action.category }`]
              ]
            }
          }
        };

        let taskToChangeIndex;

        modifiedList[`${ action.list }`].Categories[`${ action.category }`].forEach((element, index) => {
          if (element.title === action.title) {
            taskToChangeIndex = index;
          }
        });
        
        modifiedList[`${ action.list }`].Categories[`${ action.category }`][taskToChangeIndex].complete = action.complete;
        return modifiedList;
      default:
        throw new Error();
    }
  };

  const addChecklist = (listName) => {
    dispatchChecklistState(
      {
        type: 'ADD_CHECKLIST',
        title: listName,
      }
    );
  };

  const changeToTaskPage = (taskName) => {
    setCurrentList(taskName);
  };

  const checkTask = (task) => {

    // console.log(
    //   "List:", currentList,
    //   "Category:", task.category,
    //   "Title:", task.title,
    //   "Complete:", task.complete);

    dispatchChecklistState(
      {
        type: 'CHECK_TASK',
        title: task.title,
        complete: task.complete,
        category: task.category,
        list: currentList
      }


    );
  };

  const [currentList, setCurrentList] = useState();
  const [checklistState, dispatchChecklistState] = useReducer(checklistReducer, checklistsJSON);

  return (
    <div className='App'>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login"></Redirect>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/userinfo/my-checklists" exact>
            <ChecklistPage
              data={ checklistState }
              onAddChecklist={ addChecklist }
              onTaskPageChange={ changeToTaskPage } />
          </Route>
          <Route path="/userinfo/my-checklists/:taskId">
            <TaskPage
              currentChecklist={ currentList }
              checklists={ checklistState }
              onCheck={ checkTask }
            />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
