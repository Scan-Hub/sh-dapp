import React from "react"
import { TailSpin } from "react-loading-icons"

import { Ul, Li, SuggestContainer ,SuggestList} from "./style";

const AvatarDefault = ({name}) => {
  return(
    <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
        <svg class="absolute -left-1 w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
    </div>
  )
}

const ItemSearch = ({ index, value, onClickDetail }) => {
  return (
    <Li
      className=""
      key={`${value._id}-${index}`}
     onClick={() => onClickDetail(value)}
    >
      <div className="flex justify-start content-center items-center space-x-4">
        {value.image ? <img
          className="w-12 h-12 rounded-full"
          src={value.image}
          alt={value.name}
        /> : <AvatarDefault name={ value.name ? value.name.charAt(0) :""} />}
        <span className="font-montserrat text-base"> {value.name}</span>
      </div>
    </Li>
  )
}

const LoadingSearch = () => {
  return (
    <div className="w-full h-full top-0 left-0 flex flex-col items-center justify-center text-green-text-profile">
      <TailSpin className="mb-2" fill="#00AF71" stroke="#00AF71" />
      Loading...
    </div>
  )
}

const NoData = () => {
  return (
    <div className="w-full h-full top-0 left-0 flex flex-col items-center justify-center text-[#aaa]">
        data not found
    </div>
  )
}

const ListCategorySearch = ({loading, options ,onClickFunction }) => {

  const onClickDetail = (value) => {
    
    if(value.type === "form"){    
      onClickFunction(`/project/${value.data?._id}`);
    }

    if(value.type === "partner"){    
      onClickFunction(`/partnership`);
    }

  }

  const renderCategory = (data) => {
    const {items,type} = data;
    if(items && items.length > 0){
     return (
        <div className="mt-2">
            <h4 className="text-green-text-profile text--bold capitalize font-poppins text-base px-4 py-3">
              {type}
            </h4>
            <Ul>
              {items?.map((value, index) => (
                  <ItemSearch index={index} value={value} onClickDetail={onClickDetail} />
              ))}
            </Ul>
        </div>
     )
    }
  }

  return (
    <div className="absolute left-0 top-[55px] w-full z-10">
      
        <SuggestContainer>
          {loading && <LoadingSearch />}
          <SuggestList>
            
          {!loading && options?.length > 0 &&
            options?.map((value, index) => (
              renderCategory(value)
            ))}

          {!loading && options?.length === 0 ? <NoData /> :""}

          </SuggestList>
        </SuggestContainer>
    
   </div>
  )
}

export default ListCategorySearch
