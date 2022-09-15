import React, { useState } from 'react';
import portfolio from "../../../assets/images/partnership/partnership_detail/portfolio.png";
import portfolio_1 from "../../../assets/images/partnership/partnership_detail/portfolio_1.png";
import portfolio_2 from "../../../assets/images/partnership/partnership_detail/portfolio_2.png";
import portfolio_3 from "../../../assets/images/partnership/partnership_detail/portfolio_3.png";
import portfolio_4 from "../../../assets/images/partnership/partnership_detail/portfolio_4.png";
import portfolio_5 from "../../../assets/images/partnership/partnership_detail/portfolio_5.png";
import portfolio_6 from "../../../assets/images/partnership/partnership_detail/portfolio_6.png";
import portfolio_7 from "../../../assets/images/partnership/partnership_detail/portfolio_7.png";
import portfolio_8 from "../../../assets/images/partnership/partnership_detail/portfolio_8.png";
import portfolio_9 from "../../../assets/images/partnership/partnership_detail/portfolio_9.png";

const partmership_portfolio = () => {
    const listMenu = [
        { item: portfolio },
        { item: portfolio_1 },
        { item: portfolio_2 },
        { item: portfolio_3 },
        { item: portfolio_4 },
        { item: portfolio_5 },
        { item: portfolio_6 },
        { item: portfolio_7 },
        { item: portfolio_8 },
        { item: portfolio_9 },
    ];
    return (
        <div className='grid md:grid-cols-3 grid-cols-2 md:px-0 px-4 gap-4 auto-rows-auto mb-[200px]'>
            {(listMenu.map((e, i) =>
                <div key={i} className=' col-span-1'>
                    <img className='w-full' src={e.item} />
                </div>
            ))}
        </div>

    );
};

export default partmership_portfolio;