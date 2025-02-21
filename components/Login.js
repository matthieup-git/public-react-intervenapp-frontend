import styles from '../styles/Login.module.css';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import { users } from '../reducers/users';
import { addUserToStore } from '../reducers/users';


function Login() {

    //import
    const router = useRouter();
    const dispatch = useDispatch();

    //Sign In States
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [password, setPassword] = useState('');

    // Sign In Function
    const connectionBtn = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname : firstname, lastname: lastname, password: password }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const user = await response.json();
            if (user.result){
                dispatch(addUserToStore({token : user.token, firstname: user.firstname, lastname: user.lastname, isAdmin: user.isAdmin}))
                if (user.isAdmin){
                    router.push('/tous-les-rapports')
                }else{
                    router.push('/nouveau-rapport')
                }
            }else{
                console.log(user.error)
                console.log(false)
            }
            //console.log(user.result); // Traitez les données de réponse ici
    
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Nom" onChange={(e) => setLastname(e.target.value)} value={lastname} />
            <input type="text" placeholder="Prénom" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
            <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={connectionBtn}>Se connecter</button>
        </div>
    )
}

export default Login;