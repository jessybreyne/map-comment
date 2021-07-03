import React, { useContext } from 'react'
import Log from '../components/Log';
import { UidContext } from "../components/AppContext";
import UpdateProfil from '../components/Profil/UpdateProfil';

function Profil() {
    const uid = useContext(UidContext);
    console.log("uid", uid)

    return (
        <div className="profil-page">
            {uid ? (
                <UpdateProfil />
            ) : (
                <div className="log-container">
                    <Log signin={false} signup={true} />
                </div>
            )}
        </div>
    )
}

export default Profil;
