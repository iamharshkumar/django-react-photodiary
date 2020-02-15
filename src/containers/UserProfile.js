import React, {Component} from 'react';
import {authAxios} from "../utils";
import {Container, Card, Image, Icon, Grid} from "semantic-ui-react";
import {profileView} from "../store/constants";

class UserProfile extends Component {
    state = {
        data: {}
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

    render() {
        const {data} = this.state;
        return (
            <Container>
                <Card>
                    <Image src={`http://127.0.0.1:8000${data.profile_pic}`} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Header>{data.first_name + " " + data.last_name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user'/>
                            22 Friends
                        </a>
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