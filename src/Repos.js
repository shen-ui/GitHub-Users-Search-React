import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './repos.css'

const Repos = (props) => {
    const [repos, setRepos] = useState([]);
    useEffect(() => {
        //console.log(props.link)
        axios({
            method: 'GET',
            url: props.link,
            param: {limit: 10},
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            //console.log(res.data)
            setRepos(res.data);
        })

    },[props.link])
    if(!repos) {return <div></div>}

    if(props.repoHidden === true){
    return (
        <>
                {repos.map((repo, index) => {
                    return <div className='repos' key={index}>
                                <a className="repo-link" href={repo.html_url}  target="_blank" rel="noreferrer">
                                    <div className="repo-inner-div" key={index}>{repo.name}</div>
                                </a>
                           </div>
                })}
        </>
        )
    }
    else{return<div></div>}
}
export default Repos;
