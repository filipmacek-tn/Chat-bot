import React, { useEffect, useState, useRef } from 'react'
import api from '../api'

export default function Chat({ initialState }){
    const [messages, setMessages] = useState(initialState.chat_history || [])
    const [text, setText] = useState('')
    const boxRef = useRef(null)

    useEffect(() => {
        boxRef.current?.scrollTo(0, boxRef.current.scrollHeight)
    }, [messages])

    async function send(){
        const t = text.trim()
        if(!t) return
        setText('')
        setMessages(prev => [...prev, {role:'user', text:t}, {role:'bot', text:'…'}])
        try{
            const res = await api.post('/chat', { text: t })
            const reply = res.data?.text || ''
            setMessages(prev => [...prev.slice(0, -1), {role:'bot', text: reply}])
        }catch(e){
            setMessages(prev => [...prev.slice(0, -1), {role:'bot', text: '(błąd połączenia)'}])
        }
    }

    return (
        <div style={{maxWidth:720, margin:'20px auto', fontFamily:'system-ui'}}>
            <h2>Asystent Sekretariatu (Sprint 0)</h2>
            <div ref={boxRef} style={{border:'1px solid #ddd', padding:12, height:420, overflowY:'auto', borderRadius:8, background:'#fff'}}>
                {messages.map((m,i)=>(
                    <div key={i} style={{margin:'8px 0', textAlign: m.role==='user'?'right':'left'}}>
            <span style={{display:'inline-block', padding:'8px 12px', borderRadius:16, background: m.role==='user'?'#0B5FFF':'#f0f3f9', color: m.role==='user'?'#fff':'#000'}}>
              {m.text}
            </span>
                    </div>
                ))}
            </div>
            <div style={{display:'flex', gap:8, marginTop:12}}>
                <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') send()}} placeholder="Napisz wiadomość…" style={{flex:1, padding:10, border:'1px solid #ccc', borderRadius:8}}/>
                <button onClick={send} style={{padding:'10px 16px', borderRadius:8, background:'#0B5FFF', color:'#fff', border:'none'}}>Wyślij</button>
            </div>
            <p style={{fontSize:12, color:'#666', marginTop:8}}>Po odświeżeniu historia powinna wrócić (48 h).</p>
        </div>
    )
}