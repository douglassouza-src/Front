import React, { useState } from 'react';
import { InputDefault, InputName } from '../InputDefault';
import { Stack, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { adicionarNovoUsuario, buscarUsuarios, } from '../../store/modules/users/userSlice';
import { setUsuarioLogado } from '../../store/modules/userLogged/userLoggedSlice';

export interface FormProps {
  mode: 'login' | 'signup';
};

function Form({ mode }: FormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const usersRedux = useAppSelector(buscarUsuarios); 
   
    const dispatch = useAppDispatch();
    
    const navigate = useNavigate();

    const handleValidateInput = (value: string, key: InputName) => {
        switch(key) {
            case 'name':
                if(value.length < 3) {
                    setErrorName(true);
                } else {
                    setErrorName(false);
                }
            break;

            case 'email':
                // eslint-disable-next-line no-useless-escape
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if(!value.match(regexEmail)) {
                    setErrorEmail(true)
                }else {
                    setErrorEmail(false)
                }
            break;

            case 'password':
                if(mode === 'signup') {
                    if(!value || value.length < 6) {
                        setErrorPassword(true)
                        
                    } else {
                        setErrorPassword(false)
                    }
                }

                if(mode === 'login') {
                    if(!value){
                        setErrorPassword(true)
                    } else {
                        setErrorPassword(false)
                    }
                }
            break;

            case 'repassword':
                if(value !== password) {
                    setErrorPassword(true)
                } else {
                    setErrorPassword(false)
                }
            break

            default:
        }
    };

    const mudarInput = (value: string, key: InputName) => {
        switch(key) {
            case 'name':
                setName(value)
                handleValidateInput(value, key)
            break;

            case 'email':
                setEmail(value)
                handleValidateInput(value, key)
            break;

            case 'password':
                setPassword(value)
                handleValidateInput(value, key)
            break;

            case 'repassword':
                setRepassword(value)
                handleValidateInput(value, key)
            break

            default:
        }
    };

    const handleNavigate = () => {
        if(mode === 'login') {
            navigate('/signup')
        } else {
            navigate('/')
        }
    };


    const createAccount = () => {
        const newUser = {
            name,
            email,
            password,
            recados: []
        }

        const userExist = usersRedux.some((user) => user.email === newUser.email);

        if(!userExist) {
            dispatch(adicionarNovoUsuario(newUser))
            clearInputs();
            alert("Usuário Cadastrado! Você será redirecionado");

            setTimeout(() => {
                navigate('/')
            }, 1500)
        } else {           
            alert('E-mail já em uso!');
            

        }

    };

    const login = () => {
        const userExist = usersRedux.find((user) => user.email === email);

        const passwordMatch = usersRedux.find((user) => user.password === password);

        if(!userExist) {
            const confirma = window.confirm("Usuário não cadastrado. Deseja cadastrar uma conta? ")
 
            if(confirma) {
                 navigate('/signup')
            }
         }      

        if(userExist && !passwordMatch) {
            alert('Senha incorreta!');
            return
        }        

        dispatch(setUsuarioLogado({name: userExist!.name, email: userExist!.email, password: userExist!.password}))
        
        setTimeout(() => {
        navigate('/home')
    }, 2500)
        
        
    };

    const clearInputs = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRepassword('');
    };

    return (
        <>        
            <Stack direction="column" spacing={2} sx={{width: '80%'}}>                 
                { mode === 'signup' && (
                    <>  
                        <h1>SIGN UP</h1>
                        <InputDefault type='text' label='Nome' name='name' value={name} variant='standard' handleChange={mudarInput} color={errorName ? 'error' : 'primary'}/>
                        <InputDefault type='email' label='E-mail' name='email' value={email} variant='standard' handleChange={mudarInput} color={errorEmail ? 'error' : 'primary'}/>
                        <InputDefault type='password' label='Senha' name='password' value={password} variant='standard' handleChange={mudarInput} color={errorPassword ? 'error' : 'primary'}/>
                        <InputDefault type='password' label='Repita a Senha' name='repassword' variant='standard' value={repassword} handleChange={mudarInput} color={errorPassword ? 'error' : 'primary'}/>
                        <Button disabled={errorName || errorEmail || errorPassword} variant='contained' color='secondary' onClick={createAccount}>Criar Conta</Button>
                    </>
                )}
                { mode === 'login' && (
                    <>
                        <h1>ACESSAR</h1>
                        <InputDefault type='email' label='E-mail' name='email' variant='standard' value={email} handleChange={mudarInput} color={errorEmail ? 'error' : 'primary'}/>
                        <InputDefault type='password' label='Senha' name='password' variant='standard' value={password} handleChange={mudarInput} color={errorPassword ? 'error' : 'primary'}/>
                        <Button disabled={errorEmail || errorPassword} variant='contained' color='secondary' onClick={login}>Acessar</Button>
                    </>
                )}   
            </Stack>
            <Box marginTop={3}>
                { mode === 'login' && ( <Typography color='secondary' variant='subtitle2'>Não tem conta? <Typography variant='button' color='primary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Cadastre-se</Typography></Typography> )}
                { mode === 'signup' && ( <Typography color='secondary' variant='subtitle2'>Já tem conta? <Typography variant='button' color='primary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Fazer Login</Typography></Typography> )}
            </Box>
        </>
    )
};

export { Form };