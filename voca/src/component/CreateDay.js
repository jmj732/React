import useFetch from "../hooks/useFetch"
import { useNavigate } from 'react-router-dom';

export default function CreateDay() {
    const days = useFetch("http://localhost:3001/days");
    const navigate = new useNavigate();
    
    function addDay(e) {
        e.preventDefault();

        fetch(`http://localhost:3001/days/`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                day: days.length + 1
            })
        })
        .then(res => {
            if(res.ok){
                alert("생성이 완료되었습니다.");
                navigate(`/`);
            }
        })
    }

  return (
    <div>
        <h3>현재 일수 : {days.length}</h3>
        <button type='button' onClick={() => navigate(-1)}>뒤로가기</button>
        <button style={{margin:10}} onClick={addDay}>Day 추가</button>
    </div>
  )
}
