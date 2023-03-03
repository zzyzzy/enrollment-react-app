import { React, useState } from 'react';
import '../App.css';

const EnrollmentForm = (props) => {
    // 폼에 입력한 이름/성을 기억하기 하기 위해 state형 변수 선언
    // onBlur 이벤트 발생시 입력한 이름/성을
    // firstName, lastName변수에 저장
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // state형 변수에 저장된 이름/성을 환영메세지로 출력하기 위해 선언
    const [welcomeMessage, setWelcomeMessage] = useState("");

    // '등록하기' 버튼 클릭시 이름/성을 환영메세지로 만들어
    // 폼 아래쪽에 나타냄
    const handleSubmit = (e) => {
        setWelcomeMessage(`환영합니다, ${firstName} ${lastName} 님!!`);
        e.preventDefault();  // submit 기능 전파 중지
    };

    return(
        <div>
            <form className="enrolForm" onSubmit={handleSubmit}>
                <h1> {props.chosenProgram} 대학생 등록양식</h1>
                <div><label>First Name</label>
                    <input type="text" name="fname"
                        onBlur={(e) =>
                            setFirstName(e.target.value)} /></div>

                <div><label>Last Name</label>
                    <input type="text" name="lname"
                    onBlur={(e) =>
                        setLastName(e.target.value)}/></div>

                <div><button type="submit">등록하기</button></div>
            </form>

            <label id="studentMsg" className="message">
                {welcomeMessage}
            </label>
        </div>
    );
};

export default EnrollmentForm;
