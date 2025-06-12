import { useEffect, useState } from "react";
import { ProfileSection } from "../../../../shared/components/molecules/ProfileSection";
import { DialogContainer } from "../../../../shared/components/atoms/DialogContainer";
import { LanguageForm } from "./LanguageForm";
import { Button } from "../../../../shared/components/atoms/Button";
import { LanguageCard } from "../molecules/LanguageCard";

export const LanguageSection = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/requestLanguages.json")
      .then((res) => res.json())
      .then((data) => setLanguageList(data))
      .catch((err) => console.error("Error loading languages:", err));
  }, []);

  const addLanguage = (lang) => setLanguageList((prev) => [...prev, lang]);
  const updateLanguage = (lang) =>
    setLanguageList((prev) => prev.map((l) => (l.id === lang.id ? lang : l)));
  const removeLanguage = (id) =>
    setLanguageList((prev) => prev.filter((l) => l.id !== id));

  const openNew = () => {
    setSelected(null);
    setFormVisible(true);
  };
  const openEdit = (id) => {
    const lang = languageList.find((l) => l.id === id);
    if (lang) {
      setSelected(lang);
      setFormVisible(true);
    }
  };
  const closeForm = () => {
    setSelected(null);
    setFormVisible(false);
  };

  return (
    <>
      <div className="p-4">
        <ProfileSection title="Languages">
          <>
            <div className="space-y-2">
              {languageList.map((l) => (
                <LanguageCard
                  key={l.id}
                  id={l.id}
                  name={l.name}
                  proficiency={l.proficiency}
                  editCard={openEdit}
                />
              ))}
            </div>
            <div className="mt-4">
              <Button
                styleType="addBtn"
                classname="text-white fill-white"
                onClick={openNew}
              >
                <span className="material-symbols-outlined">add</span>
                <p>Add Language</p>
              </Button>
            </div>
          </>
        </ProfileSection>
      </div>

      <DialogContainer isOpen={formVisible} onClose={closeForm}>
        <div className="p-6 max-h-[85vh] max-w-[90vw] w-80 overflow-y-auto">
          {formVisible && (
            <LanguageForm
              {...(selected || {})}
              addLanguage={addLanguage}
              updateLanguage={updateLanguage}
              removeLanguage={removeLanguage}
              closeForm={closeForm}
            />
          )}
        </div>
      </DialogContainer>
    </>
  );
};
