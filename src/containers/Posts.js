import React, {Component} from 'react';
import {Container, Grid, Image} from 'semantic-ui-react';
import axios from 'axios';
import {postListURL} from "../store/constants";
import {Link} from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        this.postList()
    }

    postList() {
        axios.get(postListURL)
            .then(res => {
                console.log(res.data);
                this.setState({posts: res.data});
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {posts} = this.state;
        return (
            <Container>
                <Grid>
                    <Grid.Row columns={4}>
                        {posts.map(post => {
                            return (

                                <Grid.Column key={post.id}>
                                    <Link to={`/post/${post.id}`} >
                                        <Image src={post.image} size="medium" rounded/>

                                    </Link>
                                </Grid.Column>

                            )
                        })}
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Posts