import React, { useState } from 'react';
import Partnership_aboul from "../components/partnership/partnership_detail/partnership_aboul.js";
import Partmership_portfolio from "../components/partnership/partnership_detail/partmership_portfolio.js";
import Partmership_contact from "../components/partnership/partnership_detail/partnership_contact.js";

const PartnerShipDetailPage = () => {
    const [currentMenu, setcurrentMenu] = useState("About")

    const listMenu = [
        { item: 'About' },
        { item: 'Portfolio' },
        { item: 'Contact' },
    ];
    return (
        <section className="box-borrows w-full bg-cover pt-12 bg-center inline-block bg-[#0D0F20]" >
            <div className='lg:container mx-auto'>
                <div className='flex md:px-0 px-4'>
                    {(listMenu.map((e, i) =>
                        <div className="project-filter-btn cursor-pointer" key={i}>
                            <a onClick={() => (setcurrentMenu(e.item))} className={(currentMenu === e.item ? 'active !rounded-[32px] md:!px-20' : 'inactive !rounded-[32px] md:!px-20')}
                            >{e.item}</a>
                        </div>
                    ))}
                </div>
                <div className='mt-[48px]'>
                    {
                        currentMenu === 'About' &&
                        <div >
                            <Partnership_aboul />
                        </div>
                    }
                    {
                        currentMenu === 'Portfolio' &&
                        <div >
                            <Partmership_portfolio />
                        </div>
                    }
                    {
                        currentMenu === 'Contact' &&
                        <div >
                            <Partmership_contact />
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default PartnerShipDetailPage;
