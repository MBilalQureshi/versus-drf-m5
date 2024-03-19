import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";


import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";


function PostEditForm() {
    const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    price:0,
    location:'',
    privacy: 0,
  })
  const [categories, setCategories] = useState()
  const {title, content, image, category, price, location, privacy} = postData
  const history = useHistory()
  // we need to create a  reference to our Form.File component so that we can access the image  file when we submit our form.  
  const imageInput = useRef(null)

  
  const handleMount = async() => {
    try{
        const [{data: categories},{data:postData}] = await Promise.all([
            axiosRes.get('/categories/'),
            axiosReq.get(`/products/posts/${id}/`)
          ])
      const {title, content, image, is_owner, category, price, location, privacy} = postData
      console.log(privacy)
      setCategories(categories)
      is_owner ? setPostData({ title, content, image, is_owner, category, price, location,  privacy }) : history.push('/')
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    handleMount()
  },[history,id])

  // const handleChange = (event) => {
  //   setPostData({
  //       ...postData,
  //       [event.target.name]: event.target.value,
  //   })
  // }
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setPostData({
        ...postData,
        [name]: newValue,
    });
};
  console.log(categories)
  const handleSubmit = async (event) => {
    event.preventDefault()
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('price',price)
    formData.append('location',location)
    if(imageInput?.current?.files[0]){
        formData.append('image',imageInput.current.files[0]);
    }
    formData.append('category',category)
    formData.append('privacy',privacy)
    console.log(postData.category)

    //refresh user access token before making post request
    try{
        await axiosReq.put(`/products/posts/${id}/`, formData)
        history.push(`/products/posts/${id}`)
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

          <Form.Group controlId="price">
            <Form.Label>
                Price
            </Form.Label>
            <Form.Control type="number" name="price" maxLength={8}
            value={price}
            min={0}
            onChange={handleChange} />
        </Form.Group>
        {errors.price?.map((message, idx)=>(
            <Alert variant="warning" key={idx}>{message}</Alert>
        ))}

        <Form.Group controlId="location">
            <Form.Label>
                Location
            </Form.Label>
            <Form.Control type="text" name="location" maxLength={35}
            value={location}
            onChange={handleChange} />
        </Form.Group>
        {errors.location?.map((message, idx)=>(
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
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mt-4">
        <Col>
        <Form.Group controlId="privacy" className={`${appStyles.Content} text-center`}>
            <Form.Check 
            type="switch"
            id="privacy"
            name="privacy"
            label="Private Post ?"
            checked={privacy}
            value={privacy}
            onChange={handleChange} />
            </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
                
                        <figure>
                            <Image className={appStyles.Image} src={image} rounded/>
                        </figure>
                        <div>
                            <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="image-upload">
                                Change the image
                            </Form.Label>
                        </div>
                    
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


export default PostEditForm;