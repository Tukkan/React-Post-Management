import React, { Component } from 'react';
import 'whatwg-fetch';
import PropTypes from 'prop-types';
import './UsersList.scss';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUserIdx: null
    }
  }

  renderUsersList = (data) => data.map((userData, index) => {
    return (
      <label key={index}>
        <input type="radio"
           value={index}
           checked={this.state.selectedUserIdx === index}
           onChange={this.onSelect} />
        {userData.username}
      </label>
    )
  });

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      selectedUserIdx: this.props.data.findIndex((usr) => nextProps.selectedId === usr.id)
    })
  };

  onSelect = (e) => {
    this.setState({
      selectedUserIdx: parseInt(e.target.value, 10)
    });

    this.props.onChange(this.props.data[e.target.value]);
  };

  render() {
    return (
      <div className="usersList">
        <h4>Users:</h4>
        <div className="inputs">
        {
          this.renderUsersList(this.props.data)
        }
        </div>
      </div>
    )
  }
}

UsersList.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedId: PropTypes.number
};

export default UsersList;