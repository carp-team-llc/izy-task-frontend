import React from 'react'
import { useController, Control } from 'react-hook-form'

interface FormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
}

export default function Input({ control, name, ...props }: FormProps) {
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <input className='input border-b-2 border-gray-300 w-[300px] focus:outline-none' {...field} {...props} />
  );
}