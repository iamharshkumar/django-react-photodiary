import React, {Component} from 'react';
import {authAxios} from "../utils";
import {Container, Card, Image, Icon, Grid, Button, Segment} from "semantic-ui-react";
import {profileView, userFollow, UserIdURL} from "../store/constants";
import {Link} from "react-router-dom";
import StackGrid from "react-stack-grid";


class UserProfile extends Component {
    state = {
        data: {},
        action: "",
        user: ''
    };

    componentDidMount() {
        const {username} = this.props.match.params;
        authAxios.get(profileView(username))
            .then(res => {

                this.setState({data: res.data.data})
                console.log(this.state.data)
            })
            .catch(err => {
                console.log(err)
            })

        authAxios.get(UserIdURL)
            .then(res => {
                console.log(res.data)
                this.setState({user: res.data.userID})
            })
            .catch(err => {
                console.log(err)
            })
    }

    follow = () => {
        const {data} = this.state
        if (data.is_following) {
            this.follower("unfollow")
        } else {
            this.follower("follow")
        }
    }

    follower = (value) => {
        const {username} = this.props.match.params;

        this.setState({action: value}, () => {
            authAxios.post(userFollow(username), {"action": this.state.action})
                .then(res => {
                    console.log(res.data.data)
                    this.setState({data: res.data.data})
                })
                .then(err => {
                    console.log(err)
                })
        })
    }

    render() {
        const {data} = this.state;
        const {username} = this.props.match.params;
        return (
            <Container>
                <Card centered>
                    {
                        data.profile_pic ?
                            <Image src={`${data.profile_pic}`} wrapped ui={false} size='medium' circular centered/> :
                            <Segment><Image src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                                            size='medium'
                                            circular/></Segment>
                    }
                    <Card.Content>
                        <Card.Header>{data.first_name + " " + data.last_name}
                            {
                                this.state.user === data.user ? <Link to={`/profiles/${username}/edit`}>
                                <span>
                                    <Icon name='edit'/> Edit
                                </span>
                                </Link> : ""
                            }

                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>{data.username}</span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user'/>
                            {data.followers_count} Followers
                            <Icon name='user'/>
                            {data.following_count} Following
                        </a>
                    </Card.Content>
                    <Card.Content extra>
                        {
                            this.state.user === data.user ? '' : <div>
                                {data.is_following ? <Button onClick={this.follow} primary fluid> Unfollow </Button> :
                                    <Button onClick={this.follow} primary fluid> Follow </Button>}
                            </div>
                        }


                    </Card.Content>
                </Card>
                {
                    <StackGrid columnWidth={300}>
                        {data.posts && data.posts.map(post => {
                            return (
                                <div key={`key${post.id + 1}`}>
                                    <Link to={`/post/${post.id}`}>
                                        <img style={{borderRadius: "100px"}} style={{width: "300px"}}
                                             src={`http://127.0.0.1:8000${post.image}`} alt=""/>
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

export default UserProfile;