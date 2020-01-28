import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Loader from 'react-loader-spinner';

const FriendsList = () => {
    const [friend, setFriend] = useState({
        id: '',
        name: '',
        age: '',
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
            <form>
                <input
                    type='text'
                    name='name'
                    value={friend.name}
                    onChange={handleChange}
                    placeholder='Name'
                />
                <input 
                    type='text'
                    name='age'
                    value={friend.age}
                    onChange={handleChange}
                    placeholder='Age'
                />
                <input  
                    type='text'
                    name='email'
                    value={friend.email}
                    onChange={handleChange}
                    placeholder='Email'
                />
            </form>
            <button onClick={newFriend}>Add New Friend!</button>
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
                    <div>
                        <h4>Name: {prop.name}</h4>
                        <p>Age: {prop.age}</p>
                        <p>Email: {prop.email}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default FriendsList;