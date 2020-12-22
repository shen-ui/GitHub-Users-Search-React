import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Followers(props) {
    const [followers, setFollowers] = useState([]);
    useEffect(() => {
        //console.log(props.link)
        axios({
            method: 'GET',
            url: props.link,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            //console.log(res.data)
            setFollowers(res.data);
        })

    },[props.link])
    if(!followers) {return <div></div>}

    if(props.hidden === true){
    return (
        <>
                {followers.map((follower, index) => {
                    return <div className='repos' key={index}>
                                <a className="repo-link" href={follower.login}  target="_blank" rel="noreferrer">
                                    <div className="repo-inner-div" key={index}>{follower.avatar_url}</div>
                                </a>
                           </div>
                })}
        </>
        )
    }
    else{return<div></div>}
}
