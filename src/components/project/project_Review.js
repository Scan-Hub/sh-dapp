import React from 'react';
import like from "../../assets/images/project/project_icon/like.svg";
import dislike from "../../assets/images/project/project_icon/dislike.svg";
import arrow_down from "../../assets/images/project/project_icon/arrow-downwhite.svg";
import emoji_smile from "../../assets/images/project/project_icon/emoji-smile.svg";
import send from "../../assets/images/project/project_icon/send.svg";
import like_nocolor from "../../assets/images/project/project_icon/like_nocolor.svg";
import dislike_nocolor from "../../assets/images/project/project_icon/dislike_nocolor.svg";

import account_comment_demo from "../../assets/images/project/account_comment_demo.svg";

import team_lead_1 from "../../assets/images/project/team_lead_1.svg";
import team_lead_2 from "../../assets/images/project/team_lead_2.svg";
import team_lead_3 from "../../assets/images/project/team_lead_3.svg";
import team_lead_4 from "../../assets/images/project/team_lead_4.svg";

const ProjectReview = () => {
    const listreivew = [
        {
            'review': 12,
            'votes': 889,
            'kills': 10,
        }
    ];
    const listreivewcomment = [
        {
            "img": team_lead_1,
            "time_comment":"1 year ago",
            "account_name": "Some Vlog",
            "comment":"ove it! Awesome job. Thanks for sharing",
            "like": 92,
            "dislike": 10,
            "answer_count": 8
        },
        {
            "img": team_lead_2,
            "time_comment":"1 year ago",
            "account_name": "Some Vlog",
            "comment":"ove it! Awesome job. Thanks for sharing",
            "like": 92,
            "dislike": 10,
            "answer_count": 8
        },
        {
            "img": team_lead_3,
            "time_comment":"1 year ago",
            "account_name": "Some Vlog",
            "comment":"ove it! Awesome job. Thanks for sharing",
            "like": 92,
            "dislike": 10,
            "answer_count": 8
        },
        {
            "img": team_lead_4,
            "time_comment":"1 year ago",
            "account_name": "Some Vlog",
            "comment":"ove it! Awesome job. Thanks for sharing",
            "like": 92,
            "dislike": 10,
            "answer_count": 8
        }
    ];
    return (
        <div className="w-full md:pb-24 mx-4">
            <p className="text-[24px] font-montserrat_semi_bold text-[#00AF71] pb-4">What do people think of DEFY?</p>
            <p className="text-[16px] font-normal  text-[#ADB2DB] pb-6">The community submitted 12 reviews to tell us what they like about DEFY, what DEFY can do better, and more.</p>
            <div className='flex'>
                <div className="flex"><p>{listreivew[0].review}</p><p className="text-[#ADB2DB] ml-1">reviews</p></div>
                <div className="flex ml-4 font-normal "><p>{listreivew[0].votes}</p><p className="text-[#ADB2DB] ml-1">votes</p></div>
                <div className="flex ml-4 font-normal "><p>{listreivew[0].kills}</p><p className="text-[#ADB2DB] ml-1" >kills</p></div>
            </div>
            <div className='flex mt-6'>
                <div className="flex py-2 px-4 bg-[#00AF71] w-fit rounded-lg items-center min-w-[90px]">
                    <p className="font-semibold font_montserrat_semi_bold">Vote</p>
                    <img className="w-[18px] h-[18px] ml-2.5" src={like} />
                </div>
                <div className="flex ml-6 py-2 px-4 bg-[#E26B45]  w-fit rounded-lg items-center min-w-[90px]">
                    <p className="font-semibold font_montserrat_semi_bold">Kill</p>
                    <img className="w-[18px] h-[18px] ml-2.5" src={dislike} />
                </div>
            </div>
            <div className="mt-16">
                <div className="flex">
                    <div className="w-1/2 text-[24px]"><p>100 Reviews</p></div>
                    <div className="w-1/2">
                        <div className="float-right flex rounded bg-[#191B2A] py-2.5 px-3">
                            <p>Most recent </p>
                            <img className="ml-3" src={arrow_down} />
                        </div>
                    </div>

                </div>
                <div className="flex mt-12">
                    <img src={account_comment_demo} />
                    <div className="w-full input-review-wraper py-3 px-4 mx-4 flex">
                        <input className="w-full input-review" type='text' placeholder="Write comment" />
                        <img src={emoji_smile} />
                    </div>
                    <img src={send} />
                </div>

                {(listreivewcomment.map((val, i) => {
                    return (
                        <div className="flex mt-12 border-b border-[#232746] pb-9" key={i}>
                            <div><img className="max-w-[48px]" src={val.img} /></div>
                            <div className="ml-4">
                                <div className="flex ">
                                    <p className="font-semibold font-font_montserrat_semi_bold mr-6">{val.account_name}</p>
                                    <p className="list-item text-[14px]">{val.time_comment}</p>
                                </div>
                                <p className="text-[#ADB2DB] text-[14px] mt-2.5">{val.comment}</p>
                                <div className="flex  mt-6">
                                    <div className="flex min-w-[66px] mr-8">
                                        <img src={like_nocolor} />
                                        <p className="ml-2.5">{val.like}</p>
                                    </div>
                                    <div className="flex min-w-[66px] ">
                                        <img src={dislike_nocolor} />
                                        <p className="ml-2.5">{val.dislike}</p>
                                    </div>
                                    <p className="ml-8">Reply</p>
                                </div>
                                <div className="text-[#BFBFBF] flex mt-3"><p className="mr-4">See {val.answer_count} answers</p> <img src={arrow_down} /></div>
                            </div>
                        </div>
                    )
                }))}
            </div>
        </div>
    );
};

export default ProjectReview;
