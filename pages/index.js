import InputDefault from '../components/InputDefault';

import ButtonDefault from '../components/ButtonDefault';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import { addUserToStore } from '../reducers/users';

import PDF from '../components/pdf';

function Index() {

    //import
    const router = useRouter();
    const dispatch = useDispatch();

    //Sign In States
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");
    const userInStore = useSelector((state) => state.users.value);

    // useEffect(() => {
    //     if (userInStore.isAdmin){
    //         router.push('/tous-les-rapports')
    //     } else {
    //         router.push('/nouveau-rapport')
    //     }
    // }, [])



    const signIn = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/users/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname: firstname, lastname: lastname, password: password }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const user = await response.json();

            if (user.result) {
                dispatch(addUserToStore({ token: user.token, firstname: user.firstname, lastname: user.lastname, isAdmin: user.isAdmin }))
                if (user.isAdmin) {
                    router.push('/tous-les-rapports')
                } else {
                    router.push('/nouveau-rapport')
                }
            } else {
                alert(user.error)
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <InputDefault type="text" placeholder="Nom" onChange={(e) => setLastname(e.target.value)} value={lastname} />
            <InputDefault type="text" placeholder="Prénom" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
            <InputDefault type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} value={password} />
            <ButtonDefault text="Se connecter" onClick={signIn} />
            {/* <PDF /> */}
        </div>
    )
}

export default Index;
