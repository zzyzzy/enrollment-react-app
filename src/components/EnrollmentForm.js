import { React, useState } from 'react';
import '../App.css';

const EnrollmentForm = (props) => {
    // 폼에 입력한 이름/성/이메일을 기억하기 하기 위해 state형 변수 선언
    // onChange 이벤트 발생시 입력한 이름/성/이메일을
    // firstName, lastName, email변수에 저장
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // state형 변수에 저장된 이름/성을 환영메세지로 출력하기 위해 선언
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [msgStyle, setMsgStyle] = useState("redOne");

    // '등록하기' 버튼 클릭시 이름/성을 환영메세지로 만들어
    // 폼 아래쪽에 나타냄
    const handleSubmit = (e) => {
        let msg = `더 이상 참가할 수 없어요!`;
        setMsgStyle('redOne');
        if (props.currentSeat - 1 >= 0) {
            // props로 전달받은 setUpdateSeats 함수를 이용해서
            // 상위 컴퍼넌트의 seats 변수를 조작함
            props.setUpdateSeats(props.currentSeat - 1);  // 참여가능 인원수 감소
            setMsgStyle('message');
            msg = `환영합니다, ${firstName} ${lastName} 님!!\n` +
                `${email}로 등록관련 정보를 발송해드렸습니다`;

            // 등록완료된 학생정보에 사용할 key 생성
            const rndKey = Math.floor(1000+ Math.random() * 9000);
            // 생성한 key와 등록완료된 학생정보를 props에 저장
            let stud = {
                key: rndKey, fname: firstName, lname: lastName,
                program: props.chosenProgram, email: email
            }
            props.setStudDetails(stud);
        }
        setWelcomeMessage(msg);
        e.preventDefault();  // submit 기능 전파 중지
    };

    const handleInputChange = (setInput, e) => {
        setInput(e.target.value);
    };

    return(
        <div>
            <div className="enrolContainer">
            <form className="enrolForm">
                <ul className="ulEnrol">
                    <li>
                        <label htmlFor="FirstName"></label>
                        <input type="text" id="FirstName"
                        name="firstName" className="inputFields"
                        placeholder="First Name" value={firstName}
                        onChange={e => handleInputChange(setFirstName, e)} />
                    </li>
                    <li>
                        <label htmlFor="LastName"></label>
                        <input type="text" id="LastName"
                               name="lastName" className="inputFields"
                               placeholder="Last Name" value={lastName}
                               onChange={e => handleInputChange(setLastName, e)} />
                    </li>
                    <li>
                        <label htmlFor="Email"></label>
                        <input type="text" id="Email"
                               name="email" className="inputFields"
                               placeholder="Email" value={email}
                               onChange={e => handleInputChange(setEmail, e)} />
                    </li>
                    <li id="center-btn">
                        <button type="submit" id="btnEnrol"
                            name="enrol" onClick={handleSubmit}>
                            등록하기</button>
                    </li>
                    <li>
                        <label id="studentMsg" className={msgStyle}>
                            {welcomeMessage}
                        </label>
                    </li>
                </ul>
            </form>
            </div>
        </div>
    );
};

export default EnrollmentForm;
