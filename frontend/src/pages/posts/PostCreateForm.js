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


function PostCreateForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
  })
  const [categories, setCategories] = useState()
  const {title, content, image, category} = postData
  const history = useHistory()
  // we need to create a  reference to our Form.File component so that we can access the image  file when we submit our form.  
  const imageInput = useRef(null)

  const handleMount = async() => {
    try{
      const {data} = await axiosRes.get('/categories/')
      setCategories(data)
      
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    handleMount()
  },[])

  const handleChange = (event) => {
    setPostData({
        ...postData,
        [event.target.name]: event.target.value,
    })
  }
  console.log(categories)
  const handleSubmit = async (event) => {
    event.preventDefault()
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    // get first file in image attribute files array
    formData.append('image',imageInput.current.files[0])
    formData.append('category',category)
    console.log(postData.category)

    //refresh user access token before making post request
    try{
        const {data} = await axiosReq.post('/products/', formData)
        history.push(`/products/${data.id}`)
    }catch(err){
        console.log(err)
        if(err.response?.status !== 401){
            setErrors(err.response?.data)
        } 
    }
  }

  //https://developer.mozilla.org/en-US/docs/Web/API/URL
const handleChangeImage = (event) => {
  //incase user wants to change the image link after addig on we need to revokeObjectURL_static to clear browser refrence to previous file
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static
  URL.revokeObjectURL(image)
  setPostData({
      ...postData,
      // createObjectURL: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static creates 
      // a local link to the file passed into it, files[0] choose the first files passed to it
      image: URL.createObjectURL(event.target.files[0],),
  })
}

  const textFields = (
    <div className="text-center">
        <Form.Group controlId="title">
            <Form.Label>
                Title
            </Form.Label>
            <Form.Control type="text" name="title" maxLength={35}
            value={title}
            onChange={handleChange} />
        </Form.Group>
        {errors.title?.map((message, idx)=>(
            <Alert variant="warning" key={idx}>{message}</Alert>
        ))}

        <Form.Group controlId="content">
            <Form.Label>
                Content
            </Form.Label>
            <Form.Control as="textarea" rows={6} name="content" maxLength={500}
            value={content}
            onChange={handleChange} />
        </Form.Group>
        {errors.content?.map((message, idx)=>(
            <Alert variant="warning" key={idx}>{message}</Alert>
        ))}

<Form.Group controlId="category">
  <Form.Label>Select Post category</Form.Label>
  <Form.Control as="select" name="category" value={category} onChange={handleChange}>
    {categories ? (
      Object.entries(categories).map(([value, label]) => (
        <option key={value} value={value}>{label}</option>
      ))
    ) : (
      <option>Loading...</option>
    )}
  </Form.Control>
</Form.Group>

    
    
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
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
                {image ? (
                    <>
                        <figure>
                            <Image className={appStyles.Image} src={image} rounded/>
                        </figure>
                        <div>
                            <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="image-upload">
                                Change the image
                            </Form.Label>
                        </div>
                    </>
                ) : (
                    <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload">
                    <Asset src={Upload} message="Click or tap to upload an image" />
                </Form.Label>
                )}
                {/* Image upload '/*' so that only images are accepted */}
                <Form.File
                    id="image-upload" accept="image/*"
                    onChange={handleChangeImage} 
                    ref={imageInput} />
            </Form.Group>
            {errors.image?.map((message, idx)=>(
                <Alert variant="warning" key={idx}>{message}</Alert>
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