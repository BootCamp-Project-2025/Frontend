
export const ExperienceCard = ({id, jobPosition, employer, country, startDate,endDate, description}) => {
  return (
    <div className="bg-[#D7E6FD] p-4 rounded-lg">
      <div className="flex flex-row gap-2.5">
        <div className="w-7 min-w-6 " >
          <svg  width= "100%" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  d="M29 15V26H3V15M16 20V16M20 6C20 6 20 2 16 2C12 2 12 6 12 6M2 6H30V14C30 14 24 18 16 18C8 18 2 14 2 14V6Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row flex-wrap text-md font-semibold text-gray-800 gap-1.5 justify-between ">
             <p className="text-nowrap">{jobPosition} </p>
             <p className="text-nowrap">{startDate} - {endDate}</p>
          </div>
          <p className="text-sm text-gray-500">{employer}, {country}</p>
          <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  )
}
