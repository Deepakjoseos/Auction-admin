import { useMemo } from 'react';
import { useSelector } from 'react-redux';
const useUserPrivilege = (moduleName) => {
  const { user } = useSelector((state) => state.auth);
  const userRoles = useMemo(
    () => user.roles.find((role) => role.module === moduleName),
    [moduleName, user]
  );

  const isUserAdmin = user.auth === 'Admin';
  const fetchPrivilege = isUserAdmin || userRoles.fetch;
  const addPrivilege = isUserAdmin || userRoles.add;
  const editPrivilege = isUserAdmin || userRoles.edit;
  const deletePrivilege = isUserAdmin || userRoles.delete;

  return {
    fetchPrivilege,
    addPrivilege,
    editPrivilege,
    deletePrivilege,
    isUserAdmin
  };
};

export default useUserPrivilege;
