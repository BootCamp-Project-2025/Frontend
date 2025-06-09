import React, { useEffect, useState } from "react";
import { ProfileSection } from "./ProfileSection";
import { Button, BUTTON_STYLE_TYPES } from "../atoms/Button";
import { DialogContainer } from "../atoms/DialogContainer";
import { LanguageForm } from "./LanguageForm";
import { LanguageCard } from "../molecules/LanguageCard";

export const LanguageSection = () => {
  const [list, setList] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/requestLanguages.json")
      .then((r) => r.json())
      .then(setList)
      .catch(console.error);
  }, []);

  const addLanguage = (lang) => setList((l) => [...l, lang]);
  const updateLanguage = (lang) =>
    setList((l) => l.map((x) => (x.id === lang.id ? lang : x)));
  const removeLanguage = (id) => setList((l) => l.filter((x) => x.id !== id));

  const openNew = () => {
    setSelected(null);
    setFormVisible(true);
  };
  const openEdit = (id) => {
    setSelected(list.find((x) => x.id === id));
    setFormVisible(true);
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
              {list.map((l) => (
                <LanguageCard
                  key={l.id}
                  id={l.id}
                  name={l.name}
                  proficiency={l.proficiency}
                  onEdit={openEdit}
                />
              ))}
            </div>
            <div className="mt-4">
              <Button styleType={BUTTON_STYLE_TYPES.ADD} onClick={openNew}>
                + Add Language
              </Button>
            </div>
          </>
        </ProfileSection>
      </div>

      <DialogContainer isOpen={formVisible} onClose={closeForm}>
        <div className="p-6 max-w-md mx-auto">
          <LanguageForm
            {...(selected || {})}
            addLanguage={addLanguage}
            updateLanguage={updateLanguage}
            removeLanguage={removeLanguage}
            closeForm={closeForm}
          />
        </div>
      </DialogContainer>
    </>
  );
};
