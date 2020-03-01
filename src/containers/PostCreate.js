import React, {Component} from 'react';
import {Container, Form, Checkbox, Button, Message, Loader} from "semantic-ui-react";
import axios from "axios";
import {postCreateURL, postListURL, UserIdURL} from "../store/constants";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {authAxios} from "../utils";

class PostCreate extends Component {
    state = {
        "user": null,
        "post_name": "",
        "image": null,
        "description": "",
        status: null,
        loader: false
    };

    componentDidMount() {

    }

    postSubmit = () => {
        let form_data = new FormData();
        form_data.append('user', this.props.user.userID);
        form_data.append('post_name', this.state.post_name);
        form_data.append('image', this.state.image, this.state.image.name);
        form_data.append('description', this.state.description);
        this.setState({loader: true})
        axios.post(postCreateURL, form_data)
            .then(res => {
                console.log(res.data)
                this.setState({loader: false})
                this.setState({status: true});
            })
            .catch(err => {
                console.log(err)
                this.setState({status: false})
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

        if (!this.props.authenticated) {
            return <Redirect to="/login"/>;
        }

        if (this.state.loader) {
            return <Loader active inline='centered' />;
        }

        return (
            <Container>
                {
                    this.state.status ? <Message color='green'>Post create successful!</Message> :
                        ''
                }

                <Form onSubmit={this.postSubmit}>
                    <Form.Field>
                        <label>Post*</label>
                        <input placeholder='Post name' name="post_name" onChange={this.handleChange} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <input placeholder='Post description' name="description" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Image*</label>
                        <input type="file" name="image" onChange={this.handleImage} required/>
                    </Form.Field>

                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        user: state.user.userId
    }
};

export default connect(mapStateToProps)(PostCreate);