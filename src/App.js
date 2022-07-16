import { Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import { useReducer, useState } from 'react';
import MainHeader from './components/MainHeader';
import ChecklistPage from './pages/ChecklistPage';
import LoginPage from './pages/LoginPage';
import checklistDataRaw from './checklists.json';
import TaskPage from './pages/TaskPage';
import uniqid from 'uniqid';

//adding uniq ids for the keys to the raw data
checklistDataRaw.checklists.forEach(checklist => {
  checklist['id'] = uniqid();
  checklist.categories.forEach(category => {
    category['id'] = uniqid();
    category.tasks.forEach(task => {
      task['id'] = uniqid();
    });
  });
});

function App() {

  const checklistReducer = (state, action) => {

    let modifiedList;
    let currentListIndex;
    let categoryIndex;
    let taskIndex;

    switch (action.type) {

      case 'ADD_CHECKLIST':

        //if the list exists, skip instead of overwriting
        if (state.checklists.filter(checklist => checklist.name === action.newListName).length > 0) {
          console.log('List already exists, skipping...');
          return { ...state };
        }

        state.checklists.push(
          {
            id: uniqid(),
            name: action.newListName,
            categories: [
              {
                id: uniqid(),
                name: "New Category",
                tasks: [
                  {
                    title: "New Task",
                    complete: false,
                    id: uniqid()
                  }
                ]
              }
            ]
          }
        );

        return { ...state };

      case 'COMPLETE_TASK':

        currentListIndex = state.checklists.map(list => list.name).indexOf(currentList);

        categoryIndex = state.checklists[currentListIndex].categories.map(category => category.name).indexOf(action.category);

        taskIndex = state.checklists[currentListIndex].categories[categoryIndex].tasks.map(task => task.title).indexOf(action.title);

        state.checklists[currentListIndex].categories[categoryIndex].tasks[taskIndex].complete = !state.checklists[currentListIndex].categories[categoryIndex].tasks[taskIndex].complete;

        return { ...state };

      case 'CHANGE_TASK_CATEGORY_NAME':

        if (action.newName === action.category) {
          return { ...state };
        }

        currentListIndex = state.checklists.map(list => list.name).indexOf(currentList);

        categoryIndex = state.checklists[currentListIndex].categories.map(category => category.name).indexOf(action.category);

        state.checklists[currentListIndex].categories[categoryIndex].name = action.newName;

        return { ...state };

      default:
        throw new Error();
    }
  };

  const addChecklist = (name) => {
    dispatchChecklistState(
      {
        type: 'ADD_CHECKLIST',
        newListName: name,
      }
    );
  };

  const changeToTaskPage = (taskName) => {
    setCurrentList(taskName);
  };

  const checkTask = (taskData) => {

    dispatchChecklistState(
      {
        type: 'COMPLETE_TASK',
        ...taskData
      }

    );
  };

  const changeCategoryName = (newNameData) => {
    dispatchChecklistState(
      {
        type: 'CHANGE_TASK_CATEGORY_NAME',
        ...newNameData
      }
    );
  };

  const [currentList, setCurrentList] = useState();
  const [checklistState, dispatchChecklistState] = useReducer(checklistReducer, checklistDataRaw);

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
              checklistState={ checklistState }
              onAddChecklist={ addChecklist }
              onTaskPageChange={ changeToTaskPage } />
          </Route>
          <Route path="/userinfo/my-checklists/:taskId">
            <TaskPage
              currentChecklist={ checklistState.checklists.filter(checklist => checklist.name ===
                currentList)[0] }
              checklistState={ checklistState }
              onCheck={ checkTask }
              onChangeCategoryName={ changeCategoryName }
            />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
