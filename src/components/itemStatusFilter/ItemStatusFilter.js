import React from 'react';

import './ItemStatusFilter.css';

export default class ItemStatusFilter extends React.Component {

  render() {

    const buttons = [
      { buttonState: 'all', name: 'All' },
      { buttonState: 'active', name: 'Active' },
      { buttonState: 'done', name: 'Done' },
    ];

    const elements = buttons.map(({buttonState, name}) => {

    const { filter, onItemsFiltered } = this.props;

    let classNames = 'btn';
      if(filter.toLowerCase() === name.toLowerCase()) {
        classNames += ' btn-info';
      } else {
        classNames += ' btn-outline-secondary'
      }

    return (
      <button type='button' 
              key = {buttonState}
              className={classNames}
              onClick={() => onItemsFiltered(name.toLowerCase())}>
        {name}</button>
      ); 
    });

    return (
      <div className='btn-group'>
        {elements}       
      </div>
    );
  };
};
