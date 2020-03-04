import React, {Component} from 'react';
import {Container, Image, Comment, Header, Form, Button, Loader} from "semantic-ui-react";
import {postDetailURL, URL} from "../store/constants";
import {fetchPostDetail, fetchPostLike, addComment} from "../store/actions/postDetail";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import axios from 'axios';

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

    postDelete = () => {
        const {id} = this.props.match.params;
        axios.delete(postDetailURL(id))
            .then(res => {
                console.log(res.data)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    };

    render() {
        const {post, loading, user} = this.props;
        if (loading) {
            return <Loader active inline='centered'/>
        }
        return (
            <Container style={{width: '806px'}}>
                <Image src={post.image && post.image} size="huge" rounded centered/>
                <h3>{post.post_name && post.post_name}</h3>


                <h4><i>
                    <b>Author</b>: <Link to={`/profile/${post.author}`}>
                    {post.author}
                </Link>
                </i></h4>

                <br/>
                {
                    user.userID === post.user ?
                        <div>
                            <Button style={{float: 'right'}} basic color='red' onClick={this.postDelete}>
                                Delete
                            </Button>
                            <Link to={`/edit/${post.id}`}>
                                <Button style={{float: 'right'}} basic color='violet'>
                                    Edit
                                </Button>
                            </Link></div>
                        : ''
                }
                <b>Description</b>
                <p>{post.description && post.description}</p>
                <hr/>
                {
                    this.props.authenticated && this.props.authenticated ?
                        post.is_like && post.is_like ?
                            <div className="ui labeled button">
                                <button className="ui red button" tabIndex="0" onClick={this.likes}>
                                    <i aria-hidden="true" className="heart icon"/>
                                    Unlike
                                </button>
                                <div className="ui red left pointing basic label">{post.likes_count}</div>
                            </div>
                            :
                            <div className="ui labeled button">
                                <button className="ui red button" tabIndex="0" onClick={this.likes}>
                                    <i aria-hidden="true" className="heart icon"/>
                                    Like
                                </button>
                                <div className="ui red left pointing basic label">{post.likes_count}</div>
                            </div>
                        : ''
                }

                <Comment.Group>
                    <Header as='h3'>
                        Comments({post.comments && post.comments.length})
                    </Header>
                    {
                        this.props.authenticated && this.props.authenticated ? <Form onSubmit={this.commentSubmit}>
                            <Form.TextArea onChange={this.commentChange} value={this.state.comment}/>
                            <Button content='Add comment' secondary/>
                        </Form> : ''
                    }

                    {post.comments && post.comments.map(comment => {
                        return (
                            <Comment key={comment.id}>
                                <Comment.Avatar src={`${URL}/media/${comment.profile_pic}`}/>
                                <Comment.Content>
                                    <Comment.Author as='a'>
                                        <Link to={`/profile/${comment.user}`}>
                                            {comment.user}
                                        </Link>
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        <div>Today at 5:42PM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.comment}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        )
                    })}

                </Comment.Group>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.postDetail.postDetail,
        loading: state.postDetail.loading,
        user: state.user.userId,
        authenticated: state.auth.token !== null,
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