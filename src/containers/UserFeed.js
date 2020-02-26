import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import StackGrid from "react-stack-grid";
import {URL} from "../store/constants";
import {connect} from "react-redux";
import {userfeedFetch} from "../store/actions/userFeed";

class UserFeed extends Component {


    componentDidMount() {
        this.props.userFeed();
    }

    render() {
        const {posts} = this.props;
        if (!posts) {
            return <div>
                Loading...
            </div>
        }

        return (
            <StackGrid columnWidth={250} gutterWidth={10}>
                {posts.map(post => {
                    return (
                        <div key={`key${post.id + 1}`}>
                            <Link to={`/post/${post.id}`}>
                                <img style={{width: "250px", borderRadius: "10px"}} src={`${URL}${post.image}`} alt=""/>
                            </Link>
                        </div>
                    )
                })}
            </StackGrid>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.userFeed.userFeed
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userFeed: () => dispatch(userfeedFetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFeed)