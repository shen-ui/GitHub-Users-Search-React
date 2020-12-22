import { useEffect, useState } from  'react'
import axios from 'axios'


export default function useBookSearch(query, pageNumber){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const [ hasMore, setHasMore ] = useState(false)

    useEffect(() => {
        if (query !== ''){
            //getUserSearch();
        }

        setLoading(true)
        setError(false)

        let cancel

        //axios for api call
        axios({
            method: 'GET',
            url: `https://api.github.com/users`,
            params: {since: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setUsers(prevUsers =>{
                // for some reason, set is not removing duplicates. 
                // May have something to do with the way the dom renders.
                var uniqueSet = [...new Set([...prevUsers, res.data.map(users => users)])]
                return uniqueSet
            })
            setHasMore(res.data.length > 0)
            setLoading(false)
           //console.log(res.data.map(users =>  users))
        }).catch(e => {
            if (axios.isCancel(e)) return
            alert(e);
            setError(true)
        })
        return() => cancel()
    }, [query, pageNumber])

    return {loading, error, users, hasMore}
}