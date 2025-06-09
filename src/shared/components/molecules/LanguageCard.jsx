import React from "react";
import PropTypes from "prop-types";
import { Button, BUTTON_STYLE_TYPES } from "../atoms/Button";

export const LanguageCard = ({ id, name, proficiency, onEdit }) => (
  <div
    className="flex items-center justify-between p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
    onClick={() => onEdit(id)}
  >
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-600">{proficiency}</p>
    </div>
    <Button styleType={BUTTON_STYLE_TYPES.ADD}>Edit</Button>
  </div>
);

LanguageCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  proficiency: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};
