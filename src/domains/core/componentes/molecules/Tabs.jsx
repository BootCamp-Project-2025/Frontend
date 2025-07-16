import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button"

export const Tabs = ({selected = "", onClick = () => {}}) => {
  return (
    <div>
      <Button variant="ghost" onClick={() => onClick("table")} className={`${selected == "table" ? "underline" : ""}`}>Table</Button>
      <Button variant="ghost" onClick={() => onClick("graphic")} className={`${selected == "graphic" ? "underline" : ""}`}>Graphic</Button>
    </div>
  )
}

Tabs.propTypes = {
  selected: PropTypes.string,
  onClick: PropTypes.func,
};
