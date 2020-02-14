import React, {Component} from 'react';
import {Container, Image, Comment, Header, Form, Button} from "semantic-ui-react";
import {postDetailURL, postListURL} from "../store/constants";
import axios from 'axios';
import {authAxios} from "../utils";

class PostDetail extends Component {
    state = {
        post: {}
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        authAxios.get(postDetailURL(id))
            .then(res => {
                console.log(res.data)
                this.setState({post: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {post} = this.state;

        return (
            <Container>
                <Image src={post.image} size="large" rounded/>
                <h3>{post.post_name}</h3>
                <p>{post.description}</p>

                <Comment.Group>
                    <Header as='h3' dividing>
                        Comments
                    </Header>

                    {post.comments && post.comments.map(comment => {
                        return (
                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
                                <Comment.Content>
                                    <Comment.Author as='a'>{comment.author}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Today at 5:42PM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.comment}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        )
                    })}


                    <Form reply>
                        <Form.TextArea/>
                        <Button content='Add Comment' labelPosition='left' icon='edit' primary/>
                    </Form>
                </Comment.Group>
            </Container>
        )
    }
}

export default PostDetail;