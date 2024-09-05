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
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";


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


    const onSubmit: SubmitHandler<FieldValues> =async (data) => {
        setIsLoading(true);
        
        await axios.post('/api/auth/register', data)
            .then(() => { registerModal.onClose();
                toast.success("Registration successful!");
             })
            .catch((error):any => {
               toast.error("Something went wrong.")
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

 const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
        <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={()=>{signIn('google')}}
        />
        <Button
        outline
        label="Continue with Google"
        icon={AiFillGithub}
        onClick={()=>{signIn('github')}}
        />
        <div className="
        text-neutral-500
        text-center
        mt-4 font-light">
            <div className="flex items-center gap-1  justify-center">
                <div className="">
                    Already have an account?
                </div>
                <div
                onClick={registerModal.onClose}
                className="text-neutral-800
                cursor-pointer hover:underline">
                   Login
                </div>
            </div>
        </div>
    </div>

 )
 




    return (
       <Modal
       disabled={isLoading}
       isOpen={registerModal.isOpen}
       title="Register"
       actionLabel="Continue"
       onClose={registerModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body={bodyContent()}
       footer={footerContent}
       
       />
    );
};

export default RegisterModal;
