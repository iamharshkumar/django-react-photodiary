import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import StackGrid from "react-stack-grid";
import {connect} from 'react-redux';
import {postsFetch} from "../store/actions/posts";
import {fetchUser} from "../store/actions/userId";
import {Loader} from "semantic-ui-react";
import sizeMe from 'react-sizeme';

class Posts extends Component {
    state = {
        loaded: false
    };

    componentDidMount() {
        this.props.fetchPosts();
        if (this.props.authenticated) {
            this.props.fetchUser();
        }
    }


    render() {
        const {posts, loading} = this.props;
        const {size: {width}} = this.props;
        if (loading) {
            return <Loader active inline='centered'/>
        }

        return (
            <StackGrid columnWidth={width <= 500 ? 200 : 250} gutterWidth={10} monitorImagesLoaded="false">
                {posts.map(post => {
                    return (
                        <div key={`key${post.id + 1}`}>
                            <Link to={`/post/${post.id}`}>
                                <img
                                    style={width <= 500 ? {width: '200px', borderRadius: "10px"} : {
                                        width: '250px',
                                        borderRadius: "10px"
                                    }}
                                    src={post.image} alt=""
                                    onLoad={() => this.setState({loaded: true})}/>
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
        posts: state.posts.posts,
        loading: state.posts.loading,
        authenticated: state.auth.token !== null,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(postsFetch()),
        fetchUser: () => dispatch(fetchUser()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(sizeMe()(Posts))