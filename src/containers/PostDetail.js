import React, {Component} from 'react';
import {Container, Image, Comment, Header, Form, Button} from "semantic-ui-react";
import {createComment, likes, postDetailURL, postListURL, UserIdURL} from "../store/constants";
import {authAxios} from "../utils";
import {URL} from "../store/constants";

class PostDetail extends Component {
    state = {
        post: {},
        comments: null,
        user: null,
        comment: '',
        action: ''
    };

    componentDidMount() {
        this.postsRender();

        authAxios.get(UserIdURL)
            .then(res => {
                console.log(res.data);
                this.setState({user: res.data.userID})
            })
            .catch(err => {
                console.log(err)
            })
    }

    postsRender = () => {
        const {id} = this.props.match.params;
        console.log(id)
        authAxios.get(postDetailURL(id))
            .then(res => {
                console.log(res.data);
                this.setState({post: res.data})
            })
            .catch(err => {
                console.log(err)
            });
    };

    commentSubmit = () => {
        const {id} = this.props.match.params;
        authAxios.post(createComment, {
            'author': this.state.user,
            'comment': this.state.comment,
            'post': id
        })
            .then(res => {
                console.log(res.data);
                this.setState({comments: res.data})
            })
            .catch(err => {
                console.log(err)
            })

        this.postsRender();
        this.setState({comment: ""})
    };

    commentChange = (e) => {
        this.setState({comment: e.target.value})
    };

    likes = () => {
        const {post} = this.state;

        if (post.is_like) {
            this.likesHandle("unlike")
        } else {
            this.likesHandle("like")
        }
    }

    likesHandle = (value) => {
        const {id} = this.props.match.params;

        this.setState({action: value}, () => {
            authAxios.post(likes, {"post_id": id, "action": this.state.action})
                .then(res => {
                    console.log(res.data)
                    this.setState({post: res.data})
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    render() {
        const {post} = this.state;
        console.log(post.image)
        return (
            <Container>
                <Image src={post.image} size="huge" rounded centered/>
                <h3>{post.post_name}</h3>
                <p>{post.description}</p>
                <hr/>
                <p><b>{post.likes_count} likes</b></p>
                {
                    post.is_like ? <Button onClick={this.likes} primary>Unlike</Button> :
                        <Button onClick={this.likes} primary>Like</Button>
                }

                <Comment.Group>
                    <Header as='h3' dividing>
                        Comments
                    </Header>

                    {post.comments && post.comments.map(comment => {
                        return (
                            <Comment>
                                <Comment.Avatar src={`${URL}/media/${comment.profile_pic}`}/>
                                <Comment.Content>
                                    <Comment.Author as='a'>{comment.user}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Today at 5:42PM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.comment}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        )
                    })}


                    <Form onSubmit={this.commentSubmit}>
                        <Form.TextArea onChange={this.commentChange} value={this.state.comment}/>
                        <Button content='Add Comment' labelPosition='left' icon='edit' primary/>
                    </Form>
                </Comment.Group>
            </Container>
        )
    }
}

export default PostDetail;