import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Followers from './Followers'
import Repos from './Repos'
/*
Component class: User

Props: 
link: The link to call the user profile. 
index: Passed from user.map. Used as a key and keeps track of 
       what user-card divs should call the observer

ref: callback function for the observer.
     Only last index divs should contain ref for useCallBack.

state: user: contains all the users data called from axios.

*/
const User = React.forwardRef((props, ref) => {
    const [user, setUser] = useState('');
    const [repoHidden, toggleRepoHidden] = useState(false);
    const [followerHidden, toggleFollowerHidden] = useState(false);

    useEffect(() => {
        //console.log(props)
        axios({
            method:'GET',
            url: props.link
        })
        .then(res => {
            //console.log()
            setUser(res.data);
        })
    }, [props])
    
    const setRepoHidden = () => {
        toggleRepoHidden((prevState) => !prevState)
        //console.log(repoHidden);
    }
    const setFollowerHidden = () => {
        toggleFollowerHidden((prevState) => !prevState)
        //console.log(repoHidden);
    }

    if (!user){ return <div></div>}
    else{
        if (ref != null){
            //console.log(props.index)
            return (<div className="user-card" key={props.index} ref={ref}>
                        <a onClick={setRepoHidden}>
                            <img className='pfp' alt="avatar" src={user.avatar_url}/>
                        </a>
                        <div className="descriptor">
                        <h5>{user.name + " · "}  <a className="profile-link" href={user.url}>{user.login}</a></h5>
                        <div className="wrapper">
                            <button className="btn followers" onClick={setFollowerHidden}>
                                <div>Followers: {user.followers}</div>
                            </button>
                            <br/>
                            <Followers link={user.followers_url}></Followers>
                            <Repos link={user.repos_url} repoHidden={repoHidden}></Repos>
                        </div>
                    </div> 
        </div>)
        }
        else {
            //console.log(props.index)
            return <div className="user-card" key={props.index}>
                        <a onClick={setRepoHidden}>
                            <img className='pfp' alt="avatar" src={user.avatar_url}/>
                        </a>
                        <div className="descriptor">
                        <h5>{user.name + " · "}  <a className="profile-link" href={user.url}>{user.login}</a></h5>
                        <div className="wrapper">
                            <button className="btn followers" onClick={setFollowerHidden}>
                                <div>Followers: {user.followers}</div>
                            </button>
                            <br/>
                            <Followers link={user.followers_url} followerHidden={followerHidden}></Followers>
                            <Repos link={user.repos_url} repoHidden={repoHidden}></Repos>
                        </div>
                        </div>
                    </div>
        }
    }
})

export default User;