import React, { useState, PureComponent } from 'react';
import Piepercent from "./Pie";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import rating from "../../assets/images/project/project_icon/rating.svg";
import Edit from "../../assets/images/project/project_icon/Edit.svg";
const data = [
    { name: "Group A", value: 35 },
    { name: "Group B", value: 45 },
    { name: "Group C", value: 20 }
];
const COLORS = ['#FFC132', '#00AF71', '#E26B45'];
const ProjectRating = () => {
    const [TeamRating, SetTeamRating] = useState(0);
    const [StateRating, SetStateRating] = useState(0);
    const [PotentialRating, SetPotentialRating] = useState(0);
    const [CommunityRating, SetCommunityRating] = useState(0);
    const [TokenUseRating, SetTokenUseRating] = useState(0);
    const [TokenSaleTermRating, SetTokenSaleTermRating] = useState(0);
    const [WhitePaperRating, SetWhitePaperRating] = useState(0);
    const [TechRating, SetTechRating] = useState(0);

    const [random, setRandom] = useState({
        percentage: 0,
        colour: "hsl(0, 0%, 0%)"
    });


    return (
        <div className="w-full md:pb-24 lg:mx-0 mx-8">
            <p className="text-[24px] font-montserrat_semi_bold text-[#00AF71] pb-6"> DEFY Review and Rating</p>
            <div className="bg-[#191B2A] flex justify-center items-center py-12">
                <div className="w-[40%] flex justify-start" >
                    <img className="sm:w-auto w-2/3" src={rating} />
                </div>
                <a className="border-l sm:h-[80px] h-[40px]"></a>
                <div className="w-[40%] sm:block hidden">
                    <div className="flex justify-end">                   
                        <Piepercent percentage={82} colour="#00AF71" r={70} />
                    </div>
                </div>
                <div className="w-[50%] sm:hidden block">
                    <div className="flex justify-end">                   
                        <Piepercent percentage={82} colour="#00AF71" r={50} />
                    </div>
                </div>
            </div>
            <div className="bg-[#191B2A] flex lg:flex-row flex-col justify-center items-center py-12">
                <div className="sm:w-[40%] w-[80%]" >
                    <div className="flex flex-row md:gap-20 gap-10">  
                        <PieChart width={170} height={170}>
                            <Pie
                                data={data}
                                cx={80}
                                cy={77}
                                innerRadius={20}
                                outerRadius={80}
                                startAngle={90}
                                endAngle={-270}
                                fill="#8884d8"
                                paddingAngle={false}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                        </PieChart>
                        <div className="font-montserrat_medium">

                            <div className="pt-[18px]">
                                <p className="flex items-center before:p-4 before:mr-3  before:inline-block before:bg-[#FFC132]">Description</p>
                            </div>

                            <div className="pt-[18px] flex items-center">
                                <p className="flex items-center before:p-4 before:mr-3 before:inline-block before:bg-[#00AF71]">Description</p>
                            </div>
                            <div className="pt-[18px] flex items-center">
                                <p className="flex items-center before:p-4 before:mr-3 before:inline-block before:bg-[#E26B45]">Description</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8 font-montserrat_bold text-[18px]'>Community Review</div>
                </div>
                <a className="lg:border-l border-l-0 lg:border-t-0 border-t lg:my-0 my-8 lg:py-[80px] lg:px-0 px-[80px]"></a>
                <div className="sm:w-[40%] w-[80%]">
                    <div className="flex lg:flex-row flex-row-reverse md:gap-20 gap-10 justify-end">
                        <div className="font-montserrat_medium">

                            <div className="pt-[18px]">
                                <p className="flex items-center before:p-4 before:mr-3  before:inline-block before:bg-[#FFC132]">Description</p>
                            </div>

                            <div className="pt-[18px] flex items-center">
                                <p className="flex items-center before:p-4 before:mr-3 before:inline-block before:bg-[#00AF71]">Description</p>
                            </div>
                            <div className="pt-[18px] flex items-center">
                                <p className="flex items-center before:p-4 before:mr-3 before:inline-block before:bg-[#E26B45]">Description</p>
                            </div>
                        </div>
                        <PieChart width={170} height={170}>
                            <Pie
                                data={data}
                                cx={80}
                                cy={77}
                                innerRadius={20}
                                outerRadius={80}
                                startAngle={90}
                                endAngle={-270}
                                fill="#8884d8"
                                paddingAngle={false}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                    <div className='flex lg:justify-end mt-8 font-montserrat_bold text-[18px]'>Community Review</div>
                </div>
            </div>
            <div className="mt-24">
                <div className='flex'>
                    <div className="w-1/2">
                        <p>TEAM</p>
                    </div>
                    <div className="w-1/2">
                        <p className="float-right">{TeamRating + 1} / 10</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex w-full grid-cols-10 md:gap-6 gap-2">
                        {([...Array(10)].map((e, i) => {
                            return (
                                <div onClick={() => SetTeamRating(i)} key={i} className="h-[30px] flex items-center bg-transparentr w-full cursor-pointer">
                                    <div className={(TeamRating >= i ? 'active rating w-full' : 'rating w-full')}  ></div>
                                </div>
                            )
                        }))}
                    </div>
                    <div className="ml-8">
                        <img src={Edit} />
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div className='flex'>
                    <div className="w-1/2">
                        <p>STAGE OF THE PROJECT</p>
                    </div>
                    <div className="w-1/2">
                        <p className="float-right">{StateRating + 1} / 10</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex w-full grid-cols-10 md:gap-6 gap-2">
                        {([...Array(10)].map((e, i) => {
                            return (
                                <div onClick={() => SetStateRating(i)} key={i} className="h-[30px] flex items-center bg-transparentr w-full cursor-pointer">
                                    <div className={(StateRating >= i ? 'active rating w-full' : 'rating w-full')}  ></div>
                                </div>
                            )
                        }))}
                    </div>
                    <div className="ml-8">
                        <img src={Edit} />
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div className='flex'>
                    <div className="w-1/2">
                        <p>PROJECT POTENTIAL</p>
                    </div>
                    <div className="w-1/2">
                        <p className="float-right">{PotentialRating + 1} / 10</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex w-full grid-cols-10 md:gap-6 gap-2">
                        {([...Array(10)].map((e, i) => {
                            return (
                                <div onClick={() => SetPotentialRating(i)} key={i} className="h-[30px] flex items-center bg-transparentr w-full cursor-pointer">
                                    <div className={(PotentialRating >= i ? 'active rating w-full' : 'rating w-full')}  ></div>
                                </div>
                            )
                        }))}
                    </div>
                    <div className="ml-8">
                        <img src={Edit} />
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div className='flex'>
                    <div className="w-1/2">
                        <p>COMMUNITY</p>
                    </div>
                    <div className="w-1/2">
                        <p className="float-right">{CommunityRating + 1} / 10</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex w-full grid-cols-10 md:gap-6 gap-2">
                        {([...Array(10)].map((e, i) => {
                            return (
                                <div onClick={() => SetCommunityRating(i)} key={i} className="h-[30px] flex items-center bg-transparentr w-full cursor-pointer">
                                    <div className={(CommunityRating >= i ? 'active rating w-full' : 'rating w-full')}  ></div>
                                </div>
                            )
                        }))}
                    </div>
                    <div className="ml-8">
                        <img src={Edit} />
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div className='flex'>
                    <div className="w-1/2">
                        <p>TOKEN - USE</p>
                    </div>
                    <div className="w-1/2">
                        <p className="float-right">{TokenUseRating + 1} / 10</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex w-full grid-cols-10 md:gap-6 gap-2">
                        {([...Array(10)].map((e, i) => {
                            return (
                                <div onClick={() => SetTokenUseRating(i)} key={i} className="h-[30px] flex items-center bg-transparentr w-full cursor-pointer">
                                    <div className={(TokenUseRating >= i ? 'active rating w-full' : 'rating w-full')}  ></div>
                                </div>
                            )
                        }))}
                    </div>
                    <div className="ml-8">
                        <img src={Edit} />
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div className='flex'>
                    <div className="w-1/2">
                        <p>TOKEN SALE TERMS</p>
                    </div>
                    <div className="w-1/2">
                        <p className="float-right">{TokenSaleTermRating + 1} / 10</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex w-full grid-cols-10 md:gap-6 gap-2">
                        {([...Array(10)].map((e, i) => {
                            return (
                                <div onClick={() => SetTokenSaleTermRating(i)} key={i} className="h-[30px] flex items-center bg-transparentr w-full cursor-pointer">
                                    <div className={(TokenSaleTermRating >= i ? 'active rating w-full' : 'rating w-full')}  ></div>
                                </div>
                            )
                        }))}
                    </div>
                    <div className="ml-8">
                        <img src={Edit} />
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div className='flex'>
                    <div className="w-1/2">
                        <p>WHITE PAPER</p>
                    </div>
                    <div className="w-1/2">
                        <p className="float-right">{WhitePaperRating + 1} / 10</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex w-full grid-cols-10 md:gap-6 gap-2">
                        {([...Array(10)].map((e, i) => {
                            return (
                                <div onClick={() => SetWhitePaperRating(i)} key={i} className="h-[30px] flex items-center bg-transparentr w-full cursor-pointer">
                                    <div className={(WhitePaperRating >= i ? 'active rating w-full' : 'rating w-full')}  ></div>
                                </div>
                            )
                        }))}
                    </div>
                    <div className="ml-8">
                        <img src={Edit} />
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div className='flex'>
                    <div className="w-1/2">
                        <p>TECHNOLOGY</p>
                    </div>
                    <div className="w-1/2">
                        <p className="float-right">{TechRating + 1} / 10</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex w-full grid-cols-10 md:gap-6 gap-2">
                        {([...Array(10)].map((e, i) => {
                            return (
                                <div onClick={() => SetTechRating(i)} key={i} className="h-[30px] flex items-center bg-transparentr w-full cursor-pointer">
                                    <div className={(TechRating >= i ? 'active rating w-full' : 'rating w-full')}  ></div>
                                </div>
                            )
                        }))}
                    </div>
                    <div className="ml-8">
                        <img src={Edit} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProjectRating;
