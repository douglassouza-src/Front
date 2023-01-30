import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputDefault, InputName } from '../../components/InputDefault';
import { v4 as uuid} from 'uuid';
import { Modal } from '../../components/Modal';
import { Recado } from '../../store/modules/typeStore';
import { useAppDispatch, useAppSelector} from '../../store/hooks';
import { atualizarUsuario, buscarUsuarioPorEmail} from '../../store/modules/users/userSlice';
import { adicionarNovoRecado, adicionarRecados, buscarRecados, limparRecados } from '../../store/modules/recados/recadoSlice';
import { clearUsuarioLogado } from '../../store/modules/userLogged/userLoggedSlice';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';


function Home() {
    const navigate = useNavigate();
    const [description, setDescription] = useState('')
    const [detail, setDetail] = useState('')
    const [idSelecionado, setIdSelecionado] = useState('')  
    const [mode, setMode] = useState<'edit' | 'delete' | ''>('');   
    const [openModal, setOpenModal] = useState(false)
    const userLogged = useAppSelector((state) => state.userLogged)   
    const usuarioRedux = useAppSelector((state) => buscarUsuarioPorEmail(state, userLogged.email)) 
    const recadosRedux = useAppSelector(buscarRecados)
    const dispatch = useAppDispatch();

    useEffect(
        () => {         

            if(!userLogged.email) {
              navigate('/')
            }
            if(usuarioRedux) {
                dispatch(adicionarRecados(usuarioRedux.recados))
            }
        },
       
        [navigate, userLogged, usuarioRedux, dispatch]
    )

    const mudarInput = (value: string, key: InputName) => {
        switch(key) {
            case 'description':
                setDescription(value)
            break;

            case 'detail':
                setDetail(value)
            break;

            default:
        }
    };

    const handleSaveAndLogout = () => {
        console.log('user', userLogged)
        if(recadosRedux) {
            dispatch(atualizarUsuario({id: userLogged.email, changes: {recados: recadosRedux}}))
        }
        dispatch(clearUsuarioLogado())
        dispatch(limparRecados())
        navigate('/')
    };

    const handleSaveRecado = () => {
        const novoRecado: Recado = {
            id: uuid(),
            description,
            detail
        }
        dispatch(adicionarNovoRecado(novoRecado))
        handleClear()
    };

    const handleEdit = (id: string) => {
        setMode('edit');
        setIdSelecionado(id);
        setOpenModal(true);
    };

    const handleDelete = (id: string) => {
        setMode('delete');
        setIdSelecionado(id);
        setOpenModal(true)
    };

    const handleCloseModal = () => {
        setOpenModal(false);    
    };

    const handleClear = () => {
        setDescription('')
        setDetail('')     
        setMode('')   
    };
    
    return (
        <Box sx={{ flexGrow: 1}} >            
            <Button onClick={handleSaveAndLogout} variant='contained' color='primary' size='small'><ExitToAppIcon fontSize='medium'/>| Sair</Button>
                <Grid container columnSpacing={3} alignItems={'center'} justifyContent={'center'} marginY={5} padding={2}>
                <Grid item xs={4}>
                    <InputDefault type='text' label='Descrição' name='description' variant='standard' value={description} color='secondary' handleChange={mudarInput}/>
                </Grid>
                <Grid item xs={4}>
                    <InputDefault type='text' label='Detalhamento' name='detail' variant='standard' value={detail} color='secondary' handleChange={mudarInput}/>
                </Grid>
                <Grid item xs={1}>
                    <Button variant='contained' color='primary' size='large' onClick={handleSaveRecado}>Salvar</Button>
                </Grid>
            </Grid>
            <Grid container paddingX={3} justifyContent={'center'}>
                <Grid xs={10} >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                            <TableHead>
                                <TableRow >
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">Descrição</TableCell>
                                    <TableCell align="center">Detalhamento</TableCell>
                                    <TableCell align="center">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {recadosRedux.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">{row.detail}</TableCell>
                                    <TableCell align="center">
                                        <Button color='success' variant='contained' sx={{margin: '0 15px'}} onClick={() => handleEdit(row.id)}><CreateOutlinedIcon/></Button>
                                        <Button color='error' variant='contained' sx={{margin: '0 15px'}} onClick={() => handleDelete(row.id)}><DeleteForeverOutlinedIcon/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Modal mode={mode} id={idSelecionado} open={openModal} handleClose={handleCloseModal}/>
        </Box>
    )
};

export { Home };