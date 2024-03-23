import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Upload from "../../assets/upload.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import ModalHandler from "../../components/ModalHandler";

// This component handles the post creation
function PostCreateForm() {
  // Redirect user based on authentication status
  useRedirect("loggedOut");

  // This takes care of error state 
  const [errors, setErrors] = useState({});

  // This state sets the post creation form fields
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    price: 0,
    location: "",
    privacy: 0,
  });

  // Sets categories of product
  const [categories, setCategories] = useState();

  // Destructring post data fields
  const { title, content, image, category, price, location, privacy } =
    postData;

  // Setting modal rules
  const [rules, SetRules] = useState({
    "Private Post":
      "To keep post private, make sure to toggle Priavte Post section.",
    "Image Size": "Image size must not increase 2MB.",
    Title: "Maximum length of title is 35.",
    Content: "Maximum content length is 500.",
    Price: "Ensure that there are no more than 6 digits in total.",
    Location: "Make sure a location is a correct place.",
    Category: "User must select a category, else others are set by default.",
    Post: "The posts must be related to products and products only.",
  });

  // This state handles modal state
  const [showModal, SetShowModal] = useState(false);

  // History to navigate user to other parts of website
  const history = useHistory();

  //Refernece the image element
  const imageInput = useRef(null);

  // Set categories data once mounted on page load
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("/categories/");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleMount();
  }, []);

  // Set fields data if had value, set toggle value if checked
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setPostData({
      ...postData,
      [name]: newValue,
    });
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("image", imageInput.current.files[0]);
    formData.append("category", category);
    formData.append("privacy", privacy);

    try {
      const { data } = await axiosReq.post("/products/posts/", formData);
      history.push(`/products/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // Handles if any change occurs in an image field
  const handleChangeImage = (event) => {
    URL.revokeObjectURL(image);
    setPostData({
      ...postData,
      image: URL.createObjectURL(event.target.files[0]),
    });
  };

  // Setting JSX for form data
  const textFields = (
    <div className="text-center">
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          maxLength={35}
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          maxLength={500}
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          maxLength={8}
          value={price}
          min={0}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          maxLength={35}
          value={location}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.location?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="category">
        <Form.Label>Select Post category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          {categories ? (
            Object.entries(categories).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </Form.Control>
      </Form.Group>

      <div>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Black} mb-2`}
          onClick={() => SetShowModal(true)}
        >
          Post creation rules
        </Button>
        <ModalHandler
          show={showModal}
          close={() => SetShowModal(false)}
          rules={rules}
          title="Post creation rules"
        />
      </div>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mt-4">
        <Col>
          <Form.Group
            controlId="privacy"
            className={`${appStyles.Content} text-center`}
          >
            <Form.Check
              type="switch"
              id="privacy"
              name="privacy"
              label="Private Post ?"
              value={privacy}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
