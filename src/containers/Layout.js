import React from "react";
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment
} from "semantic-ui-react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";
import {authAxios} from "../utils";
import {UserIdURL} from "../store/constants";

class CustomLayout extends React.Component {
    state = {
        username: ""
    };

    componentDidMount() {
        authAxios.get(UserIdURL)
            .then(res => {
                this.setState({username: res.data.username})
            })
            .catch(err => {
                console.log(err)
            })
    }

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
                        {authenticated ? (
                            <Link to={`/profile/${this.state.username}`}>
                                <Menu.Item header>Profile</Menu.Item>
                            </Link>
                        ) : ''
                        }

                        {authenticated ? (
                            <div>
                                <Menu.Item header onClick={() => this.props.logout()}>
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

                {/*<Segment*/}
                {/*    inverted*/}
                {/*    vertical*/}
                {/*    style={{margin: "5em 0em 0em", padding: "5em 0em"}}*/}
                {/*>*/}
                    {/*<Container textAlign="center">*/}
                    {/*    <Grid divided inverted stackable>*/}
                    {/*        <Grid.Column width={3}>*/}
                    {/*            <Header inverted as="h4" content="Group 1"/>*/}
                    {/*            <List link inverted>*/}
                    {/*                <List.Item as="a">Link One</List.Item>*/}
                    {/*                <List.Item as="a">Link Two</List.Item>*/}
                    {/*                <List.Item as="a">Link Three</List.Item>*/}
                    {/*                <List.Item as="a">Link Four</List.Item>*/}
                    {/*            </List>*/}
                    {/*        </Grid.Column>*/}
                    {/*        <Grid.Column width={3}>*/}
                    {/*            <Header inverted as="h4" content="Group 2"/>*/}
                    {/*            <List link inverted>*/}
                    {/*                <List.Item as="a">Link One</List.Item>*/}
                    {/*                <List.Item as="a">Link Two</List.Item>*/}
                    {/*                <List.Item as="a">Link Three</List.Item>*/}
                    {/*                <List.Item as="a">Link Four</List.Item>*/}
                    {/*            </List>*/}
                    {/*        </Grid.Column>*/}
                    {/*        <Grid.Column width={3}>*/}
                    {/*            <Header inverted as="h4" content="Group 3"/>*/}
                    {/*            <List link inverted>*/}
                    {/*                <List.Item as="a">Link One</List.Item>*/}
                    {/*                <List.Item as="a">Link Two</List.Item>*/}
                    {/*                <List.Item as="a">Link Three</List.Item>*/}
                    {/*                <List.Item as="a">Link Four</List.Item>*/}
                    {/*            </List>*/}
                    {/*        </Grid.Column>*/}
                    {/*        <Grid.Column width={7}>*/}
                    {/*            <Header inverted as="h4" content="Footer Header"/>*/}
                    {/*            <p>*/}
                    {/*                Extra space for a call to action inside the footer that could*/}
                    {/*                help re-engage users.*/}
                    {/*            </p>*/}
                    {/*        </Grid.Column>*/}
                    {/*    </Grid>*/}

                    {/*    <Divider inverted section/>*/}
                    {/*    <Image centered size="mini" src="/logo.png"/>*/}
                    {/*    <List horizontal inverted divided link size="small">*/}
                    {/*        <List.Item as="a" href="#">*/}
                    {/*            Site Map*/}
                    {/*        </List.Item>*/}
                    {/*        <List.Item as="a" href="#">*/}
                    {/*            Contact Us*/}
                    {/*        </List.Item>*/}
                    {/*        <List.Item as="a" href="#">*/}
                    {/*            Terms and Conditions*/}
                    {/*        </List.Item>*/}
                    {/*        <List.Item as="a" href="#">*/}
                    {/*            Privacy Policy*/}
                    {/*        </List.Item>*/}
                    {/*    </List>*/}
                    {/*</Container>*/}
                {/*</Segment>*/}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CustomLayout)
);
