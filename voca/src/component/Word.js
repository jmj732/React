import React, { useState } from 'react'
import useFetch from "../hooks/useFetch";

export default function Word({word : w}) {
    const [word,setWord] = useState(w);
    const [isShow,SetIsShow] = useState(false); 
    const [isDone,SetIsDone] = useState(word.isDone); 
    const days = useFetch("http://localhost:3001/days");

    if(days.length === 0){
        return <span>...</span>
    }

    function toggleShow() {
        SetIsShow(!isShow);
    }

    function toggleDone() {
        fetch(`http://localhost:3001/words/${word.id}`,{
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                ...word,
                isDone: !isDone
            })
        })
        .then(res => {
            if(res.ok){
                SetIsDone(!isDone);
            }
        })
    }
    
    function del(){
        if(window.confirm('삭제 하시겠습니까?')){
            fetch(`http://localhost:3001/words/${word.id}`,{
                method : "DELETE",
            }).then(res => {
                if(res.ok){
                    setWord({id : 0});
                }
            });
        }
    }
    if (Number(word.id) === 0)
        return null;

    return (
        <tr className= {isDone ? 'off':''} key={word.id}>
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone}/>
            </td>
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>

            <td>
                <button onClick={toggleShow}>뜻 {isShow ? "숨기기":"보기"}</button>
                <button className="btn_del" onClick={del}>삭제</button>
            </td>
        </tr>
    )
}
