import InputDefault from "../components/components/InputDefault";

import ButtonDefault from "../components/components/ButtonDefault";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { addUserToStore } from "../reducers/users";

// import PDF from '../components/PDF';

function Index() {
  //import
  const router = useRouter();
  const dispatch = useDispatch();

  //Sign In States
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const userInStore = useSelector((state) => state.users.value);

  useEffect(() => {
    if (Object.keys(userInStore).length !== 0) {
      // Vérifier si l'utilisateur est un administrateur
      if (userInStore.isAdmin) {
        router.push("/tous-les-rapports"); // Rediriger vers la page de tous les rapports
      } else {
        router.push("/nouveau-rapport"); // Rediriger vers la page de nouveau rapport
      }
    }
    // Si userInStore est vide, ne rien faire et laisser les formulaires de connexion s'afficher
  }, [userInStore]);

  const signIn = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/users/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const user = await response.json();

      if (user.result) {
        dispatch(
          addUserToStore({
            token: user.token,
            firstname: user.firstname,
            lastname: user.lastname,
            isAdmin: user.isAdmin,
          })
        );
        if (user.isAdmin) {
          router.push("/tous-les-rapports");
        } else {
          router.push("/nouveau-rapport");
        }
      } else {
        alert(user.error);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-20 lg:w-1/5 lg:mx-auto">
      <InputDefault
        type="text"
        placeholder="Nom"
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
      />
      <InputDefault
        type="text"
        placeholder="Prénom"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
      />
      <InputDefault
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <ButtonDefault text="Se connecter" onClick={signIn} variant="default"/>
      {/* <PDF /> */}
    </div>
  );
}

export default Index;
