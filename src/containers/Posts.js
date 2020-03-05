import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import StackGrid from "react-stack-grid";
import {connect} from 'react-redux';
import {fetchUser} from "../store/actions/userId";
import {Loader} from "semantic-ui-react";
import sizeMe from 'react-sizeme';
import axios from "axios";
import {postListURL} from "../store/constants";
import {URL} from "../store/constants";

class Posts extends Component {
    state = {
        error: false,
        posts: [],
        loading: false,
        hasMore: true,
        offset: 0,
        limit: 10
    };

    constructor(props) {
        super(props);

        window.onscroll = () => {
            const {
                state: {hasMore, loading, error}
            } = this;

            if (loading || error || !hasMore) return;

            // if (parseInt(document.documentElement.scrollHeight - document.documentElement.scrollTop) <= parseInt(document.documentElement.clientHeight)) {
            //     this.loadPosts()
            // }

            if (parseInt(document.documentElement.scrollHeight - document.documentElement.scrollTop - 200) <= parseInt(document.documentElement.clientHeight)) {
                this.loadPosts()
            }
        }
    }

    componentWillMount() {
        this.loadPosts()
    }

    loadPosts = () => {
        const {offset, limit, hasMore, error} = this.state;
        this.setState({loading: true}, () => {
            axios.get(postListURL(limit, offset))
                .then(res => {
                    // console.log(res.data);
                    const newPosts = res.data.posts;
                    const hasMore = res.data.has_more;
                    this.setState({
                        hasMore,
                        loading: false,
                        posts: [...this.state.posts, ...newPosts],
                        offset: offset + limit
                    })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({error: err, loading: false})
                })
        })


    };

    componentDidMount() {
        if (this.props.authenticated) {
            this.props.fetchUser();
        }
    }


    render() {
        const {posts, loading, hasMore, error} = this.state;
        const {size: {width}} = this.props;

        return (
            <div style={{marginBottom: '100px'}}>
                <StackGrid columnWidth={width <= 500 ? 200 : 300} gutterWidth={10} monitorImagesLoaded="false">
                    {posts.map(post => {
                        return (
                            <div key={`key${post.id + 1}`}>
                                <Link to={`/post/${post.id}`}>
                                    <img
                                        style={width <= 500 ? {width: '200px'} : {
                                            width: '300px',

                                        }}
                                        src={`${URL}${post.image}`} alt=""
                                        onLoad={() => this.setState({loaded: true})}/>
                                </Link>
                            </div>
                        )
                    })}
                </StackGrid>
                {error && <div>{error}</div>}
                {loading && <Loader active inline='centered'/>}
                {!hasMore && <div>No more posts.</div>}
            </div>
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
        fetchUser: () => dispatch(fetchUser()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(sizeMe()(Posts))