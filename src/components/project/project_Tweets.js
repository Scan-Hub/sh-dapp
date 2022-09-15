import React from 'react';
import VeBank from "../../assets/images/project/VeBank.svg";
import xINVESTOR from "../../assets/images/project/xINVESTOR.svg";
import tweets_img_1 from "../../assets/images/project/tweets_img_1.jpg";
import tweets_img_2 from "../../assets/images/project/tweets_img_2.jpg";
import comment from "../../assets/images/project/project_icon/comment.svg";
import share_tweet from "../../assets/images/project/project_icon/share_tweet.svg";
import retweet from "../../assets/images/project/project_icon/retweet.svg";
import Heart from "../../assets/images/project/project_icon/Heart.svg";
import three_dots from "../../assets/images/project/project_icon/three_dots.svg";

const ProjectTweets = () => {

    return (
        <div className="lg:bg-[#000000] w-full">
            <div id="scroll-project" className="max-w-full lg:max-h-[80vh] overflow-y-auto overflow-x-hidden">
                <div className="flex w-full gap-8 p-4">
                    <div className="lg:w-[65%]">
                        <img className="w-full rounded-2xl max-h-[500px] lg:block hidden" src={tweets_img_1} />
                        <img className="lg:hidden block min-w-[55px]" src={xINVESTOR} />
                    </div>
                    <div className="lg:w-[35%] max-w-[85%] pr-14">
                        <div className="flex">
                            <img className="lg:block hidden w-[60px] h-[60px]" src={xINVESTOR} />
                            <div className="lg:block flex w-full ml-2.5">
                                <p className="mr-4">xINVESTOR</p>
                                <p className='lg:mt-1.5 text-[#6E767D]'>@xinvestorcom · 6d</p>
                            </div>
                            <div className="w-1/3 ">
                                <img className="float-right" src={three_dots} />

                            </div>
                        </div>
                        <div className="mt-8 border-b border-[#6E767D]">
                            <p className="leading-6">Today, we are announcing the listing of $VET (@vechainofficial) on xINVESTOR exchange. All users can now trade the asset on our platform.
                                Happy trading!🙂
                            </p>
                            <p className="my-10"> ⏰Time: 12:00 PM UTC</p>
                            <a className="text-[#0096FF] break-words" href="https://xinvestor.com/en_US/newTrade/VET_USDT" target="_blank">https://xinvestor.com/en_US/newTrade/VET_USDT</a>
                            <div className="flex text-[#0096FF] mt-10">
                                <a>#VET</a>
                                <a className="ml-2">#vechain</a>
                                <a className="ml-2">#crypto</a>
                                <a className="ml-2">xINVESTOR</a>
                            </div>
                            <img className="rounded-2xl mt-2 mb-4 w-full lg:hidden block" src={tweets_img_1} />
                            <div>
                                <p className="text-[#6E767D] my-10 lg:block hidden">4:07 PM · Jul 15, 2022</p>
                            </div>
                        </div>
                        <div className="flex grid-cols-4 gap-14 mt-6">
                            <div className="flex text-[#6E767D]">
                                <img className="mr-4" src={comment} />
                                <p>10</p>
                            </div>
                            <div className="flex text-[#6E767D]">
                                <img className="mr-4" src={retweet} />
                                <p>103</p>
                            </div>
                            <div className="flex text-[#6E767D]">
                                <img className="mr-4" src={Heart} />
                                <p className="mr-4 text-[#FF1970]">900</p>
                            </div>
                            <div className="flex text-[#6E767D]">
                                <img className="mr-4" src={share_tweet} />
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex min-h-[500px] w-full mt-10">
                    <div className="lg:w-[65%]">
                        <img className="w-full rounded-2xl  max-h-[500px] lg:block hidden" src={tweets_img_2} />
                        <img className="lg:hidden block min-w-[55px]" src={VeBank} />

                    </div>
                    <div className="lg:w-[35%] max-w-[85%] ml-8 pr-14">
                        <div className="flex">
                            <img className="w-[60px] h-[60px] lg:block hidden" src={VeBank} />
                            <div className="lg:block flex w-full ml-2.5">
                                <p  className="mr-4">VeBank</p>
                                <p className='lg:mt-1.5 text-[#6E767D]'>@xinvestorcom · Jul 15</p>
                            </div>
                            <div className="w-1/3 ">
                                <img className="float-right" src={three_dots} />

                            </div>
                        </div>
                        <div className="mt-8 border-b border-[#6E767D]">
                            <p className="leading-6">🔗 VeBank Launchpad</p>
                            <p className="leading-6">🚀 A platform for blockchain projects built on VeChain get closer to crypto investors and users.</p>
                            <p className="leading-6">🚀 A launcher for Web3 dApps builders on VeChain take their very first step to the world.</p>

                            <p className="my-10"> ⏰Time: 12:00 PM UTC</p>
                            <div className="flex text-[#0096FF] mt-10">
                                <a>@vechainofficial</a>
                                <a className="ml-2">@VechainThorCom</a>
                            </div>
                            <div className="flex text-[#0096FF] ">
                                <a>#VeChain</a>
                                <a className="ml-2">#VeBank</a>
                                <a className="ml-2">#DeFi</a>
                                <a className="ml-2">#VeFam</a>
                            </div>
                            <img className="rounded-2xl mt-2 mb-4 w-full lg:hidden block" src={tweets_img_2} />

                            <div>
                                <p className="text-[#6E767D] my-10 lg:block hidden">4:07 PM · Jul 15, 2022</p>
                            </div>
                        </div>
                        <div className="flex grid-cols-4 gap-14 mt-6">
                            <div className="flex text-[#6E767D]">
                                <img className="mr-4" src={comment} />
                                <p>10</p>
                            </div>
                            <div className="flex text-[#6E767D]">
                                <img className="mr-4" src={retweet} />
                                <p>103</p>
                            </div>
                            <div className="flex text-[#6E767D]">
                                <img className="mr-4" src={Heart} />
                                <p className="mr-4 text-[#FF1970]">900</p>
                            </div>
                            <div className="flex text-[#6E767D]">
                                <img className="mr-4" src={share_tweet} />
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProjectTweets;
