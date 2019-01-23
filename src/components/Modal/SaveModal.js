import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import './SaveModal.scss';

class SaveModal extends React.Component {
  static propTypes = {
    saveStock: PropTypes.func,
    setQuanitiy: PropTypes.func,
    companyName: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      saved: false,
      quantity: 0,
    };

    this.toggle = this.toggle.bind(this);
  }

  // Indicates to user that save was complete
  indicateSaved() {
    this.setState({
      saved: true,
    });
  }

  // toggles Modal
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  updateQuantity() {
    const currentQuant = document.getElementById('quantityToSave').value;
    this.props.setQuanitiy(currentQuant);
  }

  render() {
    if (this.state.saved) {
      return (
        <div>
          <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{this.props.companyName}</ModalHeader>
            <ModalBody>
              Saved!
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.companyName}</ModalHeader>
          <ModalBody>
            Add
            <InputGroup>
              <Input
              id='quantityToSave'
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>Shares</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
              this.updateQuantity();
              this.props.saveStock();
              this.indicateSaved();
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
