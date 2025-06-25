import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";

export const HeaderButtons = ({
  user,
  signIn = () => {},
  signUp = () => {},
  becomeTeacher = () => {},
  switchToTeacher = () => {},
}) => {
  if (user) {
    return (
      <>
        {!user.isTeacher && (
          <Button
            className="text-nowrap text-sm flex justify-center"
            onClick={becomeTeacher}
          >
            Become a Teacher
          </Button>
        )}

        {user.isTeacher && (
          <Button
            className="text-nowrap text-sm flex justify-center"
            onClick={switchToTeacher}
          >
            Switch to Teacher
          </Button>
        )}
      </>
    );
  } else {
    return (
      <>
        <Button className="text-nowrap  flex justify-center" onClick={signIn}>
          Sign In
        </Button>
        <Button
          color="secondary"
          className="text-nowrap flex justify-center"
          onClick={signUp}
        >
          Sign up
        </Button>
      </>
    );
  }
};

HeaderButtons.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    isTeacher: PropTypes.bool.isRequired,
  }),
  signIn: PropTypes.func,
  signUp: PropTypes.func,
  becomeTeacher: PropTypes.func,
  switchToTeacher: PropTypes.func,
};
