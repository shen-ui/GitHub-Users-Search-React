import React, { useState, useRef, useCallback } from 'react';
import userSearch from './userSearch.js';

import './UserList.css'
import User from './User'

export default function UserList(){
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(0)
    const {
        users,
        hasMore,
        loading,
        error
    } = userSearch(query, pageNumber)
    const observer = useRef();
    const lastUserElementRef = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 30)// this 30 needs to be changed to indiv.id
            }
        })


        if(node) observer.current.observe(node);
    },[loading, hasMore])

    function handleSearch (e){
        setQuery(e.target.value)
        setPageNumber(1)
    }

    return (
        <>
            <input className="search-bar" value={query} placeholder="Search GitHub" type='text' onChange={handleSearch}></input>
            {users.map(user =>{
                return user.map((indiv,index) => {
                    if (user.length === index + 1){
                                // if the user is equal to the last index, call the ref function
                                //console.log(index)
                        return <User key={index} link={indiv.url} index={index} ref={lastUserElementRef}/>
                    }
                    else{
                                //  else, generate a normal user div
                                //  console.log(index)
                        return <User key={index} link={indiv.url} index={index}/>
                    }
                          
                    
                })
            })}
            <div className='loading'>{loading && 'Loading...'}</div>
            <div className='error'>{error && 'Error'}</div>
        </>
    )
}



