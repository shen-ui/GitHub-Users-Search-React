import { useEffect, useState } from  'react'
import axios from 'axios'

export default function useBookSearch(query, pageNumber){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const [ hasMOre, setHasMore ] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)

        let cancel
        axios({
            method: 'GET',
            url: `https://api.github.com/users`,
            params: {login: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setUsers(prevUsers =>{
                return new Set([...prevUsers, res.data])
            })
            console.log(res.data)
        }).catch(e => {
            if (axios.isCancel(e)) return
        })
        return() => cancel()
    }, [query, pageNumber])

    return
}