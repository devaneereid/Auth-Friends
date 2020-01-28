import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

const Input = styled.input`
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 15px 15em;
`;
const Button = styled.button`
    padding: 15px 50px;
    border-radius: 20px;
    margin: 20px;
    border: 2px solid darkcyan;
    background: paleturquoise;
`;

class Login extends React.Component {
    state ={
        credentials: {
            username: '',
            password: ''
        },
        isFetching: false
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        this.setState({
            isFetching: true
        });
        axiosWithAuth()
            .post('/login', this.state.credentials)
            .then(res => {
                localStorage.setItem('token', res.data.payload);
                this.props.history.push('/protected');
            })
            .catch(err => console.log(err, 'Login to Continue' ));
    };

    render() {
        return (
            <div>
                <h1>Friends</h1>
                <Form onSubmit={this.login}>
                    <Input
                        type='text'
                        name='username'
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                        placeholder='Username'
                        />
                    <Input  
                        type='password'
                        name='password'
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                        placeholder='Password'
                        />
                    <Button>Login</Button>
                    {this.state.isFetching && 'logging in'}
                </Form>
            </div>
        );
    }
};

export default Login;