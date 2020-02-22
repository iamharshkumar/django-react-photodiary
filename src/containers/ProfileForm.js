import React, {Component} from 'react';
import {Container, Form, Checkbox, Button} from "semantic-ui-react";
import axios from "axios";
import {postListURL, updateProfile, UserIdURL} from "../store/constants";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {authAxios} from "../utils";

class ProfileForm extends Component {
    state = {
        "user": null,
        "first_name": "",
        "profile_pic": null,
        "last_name": ""
    };

    componentDidMount() {
        authAxios.get(UserIdURL)
            .then(res => {
                console.log(res.data)
                this.setState({user: res.data.userID})
            })
            .catch(err => {
                console.log(err)
            })
    }

    postSubmit = () => {
        let form_data = new FormData();
        // form_data.append('user', this.state.user);
        if (this.state.first_name) {
            form_data.append('first_name', this.state.first_name);

        }
        if (this.state.last_name) {
            form_data.append('last_name', this.state.last_name);

        }
        if (this.state.profile_pic) {
            form_data.append('profile_pic', this.state.profile_pic, this.state.profile_pic.name);
        }

        authAxios.patch(updateProfile(this.state.user), form_data)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
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

        return (
            <Container>
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
        authenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(ProfileForm);