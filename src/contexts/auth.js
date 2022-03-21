
import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, [])


    async function siginUp(email, password, nome) {
        setLoadingAuth(true);
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await setDoc(doc(firebase, 'users', uid), {
                    nome: nome,
                    avatarUrl: null
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null
                        }

                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        console.log('Cadastrou com sucesso!');
                    })
                    .catch((error) =>{
                        console.log('Erro: ', error)
                    })
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
            })
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }


    async function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('Desconectado!');
        }).catch((error) => {
            console.log('Erro ao desconectar: ', error)
        });
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }


    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                siginUp,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
