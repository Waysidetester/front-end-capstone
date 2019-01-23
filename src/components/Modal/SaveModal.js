import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import './SaveModal.scss';

class SaveModal extends React.Component {
  static propTypes = {
    saveStock: PropTypes.func,
    quantityToSave: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      saved: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  indicateSaved() {
    this.setState({
      saved: true,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    if (this.state.saved) {
      return (
        <div>
          <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Saved!
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
              this.indicateSaved();
              this.props.saveStock();
            }
              }>Save Stock</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SaveModal;
