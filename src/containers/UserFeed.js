import React, {Component} from 'react';
import {Container, Grid, Image} from 'semantic-ui-react';
import axios from 'axios';
import {postListURL, userFeed} from "../store/constants";
import {Link} from 'react-router-dom';
import {authAxios} from "../utils";
import StackGrid from "react-stack-grid";
import {URL} from "../store/constants";

class UserFeed extends Component {


    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            spans: 0
        };


        this.imageRef = React.createRef();

    }

    componentDidMount() {
        this.postList()

        console.log(this.imageRef)
        // this.setSpans()
        // this.imageRef.current.addEventListener('load', this.setSpans);


    }

    postList() {
        authAxios.get(userFeed)
            .then(res => {
                console.log(res.data);
                this.setState({posts: res.data});
            })
            .catch(err => {
                console.log(err)
            })

    }

    setSpans = () => {
        const height = this.imageRef.current.clientHeight;
        const spans = Math.ceil(height / 10);

        this.setState({spans})
    }

    cool = (e) => {
        console.log(e.target.value)

    }

    render() {
        const {posts} = this.state;

        return (

            <StackGrid columnWidth={250} gutterWidth={10}>
                {posts.map(post => {
                    return (
                        <div  key={`key${post.id + 1}`}>
                            <Link to={`/post/${post.id}`}>
                                <img style={{width: "250px",borderRadius:"10px"}} src={`${URL}${post.image}`} alt=""/>
                            </Link>
                        </div>
                    )
                })}
            </StackGrid>

        )
    }
}

export default UserFeed