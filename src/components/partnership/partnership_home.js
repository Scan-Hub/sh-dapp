import React, { useEffect, useMemo, useReducer, useState } from 'react';
import partnership_head from "../../assets/images/partnership/partnership_head.jpg";
import partnership_head_mb from "../../assets/images/partnership/partnership_head_mb.png";
import head_bg from "../../assets/images/partnership/head_bg.png";
import Partnership_menulist from "./partnership_menulist";
import PartnershipFilters from "./partnership_filter.js";
import { useDispatch, useSelector } from "react-redux";
import { FindType, selectTab, filter, selectSelectedTab, selectTableData, selectPending } from "../../reducers/partnership.reducer";
import Table from "../../components/home/table/table"
import { async } from '@firebase/util';

const Partnership_home = () => {
    const selectedType = useSelector(selectSelectedTab);
    const tabledata = useSelector(selectTableData);
    const pending = useSelector(selectPending);
    const [pageSize, setPageSize] = useState(3);
    const dispatch = useDispatch();
    const onMenuClickListener = (menuType) => {
        dispatch(selectTab(menuType));
    }
    console.log(tabledata.items)
    useEffect(() => {
        dispatch(filter({ type: selectedType }))
    }, [selectedType])

    const customeData = useMemo(() => { 
        if (!tabledata?.items) return []
        return tabledata?.items?.map(value => value.detail) 
    }, [tabledata])

    const columns = React.useMemo(
        () => [
            {
                Header: "#",
                accessor: (row, i) => i + 1,
                disableSortBy: true,
            },
            {
                Header: "Organization Name",
                accessor: "name",
            },
            {
                Header: "Country",
                accessor: "country",

            },
            {
                Header: "Portfolio",
                accessor: "portfolios",
            },
            {
                Header: "Partner",
                accessor: "partners",
            },
            {
                Header: "Industries",
                accessor: "industries",
            },
            {
                Header: "Rank",
                accessor: (row, i) => i + 1,
                disableSortBy: true,
            },
        ],
        []
    );
    const listMenu = [
        { menuType: FindType.Company, label: "Company" },
        { menuType: FindType.Capital, label: "Venture Capital" },
        { menuType: FindType.Marketing, label: "Marketing Agency" },
        { menuType: FindType.Launchpad, label: "Launchpad" },
        { menuType: FindType.Incubator, label: "Incubator" },
        { menuType: FindType.Accelerator, label: "Accelerator" },
        { menuType: FindType.Talent, label: "Blockchain Talent" }

    ];
    return (
        <div className="lg:container pb-[56px] md:mx-auto px-4">
            <div className="relative">
                <img className="w-full rounded-[32px] md:relative absolute md:block hidden" src={partnership_head} />
                <img className="w-full absolute md:hidden block z-[-1]" src={head_bg} />
                <div className="md:absolute lg:pl-[88px] md:pl-[40px] px-[24px] top-0 md:w-[60%] w-full md:text-left text-center md:pt-0 pt-[60px] h-full flex flex-col md:justify-center md:items-start items-center">
                    <p className="font-Elemental_End sm:text-[32px] text-[24px] leading-[48px] text-[#5EFFA4] mb-4">Connect <br /> for partnership</p>
                    <p className='sm:text-[16px] text-[14px]'>Connect with Partnership - a global matching platform that enables users to search, identify and connect to their missing pieces. We strive to connect thousands of startups, venture capitals, incubators, launchpad, and talents in the blockchain space who come together with promising collaboration opportunities.</p>
                    <img className="max-w-[345px] md:hidden block mt-[80px]" src={partnership_head_mb} />
                </div>
            </div>
            <div className="mt-[48px]">
                <p className="text-[#00AF71] text-[18px] font-montserrat_bold">Partners</p>
                <div className="flex items-center mt-6 overflow-x-auto ">
                    <a className="h-[30px]"></a>
                    {listMenu.map((e, i) => (
                        <div className="project-filter-btn cursor-pointer" key={i}>
                            {/* eslint-disable-next-line react/jsx-pascal-case*/}
                            <Partnership_menulist
                                menuType={e.menuType}
                                label={e.label}
                                onMenuClick={() => onMenuClickListener(e.menuType)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-[72px] flex flex-row">
                <PartnershipFilters />
                <div className='w-full pl-[48px]'>
                    <Table
                        loading={pending}
                        columns={columns}
                        data={customeData}
                        pageSizeProps={pageSize}
                        styleTitleColumns={"bg-box-bg "}
                        className="flex flex-grow"
                    />
                </div>

            </div>
        </div>
    );
};

export default Partnership_home;
