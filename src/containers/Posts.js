import React, {Component} from 'react';
import {Container, Grid, Image} from 'semantic-ui-react';
import axios from 'axios';
import {postListURL} from "../store/constants";
import {Link} from 'react-router-dom';
import {authAxios} from "../utils";
import StackGrid from "react-stack-grid";
import {URL} from "../store/constants";
import {connect} from 'react-redux';
import {postsFetch} from "../store/actions/posts";

class Posts extends Component {

    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {
        const {posts} = this.props;

        if (!posts) {
            return <div>
                Loading...
            </div>
        }
        return (
            <StackGrid columnWidth={200} gutterWidth={10}>
                {posts.map(post => {
                    return (
                        <div key={`key${post.id + 1}`}>
                            <Link to={`/post/${post.id}`}>
                                <img style={{width: "200px", borderRadius: "10px"}} src={post.image} alt=""/>
                            </Link>
                        </div>
                    )
                })}
            </StackGrid>

        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        posts: state.posts.posts
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(postsFetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts)