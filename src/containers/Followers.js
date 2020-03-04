import React, {Component} from 'react';
import {Button, Container, Image, List} from 'semantic-ui-react'
import {followers, following} from "../store/constants";
import axios from 'axios';
import {URL} from "../store/constants";
import {Link} from "react-router-dom";

class Followers extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        const {username} = this.props.match.params;
        axios.get(followers(username))
            .then(res => {
                console.log(res.data)
                this.setState({users: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {users} = this.state;
        return (
            <Container style={{width: '600px'}}>
                <List divided verticalAlign='middle'>
                    {
                        users.map(user => {
                            return (
                                <List.Item>
                                    <List.Content floated='right'>
                                        <Link to={`/${user.username}/followers/`}>
                                            Followers: {user.profile.followers_count}
                                        </Link>
                                        <br/>
                                        <Link to={`/${user.username}/following/`}>
                                            Following: {user.profile.following_count}
                                        </Link>
                                    </List.Content>
                                    <Image avatar src={`${URL}${user.profile.profile_pic}`}/>
                                    <List.Content>
                                        <Link to={`/profile/${user.username}`}>
                                            {user.username}
                                        </Link>
                                    </List.Content>
                                </List.Item>
                            )
                        })
                    }

                </List>
            </Container>
        )
    }
}

export default Followers;