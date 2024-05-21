import React from 'react';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
    emailAddress: z.string().email(),
})

const SignUpForm = () => {
    return (
        <div className='flex flex-col items-center justify-between p-24'>
            SignUpForm
        </div>
    );
};

export default SignUpForm;