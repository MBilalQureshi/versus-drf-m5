import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import modalStyles from '../styles/Modal.module.css';

const ModalHandler = (props) => {
  const { rules, show, close , title} = props;

  const ruleItems = Object.entries(rules).map(([key, value], idx) => (
    <div key={idx} className={modalStyles.RuleItem}>
      <h6>{key}</h6>
      <p>{value}</p>
    </div>
  ));

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={modalStyles.RuleList}>
          {ruleItems}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalHandler;
