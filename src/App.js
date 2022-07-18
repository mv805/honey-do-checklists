import { Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import { useReducer, useState } from 'react';
import MainHeader from './components/MainHeader';
import ChecklistPage from './pages/ChecklistPage';
import LoginPage from './pages/LoginPage';
import checklistDataRaw from './checklists.json';
import TaskPage from './pages/TaskPage';
import uniqid from 'uniqid';

//adding uniq ids for the keys into the raw data
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

    let currentListIndex;
    let categoryIndex;
    let taskIndex;

    currentListIndex = state.checklists.map(list => list.name).indexOf(currentList);
    categoryIndex = state.checklists[currentListIndex].categories.map(category => category.name).indexOf(action.category);

    switch (action.type) {

      case 'ADD_CHECKLIST':

        //if the list exists, skip instead of overwriting
        if (state.checklists.filter(checklist => checklist.name.toUpperCase() === action.newListName.toUpperCase()).length > 0) {
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

        taskIndex = state.checklists[currentListIndex].categories[categoryIndex].tasks.map(task => task.title).indexOf(action.title);

        state.checklists[currentListIndex].categories[categoryIndex].tasks[taskIndex].complete = !state.checklists[currentListIndex].categories[categoryIndex].tasks[taskIndex].complete;

        return { ...state };

      case 'CHANGE_TASK_CATEGORY_NAME':

        if (action.newName === action.category) {
          return { ...state };
        }

        state.checklists[currentListIndex].categories[categoryIndex].name = action.newName;

        return { ...state };

      case 'ADD_NEW_TASK':

        if (state.checklists[currentListIndex].categories[categoryIndex].tasks.filter(task => task.title.toUpperCase() === action.taskName.toUpperCase()).length > 0) {
          console.log('Task already exists (already on the list), skipping...');
          return { ...state };
        }

        state.checklists[currentListIndex].categories[categoryIndex].tasks.push(
          {
            title: action.taskName,
            complete: false,
            id: uniqid()
          }
        );

        return { ...state };

      case 'DELETE_TASK':

        taskIndex = state.checklists[currentListIndex].categories[categoryIndex].tasks.findIndex(task => task.title === action.title);

        state.checklists[currentListIndex].categories[categoryIndex].tasks.splice(taskIndex, 1);

        return { ...state };

      case 'CHANGE_TASK_NAME':

        if (state.checklists[currentListIndex].categories[categoryIndex].tasks.filter(task => task.title.toUpperCase() === action.newTitle.toUpperCase()).length > 0) {
          console.log('Task already exists (same name on the list), skipping...');
          return { ...state };
        }

        taskIndex = state.checklists[currentListIndex].categories[categoryIndex].tasks.findIndex(task => task.title === action.oldTitle);
        
        state.checklists[currentListIndex].categories[categoryIndex].tasks[taskIndex].title = action.newTitle;

        return { ...state };

      default:
        throw new Error();
    }
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
              onAddChecklist={ (e) => dispatchChecklistState({ type: `ADD_CHECKLIST`, ...e }) }
              onTaskPageChange={ (e) => setCurrentList(e) } />
          </Route>
          <Route path="/userinfo/my-checklists/:taskId">
            <TaskPage
              currentChecklist={ checklistState.checklists.filter(checklist => checklist.name ===
                currentList)[0] }
              checklistState={ checklistState }
              onComplete={ (e) => dispatchChecklistState({ type: `COMPLETE_TASK`, ...e }) }
              onCreateNewTask={ (e) => dispatchChecklistState({ type: `ADD_NEW_TASK`, ...e }) }
              onChangeCategoryName={ (e) => dispatchChecklistState({ type: `CHANGE_TASK_CATEGORY_NAME`, ...e }) }
              onDeleteTask={ (e) => dispatchChecklistState({ type: `DELETE_TASK`, ...e }) }
              onChangeTaskName={ (e) => dispatchChecklistState({ type: `CHANGE_TASK_NAME`, ...e }) }
            />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
