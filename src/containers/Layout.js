import React from "react";
import {
    Container,
    Menu,
} from "semantic-ui-react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";
import {fetchUser} from "../store/actions/userId";

class CustomLayout extends React.Component {

    componentDidMount() {
    }

    logout = () => {
        this.props.logout()
        this.props.history.push('/login')
    };

    render() {
        const {authenticated} = this.props;
        return (
            <div>
                <Menu inverted>
                    <Container>
                        <Link to="/">
                            <Menu.Item header>Home</Menu.Item>
                        </Link>
                        {authenticated ? (
                            <Link to="/create">
                                <Menu.Item header>Post</Menu.Item>
                            </Link>
                        ) : ''
                        }
                        {authenticated && this.props.user && this.props.user.username ? (
                            <Link to={`/profile/${this.props.user && this.props.user.username}`}>
                                <Menu.Item header>{this.props.user && this.props.user.username}</Menu.Item>
                            </Link>
                        ) : ''
                        }

                        {authenticated ? (
                            <Link to={`/userfeed/`}>
                                <Menu.Item header>UserFeed</Menu.Item>
                            </Link>
                        ) : ''
                        }

                        {authenticated ? (
                            <div>
                                <Menu.Item header onClick={this.logout}>
                                    Logout
                                </Menu.Item>
                            </div>

                        ) : (
                            <React.Fragment>
                                <Link to="/login">
                                    <Menu.Item header>Login</Menu.Item>
                                </Link>
                                <Link to="/signup">
                                    <Menu.Item header>Signup</Menu.Item>
                                </Link>

                            </React.Fragment>
                        )}
                    </Container>
                </Menu>

                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        user: state.user.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        fetchUser: () => dispatch(fetchUser())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CustomLayout)
);
