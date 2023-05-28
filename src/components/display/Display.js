import React, { useState, useRef } from 'react';

import './Display.css';
import { Container } from '../container/Container';
import Button from '../container/button/Button';
import Tooltip from '../container/tooltip/Tooltip';
import { generatePassword, copyToClipBoard } from '../../utils/Helper';





const Display = () => {
    const [password, setPassword] = useState('');
    const [rangeValue, setRange] = useState();
    const [passwordProps, setPasswordProps] = useState();
    const [tooltip, setTooltip] = useState(false);
    const [type, setType] = useState('password');
    const passwordRef = useRef(null);
    let pwdDescription = '';

    const generateNewPassword = () => {
        const pwd = rangeValue >= 1 ? generatePassword(passwordProps, rangeValue) : generatePassword(passwordProps, 6);
        setPassword(pwd);
    }

    const copyClipBoard = e => {
        e.preventDefault();
        copyToClipBoard(passwordRef.current);
        setTooltip(true);
        setTimeout(() => {
            setTooltip(false);
        }, 2000);
    }

   

    const setBackgroundColor = password => {
        if (password && password.length === 1 && password.length <= 7) {
            pwdDescription = 'Bad password';
            return '#cb473e';
        } else if (password && password.length >= 8 && password.length <= 9) {
            pwdDescription = 'Weak password';
            return '#f07d58';
        } else if (password && password.length >= 10 && password.length <= 15) {
            pwdDescription = 'Strong password';
            return '#55a95d';
        } else if (password && password.length >= 16) {
            pwdDescription = 'Very Strong password';
            return '#13830f';
        } else {
            pwdDescription = 'Bad password';
            return '#cb473e';
        }
    }

    return (
        <>

            <div className="row">
                <div className="col-12 password-display-container"
                    style={{ backgroundColor: setBackgroundColor(password) }}
                >
                    <div style={{ width: '100%' }}>
                        <div className="password-display">
                            <input 
                                ref={passwordRef}
                                type="text"
                                value={password}
                                className="password-display-input"
                                readOnly
                            />
                        </div>

                        <div className="password-description">
                            {
                                password && password.length > 10 ?
                                <>
                                    <i className="fas fa-check-circle"></i> { pwdDescription }
                                </> :
                                <>
                                    <i className="fas fa-exclamation-circle"></i> { pwdDescription }
                                </>
                            }
                        </div>
                    </div>

                    <div className="password-display-icons">
                        <Button
                            className="copy-btn"
                            iconClass="far fa-copy"
                            handleClick={copyClipBoard}
                        />
                        <Button
                            className="generate-btn"
                            iconClass="fas fa-sync-alt"
                            handleClick={() => generateNewPassword()}
                        />

                        <Tooltip 
                            message="Copied"
                            position="left"
                            displayTooltip={tooltip}
                        />
                    </div>
                </div>
            </div>

            <Container 
                type={type}
                setPassword={setPassword}
                setRange={setRange}
                setPasswordProps={setPasswordProps}
                passwordRef={passwordRef}
            />


        </>
    )
}

const selectTagStyle = {
    backgroundColor: 'inherit',
    color: '#506175',
    width: '20%',
    height: 'auto',
    marginLeft: '-4px'
}

export default Display;
