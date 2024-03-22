import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import modalStyles from "../styles/Modal.module.css";

// This component handles the modals of web page
const ModalHandler = (props) => {
  // 1 - Rules contains all the important data of modal
  // 2 - Show when true shows the modal
  // 3 - Close when true closes the modal
  // 4 - Title has the title of modal
  const { rules, show, close, title } = props;

  const ruleItems = Object.entries(rules).map(([key, value], idx) => (
    <div key={idx} className={modalStyles.RuleItem}>
      <h6>{key}</h6>
      <p>{value}</p>
    </div>
  ));

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton className={modalStyles.header}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={modalStyles.body}>
        <div className={modalStyles.RuleList}>{ruleItems}</div>
      </Modal.Body>
      <Modal.Footer className={modalStyles.footer}>
        <Button onClick={close} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalHandler;
