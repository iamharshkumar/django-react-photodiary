import React, {Component} from 'react';
import {Container, Card, Image, Icon, Button, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import StackGrid from "react-stack-grid";
import {URL} from "../store/constants";
import {connect} from 'react-redux';
import {profileData} from "../store/actions/userProfile";
import {fetchUser} from "../store/actions/userId";
import {userFollowing} from "../store/actions/userProfile";


class UserProfile extends Component {
    state = {
        action: "",
    };

    componentDidMount() {
        const {username} = this.props.match.params;
        this.props.profile(username);
        this.props.fetchUser();
    }

    follow = () => {
        const {userData} = this.props;
        if (userData.data && userData.data.is_following) {
            this.follower("unfollow")
        } else {
            this.follower("follow")
        }
    };

    follower = (value) => {
        const {username} = this.props.match.params;

        this.setState({action: value}, () => {
            this.props.userFollowing(username, {"action": this.state.action});
            this.props.profile(username);
        })
    };

    render() {
        const {userData} = this.props;
        const {username} = this.props.match.params;

         if (!userData) {
            return <div>
                Loading...
            </div>
        }

        return (
            <Container>
                <Card centered>
                    {
                        userData.data.profile_pic ?
                            <Image src={`${userData.data && userData.data.profile_pic}`} wrapped ui={false} size='medium' circular centered/> :
                            <Segment><Image src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                                            size='medium'
                                            circular/></Segment>
                    }
                    <Card.Content>
                        <Card.Header>{userData.data.first_name + " " + userData.data.last_name}
                            {
                                this.props.user.userID === userData.data.user ? <Link to={`/profiles/${username}/edit`}>
                                <span>
                                    <Icon name='edit'/> Edit
                                </span>
                                </Link> : ""
                            }

                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>{userData.data.username}</span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user'/>
                            {userData.data.followers_count} Followers
                            <Icon name='user'/>
                            {userData.data.following_count} Following
                        </a>
                    </Card.Content>
                    <Card.Content extra>
                        {
                            this.props.user.userID === userData.data.user ? '' : <div>
                                {userData.data.is_following ? <Button onClick={this.follow} primary fluid> Unfollow </Button> :
                                    <Button onClick={this.follow} primary fluid> Follow </Button>}
                            </div>
                        }


                    </Card.Content>
                </Card>
                {
                    <StackGrid columnWidth={200}>
                        {userData.data.posts.map(post => {
                            return (
                                <div key={`key${post.id + 1}`}>
                                    <Link to={`/post/${post.id}`}>
                                        <img style={{width: "200px", borderRadius:"10px"}}
                                             src={`${URL}${post.image}`} alt=""/>
                                    </Link>
                                </div>
                            )
                        })}
                    </StackGrid>
                }


            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userProfile.userProfile,
        user: state.user.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        profile: (username) => dispatch(profileData(username)),
        fetchUser: () => dispatch(fetchUser()),
        userFollowing: (username, action) => dispatch(userFollowing(username, action))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);