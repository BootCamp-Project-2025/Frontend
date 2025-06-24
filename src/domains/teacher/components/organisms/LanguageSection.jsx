import React, { useEffect, useState } from "react";
import { ProfileSection } from "../molecules/ProfileSection";
import usePopup from "../../../../shared/hooks/usePopup";
import { PopupFormLayout } from "../atoms/PopupFormLayout";
import { Button } from "../../../../shared/components/atoms/Button";
import { LanguageCard } from "../molecules/LanguageCard";
import { LanguageForm } from "./LanguageForm";

export const LanguageSection = () => {
  const [languageList, setLanguageList] = useState([]);
  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    fetch("/requestLanguages.json")
      .then((res) => res.json())
      .then((data) => setLanguageList(data))
      .catch((err) => console.error("Error loading languages:", err));
  }, []);

  const addLanguage = (lang) => {
    setLanguageList((prev) => [...prev, lang]);
    closePopup();
  };

  const updateLanguage = (lang) => {
    setLanguageList((prev) => prev.map((l) => (l.id === lang.id ? lang : l)));
    closePopup();
  };

  const removeLanguage = (id) => {
    setLanguageList((prev) => prev.filter((l) => l.id !== id));
    closePopup();
  };

  const handleAdd = () => {
    openPopup(
      PopupFormLayout,
      {
        title: "Add Language",
        children: <LanguageForm addLanguage={addLanguage} />,
        onClose: closePopup,
      },
      true
    );
  };

  const handleEdit = (lang) => {
    openPopup(
      PopupFormLayout,
      {
        title: "Edit Language",
        children: (
          <LanguageForm
            id={lang.id}
            name={lang.name}
            proficiency={lang.proficiency}
            updateLanguage={updateLanguage}
            removeLanguage={removeLanguage}
          />
        ),
        onClose: closePopup,
      },
      true
    );
  };

  return (
    <>
      <ProfileSection title="Languages">
        <div className="space-y-2">
          {languageList.map((l) => (
            <LanguageCard
              key={l.id}
              id={l.id}
              name={l.name}
              proficiency={l.proficiency}
              editCard={() => handleEdit(l)}
            />
          ))}
        </div>
        <div className="mt-4">
          <Button variant="bordered" onClick={handleAdd}>
            <span className="material-symbols-outlined">add</span>
            <span>Add Language</span>
          </Button>
        </div>
      </ProfileSection>
    </>
  );
};
