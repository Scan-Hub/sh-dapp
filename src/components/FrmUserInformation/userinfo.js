import React, { useEffect } from 'react';
import UploadImage from "./UploadImage.js";
import Camera from "../../assets/images/FrmUserInformation/Camera.svg";
import Profile from "../../assets/images/FrmUserInformation/Profile.svg";
import mail from "../../assets/images/FrmUserInformation/mail.svg";
import Location from "../../assets/images/FrmUserInformation/Location.svg";
import Call from "../../assets/images/FrmUserInformation/Call.svg";
 
import { useForm, FormProvider } from "react-hook-form";

import {getProfile,updateProfile} from "../../actions/user.actions.js";
import UserRegister_field from "./userinfofield";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    selectProfileDisplayName,
    selectProfileUsername,
    selectProfileEmail,
    selectProfilePhone,
    selectProfileAddress,} from "../../reducers/user/profile.reducer.js"

const UserRegister = () => {

    const dispatch = useDispatch();

    const dataProfile = useSelector((state) => state.profile.data, shallowEqual);

    const methods = useForm();

    const onSubmit = data =>{
        dispatch(updateProfile({dataReq:data}))
    }

    useEffect(() => {
        dispatch(getProfile())
    },[])

    if(dataProfile){
        return <></>;
    }

    const fieldContent = [
        { img: Profile, label: "Nickname", placehorder: "Enter your name", field: "name" , value: dataProfile.display_name},
        { img: Profile, label: "Full Name", placehorder: "Enter your fullname", field: "fullname" , value: dataProfile.username},
        { img: mail, label: "Email", placehorder: "Enter your email", field: "email" , value: dataProfile.email},
        { img: Call, label: "Phone", placehorder: "Enter your phone number", field: "phone" , value: dataProfile.phone},
        { img: Location, label: "Address", placehorder: "Enter your address", field: "address" , value: dataProfile.address}
    ]

    return (
        <div className='lg:container pb-[48px] md:mx-auto '>
            <p className='text-center font-montserrat_semi_bold text-[20px] leading-[32px] text-[#00AF71]'>User information</p>
            <div className='mt-[24px] w-[65%] mx-auto'>
                <FormProvider {...methods} > 
                    <form onSubmit={methods.handleSubmit(onSubmit)}>

                        <div className="flex">
                            <div className='mt-[24px]'>
                                <div className='flex mb-2.5'>
                                    <img className="mr-[14px]" src={Camera} />
                                    <p className="font-montserrat_semi_bold text-[14px]">Avatar</p>
                                </div>

                                <UploadImage />
                            </div>
                            <div className='w-full pl-[48px]'>
                                {(fieldContent.map((val, i) => {
                                    return (
                                        <div key={i}>
                                            <UserRegister_field img={val.img} label={val.label} place={val.placehorder} field={val.field} value={val.value}/>
                                        </div>
                                    )
                                }))}

                            </div>
                        </div>
                        <div className='flex justify-center mt-[48px]'>
                            <input type="submit" className='py-3 px-[85px] bg-[#00AF71] w-fit rounded-[32px]' value="Next" />
                        </div>
                        </form>
                </FormProvider>

            </div>

        </div>

    );
};

export default UserRegister;