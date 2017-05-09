import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormControl, FormGroup, ControlLabel, FieldGroup } from 'react-bootstrap';

class AddPost extends Component {
  constructor(props){
    super(props);

    this.state  = {
      showModal: false,
      title: "",
      body: ""
    };
    this.close            = this.close.bind(this);
    this.open             = this.open.bind(this);
    this.saveAndClose     = this.saveAndClose.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  saveAndClose() {
    this.props.onSave(this.state.title, this.state.body);
    this.setState({
      title: "",
      body: ""
    });
    this.close();
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.open}>Add Post</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="postTitle">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  name="title"
                  value={this.state.title}
                  placeholder="Title"
                  onChange={this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="postBody">
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
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle="primary" onClick={this.saveAndClose}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

AddPost.propTypes = {};
AddPost.defaultProps = {};

export default AddPost;
