import React, {Component} from 'react';
import {Container, Image} from "semantic-ui-react";
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

                <b>Comments</b>
                <br/>
                <hr/>
                <div>
                    {post.comments && post.comments.map(comment => {
                        return (
                            <div key={comment.id}>
                                <b>{comment.author}</b>

                                <p>{comment.comment}</p>
                                <hr/>
                            </div>
                        )
                    })}
                </div>
            </Container>
        )
    }
}

export default PostDetail;