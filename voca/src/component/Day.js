import { useParams, Link, useNavigate } from "react-router-dom";
import Word from "./Word";
import useFetch from "../hooks/useFetch";

export default function Day() {
    const { day } = useParams();
    const days = useFetch(`http://localhost:3001/days`);
    const words = useFetch(`http://localhost:3001/words?day=${day}`);
    const navigate = new useNavigate();

    const dayData = days.find(d => d.day === Number(day));

    function delDay() {
        if(Number(day) !== Number(days.length)){
            alert("삭제하실 수 없습니다.\n삭제하시려면 전날부터 삭제해주시길 바랍니다.")
        }
        else if (window.confirm('삭제 하시겠습니까?')) {
            if (dayData) {
                words.map(word =>
                    fetch(`http://localhost:3001/words/${word.id}`, {
                        method: "DELETE",
                    })
                );
                fetch(`http://localhost:3001/days/${dayData.id}`, {
                    method: "DELETE",
                }).then(res => {
                    if (res.ok) {
                        navigate('/');
                    }
                });
            }
        }
    }
        return (
            <>
                <div className="header">
                    <Link to={`/day/${Number(day) - 1}`} className={Number(day) === 1 ? "empty_arrow" : "l_arrow"} />
                    <span className={Number(day) === 1 ? "etitle" : "title"} >Day {day}</span>
                    <Link to={`/day/${Number(day) + 1 <= days.length ? Number(day) + 1 : 1}`} className={"r_arrow"} />
                </div>
                <table>
                    <tbody>
                        {words.map(word => (
                            <Word word={word} key={word.id} />
                        ))}
                        <tr className="trb"> 
                            <Link to="create_word"><button>단어추가</button></Link>
                            <button className='deldaybtn' onClick={delDay}>Day 삭제</button>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    } 