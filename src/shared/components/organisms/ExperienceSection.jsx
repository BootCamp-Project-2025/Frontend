import { useEffect, useState } from "react";
import { ProfileSection } from "./ProfileSection";
import { ButtonProfileSection } from "../atoms/ButtonProfileSection";
import { DialogContainer } from "../atoms/DialogContainer";
import { ExperienceSectionForm } from "./ExperienceSectionForm";
import { ExperienceCard } from "../molecules/ExperienceCard";

export const ExperienceSection = () => {
 
    const [experienceFormVisible, setExperienceFormVisible] = useState(false)
    const [experienceList, setExperienceList] = useState([]);
 
   useEffect(() => {
     fetch("/requestExperience.json")
       .then(res => res.json())
       .then(data => setExperienceList(data))
       .catch(err => console.error("Error loading experience data:", err));
   }, []);

   const addExperienceCard = (experience) => {
        setExperienceList(prev => [...prev, experience])
   }

   const closeExperienceForm = () => {
        setExperienceFormVisible(false)
   }
    
   return <>
   
     <div className="p-4">
       <ProfileSection  title={"Experience"}>        
         <>
           {experienceList.map(exp => (
             <ExperienceCard
               key={exp.id}
               id={exp.id}
               jobPosition={exp.jobPosition}
               employer={exp.employer}
               country={exp.country}
               startDate={exp.startDate}
               endDate={exp.endDate}
               description={exp.description}
             />
           ))}
           <div>
               <ButtonProfileSection onClick={() => setExperienceFormVisible(true)}>
                 Add Experience
               </ButtonProfileSection>
            </div>
         </>
       </ProfileSection>
     </div>
     
     <DialogContainer isOpen={experienceFormVisible} onClose={() => { setExperienceFormVisible(prev => !prev) }}>
         <div className="px-7 py-7 flex flex-col max-h-[85vh] max-w-[90vw]  w-200 overflow-y-auto">
           {experienceFormVisible && <ExperienceSectionForm addExperienceCard= {addExperienceCard} closeExperienceForm = {closeExperienceForm} jobPosition= {""} employer= {""} country= {""} startDate= {""} endDate= {""} description= {""}/>}
         </div>
     </DialogContainer>
     
   </>;
}
