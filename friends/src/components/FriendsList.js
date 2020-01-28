import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const Button = styled.button`
    padding: 15px 50px;
    border-radius: 20px;
    margin: 20px;
    border: 2px solid darkcyan;
    background: paleturquoise;
    font-family: monospace;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 15px 8em;
`;
const Input = styled.input`
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    background: lavender;
    font-family: monospace;
`;
const Friends = styled.div`
    font-family: monospace;
`;


const FriendsList = () => {
    const [friend, setFriend] = useState({
        id: '',
        name: '',
        age: '',
        job: '',
        email: ''
    });
    const [friendData, setFriendData] = useState([])

    useEffect(() => {
        axiosWithAuth()
        .get('/friends')
        .then(res => {
            setFriendData(res.data)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    const handleChange = e => {
        setFriend({
            ...friend,
            [e.target.name]: e.target.value
        });
    };

    const newFriend = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/friends', friend)
            .then(res => {
                setFriendData(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err.response)
        )
    };

    return (
        <div>
            <Form>
                <Input
                    type='text'
                    name='name'
                    value={friend.name}
                    onChange={handleChange}
                    placeholder='Name'
                />
                <Input 
                    type='text'
                    name='age'
                    value={friend.age}
                    onChange={handleChange}
                    placeholder='Age'
                />
                <Input  
                    type='text'
                    name='job'
                    value={friend.job}
                    onChange={handleChange}
                    placeholder='Job'
                /> 
                <Input  
                    type='text'
                    name='email'
                    value={friend.email}
                    onChange={handleChange}
                    placeholder='Email'
                />
            </Form>
            <Button onClick={newFriend}>Add New Friend!</Button>
                <div className='spinner'>
                    <Loader 
                        type='Puff' 
                        color='aqua' 
                        height={100} 
                        width={100} 
                        timeout={3000} />
                </div>
            {friendData.map(prop => {
                return (
                    <Friends>
                        <h4>Name: {prop.name}</h4>
                        <p>Age: {prop.age}</p>
                        <p>Job: {prop.job}</p>
                        <p>Email: {prop.email}</p>
                        <br />
                    </Friends>
                )
            })}
        </div>
    );
};

export default FriendsList;