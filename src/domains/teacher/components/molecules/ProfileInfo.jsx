import PropTypes from "prop-types";
import profile from "../../../../assets/profile.png";
import { Image } from "../../../../shared/components/atoms/Image";
import { Title } from "../../../../shared/components/atoms/Title";
import { Icon } from "../../../../shared/components/atoms/Icon";

const ProfileInfo = ({ image = profile, name = "profile image", email }) => {
  return (
    <div className="flex items-center gap-8">
      <Image
        src={image}
        alt={`${name} profile image`}
        width="w-auto"
        height="h-full"
        styleType="profile"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Title size="lg" color="default">
            {name}
          </Title>
          <Icon icon={"edit"} className={"cursor-pointer self-start"} />
        </div>

        <div className="flex items-center gap-1">
          <Icon icon="email" />
          <p className="text-[var(--color-default-500)]">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

ProfileInfo.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
};
