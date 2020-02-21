import React, {Component} from 'react';
import {authAxios} from "../utils";
import {Container, Card, Image, Icon, Grid, Button} from "semantic-ui-react";
import {profileView, userFollow} from "../store/constants";

class UserProfile extends Component {
    state = {
        data: {},
        action: ""
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
                <Card>
                    <Image src={`${data.profile_pic}`} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Header>{data.first_name + " " + data.last_name}</Card.Header>
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

                        {data.is_following ? <Button onClick={this.follow} primary fluid> Unfollow </Button> :
                        <Button onClick={this.follow} primary fluid> Follow </Button>}


                    </Card.Content>
                </Card>
                <Grid>
                    <Grid.Row columns={3}>
                        {
                            data.posts && data.posts.map(post => {
                                return (
                                    <Grid.Column>
                                        <Image src={`http://127.0.0.1:8000${post.image}`}/>
                                    </Grid.Column>
                                )
                            })
                        }

                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default UserProfile;