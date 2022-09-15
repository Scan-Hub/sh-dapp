import React, { useState } from 'react';
import iconTelegram from "../../../assets/images/footer/telegram.png"
import iconTwitter from "../../../assets/images/footer/twitter.png"
import iconMail from "../../../assets/images/footer/mail.png"

const partmership_contact= () => {
    const listMenu = [
        { item: iconTelegram , label:"Telegram" },
        { item: iconTwitter , label:"Twitter"} ,
        { item: iconMail , label:"hello@gmail.com"}
    ];
    return (
        <div className='grid md:grid-cols-3 grid-cols-1 md:px-0 px-4 gap-4 auto-rows-auto mb-[200px]'>
            {(listMenu.map((e, i) =>
                <div key={i} className='flex flex-col items-center justify-center py-[40px] col-span-1 bg-[#191B2A]'>
                    <img className='w-[40px] mb-[24px]' src={e.item} />
                    <p className=' font-montserrat_semi_bold'>{e.label}</p>
                </div>
            ))}
        </div>
    );
};

export default partmership_contact;