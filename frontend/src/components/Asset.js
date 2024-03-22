import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

// This component acts as loader while actual content is being fetched
const Asset = ({ spinner, src, message }) => {
  // 1 - Spinner appears before content is being loaded
  // 2 - src is mostly a link for an image if no content is found
  // 3 - message appears below the image when no content is found
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
