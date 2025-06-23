import { Icon } from "./Icon";
import PropTypes from "prop-types";
import { Title } from "./Title";

const About = ({ text }) => {
  return (
    <div className="flex flex-col gap-2 flex-[0.5]">
      <div className="flex items-center gap-2">
        <Title size="lg" color="secondary">
          About me
        </Title>
        <Icon icon="edit" className={"cursor-pointer self-start"} />
      </div>
      <p className="text-[color:var(--color-default-500)] ">{text}</p>
    </div>
  );
};

export default About;

About.propTypes = {
  text: PropTypes.string,
};
