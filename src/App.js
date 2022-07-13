import { Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import { useReducer, useState } from 'react';
import MainHeader from './components/MainHeader';
import ChecklistPage from './pages/ChecklistPage';
import LoginPage from './pages/LoginPage';
import checklists from './checklists.json';
import TaskPage from './pages/TaskPage';

function App() {

  const checklistReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_LIST':
        return {
          ...state,
          [`${ action.title }`]: {
            Categories: {
              General: []
            }
          }
        };
      default:
        throw new Error();
    }
  };

  const addChecklist = (listName) => {
    dispatchChecklistState(
      {
        type: 'ADD_LIST',
        title: listName
      }
    );
  };
  const changeToTaskPage = (taskName) => {
    setCurrentList(taskName);
  };

  const [currentList, setCurrentList] = useState("Daily Chores");
  const [checklistState, dispatchChecklistState] = useReducer(checklistReducer, checklists);

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
            <TaskPage currentChecklist={currentList} checklists={ checklistState }/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
