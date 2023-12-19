import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Join from "./Join";
import FindId from "./FindId";
import FindPwd from "./FindPwd";

;

export default function Login({ show, handleClose }) {
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const openSignUpModal = () => {
        setShowSignUpModal(true)
        handleClose();
    };
    const closeSignUpModal = () => setShowSignUpModal(false);

    //아이디 찾기
    const [showFindIdModal, setShowFindIdModal] = useState(false);
    const openFindIdModal = () => {
        setShowFindIdModal(true);
        handleClose();
    }
    const closeFindIdModal = () => setShowFindIdModal(false);

    //비밀번호 찾기
    const [showFindPwdModal, setShowFindPwdModal] = useState(false);
    const openFindPwdModal = () => {
        setShowFindPwdModal(true);
        handleClose();
    }
    const closeFindPwdModal = () => setShowFindPwdModal(false);

    const [inputs, setInputs] = useState({ id: '', pwd: '' });
    const { id, pwd } = inputs;
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const signIn = () => {
        axios.post('http://crewz.asuscomm.com/api/member/login', {}, { params: { id: id, pwd: pwd } })
            .then(function (res) {
                if (res.status === 200) {
                    if (res.data.flag) {
                        handleClose();
                        localStorage.setItem("loginId", id);
                        localStorage.setItem("token", res.data.token);

                        navigate('/');
                        window.location.reload();
                    } else {
                        alert("로그인에 실패하였습니다.");
                    }
                } else {
                    alert("error:" + res.status);
                }
            })
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-el">
                        <label htmlFor="id">아이디</label> <br />
                        <input type="text" name="id" value={id} onChange={onChange} />
                    </div>

                    <div className="form-el">
                        <label htmlFor="pwd">비밀번호</label> <br />
                        <input type="password" id="pwd" name="pwd" value={pwd} onChange={onChange} />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={signIn}>로그인</Button>
                    <a href="#" onClick={openSignUpModal}>회원가입</a>
                    <a href="#" onClick={openFindIdModal}>아이디찾기</a>
                    <a href="#" onClick={openFindPwdModal}>비밀번호찾기</a>
                </Modal.Footer>

            </Modal>

            <Join show={showSignUpModal} handleClose={closeSignUpModal} />
            <FindId show={showFindIdModal} handleClose={closeFindIdModal}/>
            <FindPwd show={showFindPwdModal} handleClose={closeFindPwdModal}/>
        </div>
    )
}