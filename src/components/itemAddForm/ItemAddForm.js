import React from 'react';

import './ItemAddForm.css';

export default class ItemAddForm extends React.Component {
  
  state = {
    label: ''
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.props.onItemAdded(this.state.label);  
    this.setState({
      label: ''
    })  
  };

  render() {
    return (
      <form className='item-add-form d-flex'
            onSubmit={this.submitForm}>
        <input type='text'
              className='form-control'
              onChange={this.onLabelChange}
              placeholder='What need to be done?'
              value={this.state.label} />
        <button className='btn btn-outline-secondary'>
          Add</button>
      </form>
    )
  }
} 