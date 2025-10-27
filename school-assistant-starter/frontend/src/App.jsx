import React, { useEffect, useState } from 'react'
import Chat from './components/Chat'
import api from './api'

export default function App(){
    const [state, setState] = useState(null)

    useEffect(() => {
        async function boot(){
            try{
                const s = await api.get('/session/state')
                setState(s.data)
            }catch(e){
                await api.post('/session/new')
                const s2 = await api.get('/session/state')
                setState(s2.data)
            }
        }
        boot()
    }, [])

    if(!state) return <div style={{padding:20}}>Ładowanie…</div>
    return <Chat initialState={state} />
}