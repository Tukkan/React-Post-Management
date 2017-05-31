import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import './RemovePost.scss';

class AddPost extends Component {
  constructor(props){
    super(props);

    this.state  = {
      showModal: false
    };
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  remove = () => {
    this.setState({ showModal: false });
    this.props.onRemove();
  };

  render() {
    return (
      <div className="removePostBtn">
        <Button className="btn btn-danger btn-xs" onClick={this.openModal}>Remove</Button>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>No</Button>
            <Button bsStyle="primary" onClick={this.remove}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

AddPost.propTypes = {
  onRemove: PropTypes.func.isRequired
};

export default AddPost;
