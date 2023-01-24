import { useMemo } from 'react';
import { useSelector } from 'react-redux';
const useUserPrivilege = (moduleName) => {
  const { user } = useSelector((state) => state.auth);
  const userRoles = useMemo(
    () => user.roles.find((role) => role.module === moduleName),
    [moduleName, user]
  );

  const isUserAdmin = user.auth === 'Admin';
  const isUserSeller =
    user.auth === 'Participant' && user?.participantType === 'Seller';

  const fetchPrivilege = isUserAdmin || userRoles?.fetch || isUserSeller;
  const addPrivilege = (isUserAdmin || userRoles?.add) && !isUserSeller;
  const editPrivilege = (isUserAdmin || userRoles?.edit) && !isUserSeller;
  const deletePrivilege = (isUserAdmin || userRoles?.delete) && !isUserSeller;

  return {
    fetchPrivilege,
    addPrivilege,
    editPrivilege,
    deletePrivilege,
    isUserAdmin
  };
};

export default useUserPrivilege;
