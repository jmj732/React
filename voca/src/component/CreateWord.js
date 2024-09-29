import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useState} from "react";

export default function CreateWord() {
    const { day } = useParams();
    const navigate = new useNavigate();
    const [isLoading,setLoading] = useState(false);

    function onSubmit(e){
        e.preventDefault();
        if(!isLoading & engRef != null && korRef != null ) {
            setLoading(true);
            fetch(`http://localhost:3001/words/`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                day: day,
                eng: engRef.current.value,
                kor: korRef.current.value ,
                isDone : false
            })
        })
        .then(res => {
            if(res.ok){
                alert("생성이 완료되었습니다.");
                navigate(`/day/${day}`);
                setLoading(false);
            }
        })
        }

    }

    const engRef = useRef(null);
    const korRef = useRef(null);

  return (
    <form onSubmit={onSubmit}>
        <div className='input_area'>
            <label>Eng</label>
            <input type='text' placeholder='computer' ref={engRef}/> 
        </div>
        <div className='input_area'>
            <label>Kor</label>
            <input type='text' placeholder='컴퓨터' ref={korRef}/> 
        </div>
        <div>
            <button type='button' onClick={() => navigate(-1)}>뒤로가기</button>
            <button  style={{opacity : isLoading ? 0.3:1 , margin : 10 }} >{isLoading ? "저장중":"저장"}</button>
        </div>
        
    </form>
  )
}
