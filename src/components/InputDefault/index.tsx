import React from 'react';
import { TextField } from '@mui/material'

interface InputDefaultProps {
    type: string;
    name: InputName;
    label: string;
    value: string;
    variant: 'outlined' | 'standard' | 'filled';
    color: 'error' | 'secondary' | 'primary';   
    handleChange: (value: string, key: InputName) => void;
}

export type InputName = 'name' | 'email' | 'password' | 'repassword' | 'description' | 'detail' 

function InputDefault({ type, name, label, value, color, variant, handleChange }: InputDefaultProps) {
    return (
        <TextField color={color} focused fullWidth name={name} label={label} variant={variant} type={type}  value={value} onChange={(ev) => handleChange(ev.target.value, name)}/>
    )
};

export { InputDefault };