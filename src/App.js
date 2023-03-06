import React, {useState} from 'react';
import EnrollmentForm from "./components/EnrollmentForm";
import EnrolList from "./components/EnrolList";

// EnrollmentForm이라는 폼을 return하도록
// 정의된 App 컴퍼넌트
const App = () => {
    const [program, setProgram] = useState("UG"); // 프로그램 종류
    const [ugseats, setUgSeats] = useState(60);
    const [pgseats, setPgSeats] = useState(40);

    // 과정 등록한 학생들 정보를 저장하는 변수 선언
    const [studDetails, setStudDetails] = useState({});

    const [action, setAction] = useState();               // 작업종류 지정
    const [selItemKey, setSelItemKey] = useState();       // 등록정보 키

    // 라디오 버튼 체크 상태 처리, 초기값은 true로 설정
    const [isUGChecked, setIsUGChecked] = useState(true);
    // (삭제나 수정시) 참가가능 인원수 조정 필요 여부 설정, 초기값은 false로 설정
    const [isRestoreSeats, setIsRestoreSeats] = useState(false);

    const handleChange = (e) => {
        setProgram(e.target.value);
        // 참가 프로그램이 혹시라도 변경됐다면
        setIsUGChecked(!isUGChecked);
        if (isRestoreSeats) {
            e.target.value === 'UG' ? // 변경전 프로그램 인원수를 원래대로 복원
                setPgSeats(pgseats + 1) : setUgSeats(ugseats + 1);
            setIsRestoreSeats(false);
        };
    };

    // 프로그램별 참가가능 인원수를 변경하는 함수
    const setUpdateSeats = (modifySeat) => {
        if (program === 'UG')
            setUgSeats(modifySeat);
        else
            setPgSeats(modifySeat);
    };

    // 작업종류, 키 설정 함수
    const handleItemSelection = (action, key) => {
        setAction(action);
        setSelItemKey(key);
    }

    // 등록학생 삭제나 수정시 참가가능 인원수 재수정
    const restoreSeats = (pgm) => {
        pgm === 'UG' ? setUgSeats(ugseats + 1) :
                       setPgSeats(pgseats + 1);
        setAction('');
    };

    // 수정시 참가 프로그램 변경시 참가가능 인원수 재수정
    const setReSelectProgram = (selProgram) => {
        selProgram === 'UG' ?
            setIsUGChecked(true) : setIsUGChecked(false);
        setProgram(selProgram);
        setIsRestoreSeats(true);
    };

    return (
        <div className="App">
            <div className="programs">
                <h3 className="title"> 프로그램 참가 등록양식 </h3>
                <ul className="ulEnrol">
                    <li onChange={handleChange} className="parentLabels">
                        <input type="radio" value="UG" name="programGroup"
                            defaultChecked={isUGChecked} />학사과정
                        <input type="radio" value="PG" name="programGroup"
                            defaultChecked={!isUGChecked} />석사과정
                    </li>
                    <li> {program} 참가 가능 인원 : {
                        (program === 'UG') ? ugseats : pgseats } </li>
                </ul>
            </div>
            <EnrollmentForm chosenProgram={program}
                currentSeat={ (program === 'UG') ? ugseats : pgseats }
                setUpdateSeats={setUpdateSeats}
                setStudDetails={setStudDetails}
                handleItemSelection={handleItemSelection}
                setReSelectProgram={setReSelectProgram} />

            <EnrolList studDetails={studDetails}
                       setStudDetails={setStudDetails}
                       selectedItemKey={selItemKey}
                       action={action} setAction={setAction}
                       restoreSeats={restoreSeats} />
        </div>
    );
};

// 컴퍼넌트나 모듈형태로 작성하는 경우
// 기본적으로 내보내기할 함수명 지정
export default App;
