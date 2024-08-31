"use client";

import useRegisterModalStore from "@/app/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues,useForm, SubmitHandler } from 'react-hook-form';
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";


// type FeildValue = {
//     name: string;
//     email: string;
//     password: string;
// };

const RegisterModal = () => {
    const registerModal = useRegisterModalStore();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit , formState:{
        errors,
    }} = useForm<FieldValues>({
        defaultValues: { name: '', email: '', password: '' }
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        axios.post(`/api/register`, data)
            .then(() => { registerModal.onClose() })
            .catch((error):any => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

 const bodyContent =()=>
 <div className="flex flex-col gap-4">
    <Heading
    title="Welcome to Airbnb"
    subtitle='create an account!!'
    center
    />

     <Input
     id="email"
     label="Email"
    disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="email"
     />
     <Input
     id="name"
     label="name"
    disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="text"
     />
     <Input
     id="password"
     label="password"
    disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="password"
     />

 </div>
 




    return (
       <Modal
       disabled={isLoading}
       isOpen={registerModal.isOpen}
       title="Register"
       actionLabel="Continue"
       onClose={registerModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body={bodyContent()}

       
       />
    );
};

export default RegisterModal;
