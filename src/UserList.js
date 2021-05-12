import React, { useState } from 'react';
import userSearch from './userSearch.js';

//import User from './User'

export default function UserList(){
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    
    userSearch(query, pageNumber);

    function handleSearch (e){
        setQuery(e.target.value);
        setPageNumber(1)
    }

    return (
        <>
            <input type='text' onChange={handleSearch}></input>
            <div>title</div>
            <div>loading..</div>
            <div>error</div>
        </>
    )
}



