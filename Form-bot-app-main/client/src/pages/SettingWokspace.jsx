import React, { useState } from 'react';
import styles from './SettingWorkspace.module.css';
import { profile, visible, lock, Logout } from '../data/useImportAssets';
import { setIsAuthenticated, setCurrentUser } from '../configureslice/reduxSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../api/user';

const SettingWorkspace = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showEmail, setShowEmail] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        dispatch(setIsAuthenticated(false));
        dispatch(setCurrentUser(null));
        navigate('/login');
    };

    const handleUpdate = async () => {
        if (email && !validateEmail(email)) {
            setErrorMessage('Invalid email format');
            return;
        }
        if (oldPassword && newPassword && oldPassword === newPassword) {
            setErrorMessage('New password cannot be the same as the old password');
            return;
        }
        if (newPassword.length < 6) {
            setErrorMessage('New password must be at least 6 characters long');
            return;
        }
        try {
            const result = await updateUser(email, oldPassword, newPassword);
            console.log(result);
            setErrorMessage('');
        } catch (error) {
            console.log('Update failed:', error);
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div className={styles.settings}>
            <header className={styles.header}>
                <span>Settings</span>
            </header>
            <div className={styles.inputDiv}>
                <div className={styles.inputField}>
                    <img src={profile} alt="profile" className={styles.image} />
                    <input type="text" placeholder="Name" className={styles.input} />
                </div>
                <div className={styles.inputField}>
                    <img src={lock} alt="lock" className={styles.image} />
                    <input
                        type={showEmail ? "text" : "email"}
                        placeholder="Update Email"
                        className={`${styles.input} ${errorMessage.includes('email') ? styles.error : ''}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <img
                        src={visible}
                        alt="toggle visibility"
                        className={styles.image}
                        onClick={() => setShowEmail(!showEmail)}
                    />
                </div>
                <div className={styles.inputField}>
                    <img src={lock} alt="lock" className={styles.image} />
                    <input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Old Password"
                        className={`${styles.input} ${errorMessage.includes('Old password') ? styles.error : ''}`}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <img
                        src={visible}
                        alt="toggle visibility"
                        className={styles.image}
                        onClick={() => setShowOldPassword(!showOldPassword)}
                    />
                </div>
                <div className={styles.inputField}>
                    <img src={lock} alt="lock" className={styles.image} />
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        className={`${styles.input} ${errorMessage.includes('password') ? styles.error : ''}`}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <img
                        src={visible}
                        alt="toggle visibility"
                        className={styles.image}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                </div>
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <div className={styles.buttonContainer}>
                <button className={styles.update} onClick={handleUpdate}>Update</button>
            </div>
            <div className={styles.footer} onClick={handleLogout}>
                <img src={Logout} alt="Logout" className={styles.footerImage} />
                <p className={styles.typography}>Log out</p>
            </div>
        </div>
    );
};

export default SettingWorkspace;


