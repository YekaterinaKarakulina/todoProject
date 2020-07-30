import React from 'react';

import './SearchPanel.css';

export default class SearchPanel extends React.Component {

  state = {
    term: ''
  };

  onItemSearched = (event) => {
    const term = event.target.value;
    this.setState({term});
    this.props.onItemSearched(term);
  };

  render() {
    return  (
      <input type='text'
        className='form-control search-input'
        onChange={this.onItemSearched}
        placeholder='Type to search'
        value={this.state.term} />
    );
  };
};
