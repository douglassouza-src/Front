import React from 'react';
import { BannerImage } from '../../components/BannerImage';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';

function Signup() {
    return (
        <WrapperContent >
            <BannerImage />
            <ContainerForm >
                <Form mode='signup'/>
            </ContainerForm>
        </WrapperContent>
    )
};
export { Signup };