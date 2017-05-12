import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import './AddPost.scss';

class AddPost extends Component {
  constructor(props){
    super(props);

    this.state  = {
      showModal: false,
      title: "",
      body: "",
      inputStarted: false,
      formValid: false
    };
  }

  closeModal = () => {
    this.setState({ showModal: false });
    this.resetFields();
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  saveAndClose = () => {
    if(!this.state.inputStarted || !this.state.title || !this.state.body) {
      this.setState({
        inputStarted: true
      });
      return;
    }

    this.props.onSave(this.state.title, this.state.body);
    this.resetFields();
    this.closeModal();
  };

  resetFields = () => {
    this.setState({
      title: "",
      body: "",
      inputStarted: false
    });
  };

  getValidationState = (field) => {
    const length = this.state[field].length;

    if (this.state.inputStarted && length > 3) return 'success';
    else if (this.state.inputStarted && length <= 3) return 'error';
  }

  handleFormChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      inputStarted: true
    });
  }


  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.openModal}>Add Post</Button>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="postTitle" validationState={this.getValidationState('title')}>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  name="title"
                  value={this.state.title}
                  placeholder="Title"
                  onChange={this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="postBody" validationState={this.getValidationState('body')}>
                <ControlLabel>Body</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  name="body"
                  placeholder="Body"
                  value={this.state.body}
                  onChange={this.handleFormChange}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            <Button bsStyle="primary" onClick={this.saveAndClose}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

AddPost.propTypes = {
  onSave: PropTypes.func.isRequired
};

export default AddPost;
