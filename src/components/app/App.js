import React from 'react';

import AppHeader from '../appHeader';
import SearchPanel from '../searchPanel';
import TodoList from '../todoList';
import ItemStatusFilter from '../itemStatusFilter';
import ItemAddForm from '../itemAddForm';

import './App.css';

export default class App extends React.Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'), 
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: ''
  }

  createTodoItem(label) {
    return  {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };
  
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newTodoData = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1)
      ];
      return {
        todoData: newTodoData
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData })=> {
      const newTodoData = [...todoData, newItem];
      return {
        todoData: newTodoData
      }
    });
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);

    const oldItem = arr[index];
    const newItem = {...oldItem, 
      [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index + 1)
    ];
  }

  toggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
     });
  };

  toggleDone = (id) => {
    this.setState(({todoData}) => {
     return {
       todoData: this.toggleProperty(todoData, id, 'done')
     }
    });
  };

  onItemSearched = (term) => {
    this.setState({ term });
  }

  searchItems(arr, term) {
    if(term === 0) {
      return arr;
    }
    return arr.filter((el) => el.label
      .toLowerCase()
      .includes(term.toLowerCase()));
  };

  render() {
    const { todoData, term } = this.state;;

    const visibleItems = this.searchItems(todoData, term);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className='top-panel d-flex'>
          <SearchPanel onItemSearched={this.onItemSearched}/>
          <ItemStatusFilter />
        </div>
        <TodoList 
          todos={visibleItems}
          onDeleted={ this.deleteItem }
          onToggleImportant={this.toggleImportant}
          onToggleDone={this.toggleDone} />
          <ItemAddForm onItemAdded={this.addItem} /> 
      </div>
    )
  }
};
