import React, { useState } from 'react';
import aboul from "../../../assets/images/partnership/partnership_detail/aboul.png";
const Partnership_aboul = () => {

    return (
        <div className=' w-full mb-[148px] md:px-0 px-4'>
            <div className='grid md:grid-cols-6 grid-cols-1 gap-4 mb-[48px]'>
                {([...Array(6)].map((e, i) =>
                    <div className='w-full' key={i}>
                        <div className='px-[24px] py-[10px] font-montserrat_semi_bold text-[#00AF71] bg-[#191B2B]'>Name</div>
                        <div className='px-[24px] py-[10px]'>Name</div>
                    </div>
                ))}
            </div>
            <p className="project-content-title pb-6">H I G H L I G H T</p>
            <div className="text-[16px] leading-8  text-[#ADB2DB] mb-[64px]">
                <p className="list-item">Location based play and earn game </p>
                <p className="list-item">DEFY fuses hyper casual code breaking gameplay, real world exploration and AR adventures </p>
                <p className="list-item">The mobile game immerses players in a metaverse that bridges the virtual and physical worlds, DEFY fuses hyper casual code-breaking gameplay, with real world exploration and Augmented Reality (AR) adventures.</p>
                <p className="list-item">DEFY Labs is proud to announce the completion of their US$3.5m seed round led by Animoca Brands, liveXThe Spartan Group, GameFi Ventures, BIXIN, Polygon Studios, Unanimous Capital, PathDAO andPlay It Forward DAO</p>
            </div>
            <p className="project-content-title pb-6">S O L U T  I O N</p>
            <p className="font-montserrat_bold text-[24px] mb-[24px] text-[#FFFFFF]">Dual free to play and premium gameloops</p>
            <img className='w-full mb-[24px]' src={aboul}/>
            <p className="text-[16px] leading-8  text-[#ADB2DB] mb-[64px]">
            * DEFY will launch with both premium and free to play user pathways, which will greatly enhance user acquisition and retention. An innovative guild model aims to revolutionise the pathway to economic freedom for P2E players. * Players will be able to Play and earn, improve their health, explore their world and learn the basics of coding and other valuable skills through DEFY gameplay.
            </p>
            <p className="project-content-title pb-6">M A R K E T</p>
            <p className="font-montserrat_bold text-[24px] mb-[24px] text-[#FFFFFF]">Eventually all games will incorporate NFTs, today it may feel novel - but who doesn't want to own their characters and weapons!?</p>
            <p className="text-[16px] leading-8  text-[#ADB2DB] mb-[64px]">
            The play and earn space and more specifically the play and earn space is exploding currently with entrants like Stepn and DOSE paving the way. Early play to earn games have seen much success with very little developed lore or gameplay. DEFY brings a rich lore tapping into popular culture creating a rich Player vs Environment (PvE) narrative that has operatives joining a revolutionary hacker organisation with the mission of keeping the metaverse open and out of the control of the evil tech oligarchy, Future Systems. As the game evolves, factions and Player vs Player (PvP) elements will add to the longevity of the game and complexity of the economy.            </p>
        </div >
    );
};

export default Partnership_aboul;