import React, {Component} from 'react';
import {Container, Image, Comment, Header, Form, Button} from "semantic-ui-react";
import {URL} from "../store/constants";
import {fetchPostDetail, fetchPostLike, addComment} from "../store/actions/postDetail";
import {connect} from 'react-redux';

class PostDetail extends Component {
    state = {
        comment: '',
        action: ''
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPostDetail(id);
    }


    commentSubmit = () => {
        const {id} = this.props.match.params;

        this.props.addComment({
            'author': this.props.user.userID,
            'comment': this.state.comment,
            'post': id
        });
        this.props.fetchPostDetail(id);

        this.setState({comment: ""})
    };

    commentChange = (e) => {
        this.setState({comment: e.target.value})
    };

    likes = () => {
        const {post} = this.props;

        if (post.is_like && post.is_like) {
            this.likesHandle("unlike")
        } else {
            this.likesHandle("like")
        }
    };

    likesHandle = (value) => {
        const {id} = this.props.match.params;

        this.setState({action: value}, () => {
            this.props.fetchPostLike({"post_id": id, "action": this.state.action})
        })
    };

    render() {
        const {post} = this.props;
        if (!post) {
            return <div>
                Loading...
            </div>
        }
        return (
            <Container>
                <Image src={post.image} size="huge" rounded centered/>
                <h3>{post.post_name}</h3>
                <p>{post.description}</p>
                <hr/>
                <p><b>{post.likes_count} likes</b></p>
                {
                    post.is_like && post.is_like ? <Button onClick={this.likes} primary>Unlike</Button> :
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

const mapStateToProps = (state) => {
    return {
        post: state.postDetail.postDetail,
        user: state.user.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostDetail: (post_id) => dispatch(fetchPostDetail(post_id)),
        fetchPostLike: (data) => dispatch(fetchPostLike(data)),
        addComment: (data) => dispatch(addComment(data))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);