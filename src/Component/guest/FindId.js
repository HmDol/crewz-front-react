import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

export default function FindId({show, handleClose}) {
    // const [showSignUpModal, setShowSignUpModal] = useState(false);
    // const openSignUpModal = () => {
    //     setShowSignUpModal(true)
    //     handleClose();
    // };
    // const closeSignUpModal = () => setShowSignUpModal(false);

    // const [showSignInModal, setShowSignInModal] = useState(false);
    // const openSignInModal = () => {
    //     setShowSignInModal(true)
    //     handleClose();
    // };
    // const closeSignInModal = () => setShowSignInModal(false);

    const [inputs, setInputs] = useState({name: '', tel: ''});
    const {name, tel} = inputs;

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const findId = () => {
        axios.post('http://crewz.asuscomm.com/api/member/find/id', {}, {params: {name:name, tel: tel}})
            .then(function (res) {
                if (res.status === 200) {
                    if (res.data.flag) {
                        alert("회원님의 아이디는 ~입니다.");
                    } else {
                        alert("정보를 조회할 수 없습니다.");
                    }
                } else {
                    alert('error:' + res.status);
                }
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>아이디 찾기</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-el">
                        <label htmlFor="name">이름</label> <br/>
                        <input type="text" id="name" name="name" value={name} onChange={onChange}/>
                    </div>

                    <div className="form-el">
                        <label htmlFor="tel">전화번호</label> <br/>
                        <input type="text" id="tel" name="tel" value={tel} onChange={onChange}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={findId}>
                        찾기
                    </Button>

                    {/*<a href="#" onClick={openSignUpModal}>회원가입</a>*/}
                    {/*<a href="#" onClick={openSignInModal}>로그인</a>*/}
                </Modal.Footer>
            </Modal>

            {/*<Join show={showSignUpModal} handleClose={closeSignUpModal}/>*/}
            {/*<Login show={showSignInModal} handleClose={closeSignInModal}/>*/}
        </>
    )
}