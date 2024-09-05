"use client";
import {signIn} from 'next-auth/react'
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
import useLoginModalStore from "@/app/hooks/useLoginModal";
import { calculateOverrideValues } from 'next/dist/server/font-utils';
import { useRouter } from 'next/navigation';


// type FeildValue = {
//     name: string;
//     email: string;
//     password: string;
// };

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModalStore();
    const loginModal = useLoginModalStore();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit , formState:{
        errors,
    }} = useForm<FieldValues>({
        defaultValues: {  email: '', password: '' }
    });


    const onSubmit: SubmitHandler<FieldValues> =async (data) => {
        setIsLoading(true);
       signIn('credentials',{
        ...data,
        redirect:false
       }).then((callback)=>{
        setIsLoading(false);
        
        if(callback?.ok){
            toast.success('Logged In Successfully');
            router.refresh()
            loginModal.onClose();
            
        }
        if(callback?.error){
            toast.error(callback.error);
        }

       })  
      
    };

 const bodyContent =()=>
 <div className="flex flex-col gap-4">
    <Heading
    title="Welcome back"
    subtitle='Login into your  account!!'
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
                   Don't have an account?
                </div>
                <div
                onClick={registerModal.onClose}
                className="text-neutral-800
                cursor-pointer hover:underline">
                Register
                </div>
            </div>
        </div>
    </div>

 )
 




    return (
       <Modal
       disabled={isLoading}
       isOpen={loginModal.isOpen}
       title="Login"
       actionLabel="Continue"
       onClose={loginModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body={bodyContent()}
       footer={footerContent}
       
       />
    );
};

export default LoginModal;
