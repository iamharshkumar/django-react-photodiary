import React, {Component} from 'react';
import {Container, Form, Checkbox, Button} from "semantic-ui-react";
import axios from "axios";
import {postListURL} from "../store/constants";

class PostCreate extends Component {
    state = {
        "user": 1,
        "post_name": "",
        "image": null,
        "description": ""
    };

    componentDidMount() {
    }

    postSubmit = () => {
        let form_data = new FormData();
        form_data.append('user', this.state.user);
        form_data.append('post_name', this.state.post_name);
        form_data.append('image', this.state.image, this.state.image.name);
        form_data.append('description', this.state.description);
        axios.post(postListURL, form_data)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleImage = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.postSubmit}>
                    <Form.Field>
                        <label>Post*</label>
                        <input placeholder='Post name' name="post_name" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <input placeholder='Post description' name="description" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Image*</label>
                        <input type="file" name="image" onChange={this.handleImage}/>
                    </Form.Field>

                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default PostCreate;