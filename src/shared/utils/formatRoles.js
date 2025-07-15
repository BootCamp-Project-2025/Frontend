export const formatRoles = (roles) => {
  if (!Array.isArray(roles)) return [];

  return roles.map((role) => {
    switch (role) {
      case "CLIENT":
        return "Student";
      case "FREELANCER":
        return "Teacher";
      default:
        return role;
    }
  });
};
