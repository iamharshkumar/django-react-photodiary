import React, {Component} from 'react';
import {Container, Form, Checkbox, Button, Message, Loader} from "semantic-ui-react";
import axios from "axios";
import {postListURL, updateProfile, UserIdURL} from "../store/constants";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {authAxios} from "../utils";

class ProfileForm extends Component {
    state = {
        "first_name": "",
        "profile_pic": null,
        "last_name": "",
        status: null,
        loader: false
    };

    componentDidMount() {
    }

    postSubmit = () => {
        let form_data = new FormData();
        if (this.state.first_name) {
            form_data.append('first_name', this.state.first_name);

        }
        if (this.state.last_name) {
            form_data.append('last_name', this.state.last_name);

        }
        if (this.state.profile_pic) {
            form_data.append('profile_pic', this.state.profile_pic, this.state.profile_pic.name);
        }
        this.setState({loader: true});
        axios.patch(updateProfile(this.props.user.userID), form_data)
            .then(res => {
                console.log(res.data);
                this.setState({loader: false});
                this.setState({status: true})
            })
            .catch(err => {
                console.log(err)
                this.setState({status: false})
            })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleImage = (e) => {
        this.setState({
            profile_pic: e.target.files[0]
        })
    };

    render() {

        if (!this.props.authenticated) {
            return <Redirect to="/login"/>;
        }

        if (this.state.loader) {
            return <Loader active inline='centered'/>;
        }

        return (
            <Container>
                {
                    this.state.status ? <Message color='green'>Profile update successful!</Message> :
                        ''
                }
                <Form onSubmit={this.postSubmit}>
                    <Form.Field>
                        <label>First name*</label>
                        <input placeholder='First name' name="first_name" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Last name*</label>
                        <input placeholder='Last name' name="last_name" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Profile pic</label>
                        <input type="file" name="profile_pic" onChange={this.handleImage}/>
                    </Form.Field>

                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        user: state.user.userId
    }
};

export default connect(mapStateToProps)(ProfileForm);