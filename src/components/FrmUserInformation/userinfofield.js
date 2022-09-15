import React, {useEffect} from "react"
import { useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"

const UserRegister_field = ({ img, label, place, field ,value}) => {
  const { register } = useFormContext()
 
  return (
    <div className="mt-[24px]">
      <div className="flex">
        <img className="mr-[14px] w-[16px] h-[16px]" src={img} />
        <p className="font-montserrat_semi_bold text-[14px]">{label}</p>
      </div>
      <div className="flex px-4 py-3 bg-[#19202c] rounded-lg mt-2.5">
        <input
          type="text"
          className=" focus:outline-none bg-transparent w-full"
          placeholder={place} defaultValue={value}
          {...register(field)}
        />
      </div>
    </div>
  )
}

export default UserRegister_field
