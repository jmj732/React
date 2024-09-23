import { useParams } from "react-router-dom";
import Word from "./Word";
import useFetch from "../hooks/useFetch";

export default function Day(){
    const { day } = useParams();
    const words = useFetch(`http://localhost:3001/words?day=${day}`);

    return ( <>
        <div className="header">
            <span><img className="left" src={day === 1 ? '/img/left.png':''} alt='left'/></span>
            <span className={day === 1 ? "":"title"} >Day {day}</span>
            <span><img className="right" src={'/img/right.png'} alt='left'/></span>
        </div>
        <table>
            <tbody>
                {words.map(word =>(
                    <Word word={word} key={word.id}/>
                ))}
            </tbody>
        </table>
        </>
    );
} 