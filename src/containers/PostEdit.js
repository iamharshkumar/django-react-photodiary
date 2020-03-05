import React, {Component} from 'react';
import {Container, Form, Checkbox, Button, Message, Loader} from "semantic-ui-react";
import axios from "axios";
import {postDetailURL} from "../store/constants";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class PostEdit extends Component {
    state = {
        "user": null,
        "post_name": "",
        "image": null,
        "description": "",
        status: null,
        loader: false,
    };

    componentDidMount() {
        const {post} = this.props;
        this.setState({"post_name": post.post_name});
        this.setState({"description": post.description})
    }

    postSubmit = () => {
        let form_data = new FormData();
        const {id} = this.props.match.params;
        form_data.append('user', this.props.user.userID);
        if (this.state.post_name) {
            form_data.append('post_name', this.state.post_name);
        }
        if (this.state.description) {
            form_data.append('description', this.state.description);
        }
        this.setState({loader: true});
        axios.patch(postDetailURL(id), form_data)
            .then(res => {
                console.log(res.data);
                this.setState({loader: false});
                this.setState({status: true});
            })
            .catch(err => {
                console.log(err);
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
        const {post} = this.props;
        console.log(post);

        if (!this.props.authenticated) {
            return <Redirect to="/login"/>;
        }

        if (this.state.loader) {
            return <Loader active inline='centered'/>;
        }

        return (
            <div >
                <Container>


                    {
                        this.state.status ? <Message color='green'>Post update successful!</Message> :
                            ''
                    }

                    <Form onSubmit={this.postSubmit}>
                        <Form.Field>
                            <label>Post*</label>
                            <input placeholder='Post name' value={this.state.post_name} name="post_name"
                                   onChange={this.handleChange} required/>
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <input placeholder='Post description' value={this.state.description} name="description"
                                   onChange={this.handleChange}/>
                        </Form.Field>

                        <Button type='submit'>Update</Button>
                    </Form>

                </Container>
                <br/>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        user: state.user.userId,
        post: state.postDetail.postDetail
    }
};

export default connect(mapStateToProps)(PostEdit);