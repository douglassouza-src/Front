import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerImage} from '../../components/BannerImage';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';
import { useAppSelector } from '../../store/hooks';

function Login() {
    const navigate = useNavigate();
    const userLogged = useAppSelector((state) => state.userLogged);

    useEffect(
        () => {

            if(userLogged.email) {
                navigate('/home')
            }
           
        },

       
        [navigate, userLogged]
    )
    return (
        <WrapperContent>
            <BannerImage />
            <ContainerForm>                                                            
                <Form mode='login'/>
            </ContainerForm>
        </WrapperContent>
    )
};

export { Login };