import { ButtonProfileSection } from "../atoms/ButtonProfileSection"

export const ProfileSection = ({title, children}) => {
  return (
    <div className="p-4 border-1 border-[#3B82F6] rounded-lg flex flex-col gap-2.5">
        <p className="text-lg font-bold text-[#3B82F6] ">{title}</p>
         {children}
    </div>
  )
}
