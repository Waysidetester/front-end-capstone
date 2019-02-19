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
    savedStockObj: PropTypes.shape({
      isRemoved: PropTypes.bool,
      ticker: PropTypes.string,
      originTimestamp: PropTypes.number,
      originPrice: PropTypes.number,
      uid: PropTypes.string,
    }),
    companyName: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      saved: false,
      quantity: 0,
      validInput: true,
    };

    this.toggle = this.toggle.bind(this);
  }

  // Indicates to user that save was complete
  indicateSaved() {
    this.setState({
      saved: true,
    });
  }

  resetSaved() {
    this.setState({
      saved: false,
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
    this.props.savedStockObj.quantity = (currentQuant * 1);
  }

  render() {
    const quantValidator = () => {
      if (!isNaN(this.props.savedStockObj.quantity)) {
        this.setState({
          validInput: true,
        });
        this.props.saveStock();
        this.indicateSaved();
      } else {
        this.setState({
          validInput: false,
        });
      }
    };

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
              <Button color="secondary" onClick={() => {
                this.toggle();
                this.resetSaved();
              }}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
    return (
      <div>
        <Button
        color="info"
        onClick={this.toggle}
        className='save-modal-toggler'
        >
          {this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.companyName}</ModalHeader>
          <ModalBody>
            Add
            <InputGroup>
              <Input
              className={this.state.validInput ? '' : 'is-invalid'}
              id='quantityToSave'
              autoComplete="off"
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>Shares</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
              this.updateQuantity();
              quantValidator();
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
