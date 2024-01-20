export const useAuth = () => {
  const authContext = JSON.parse(localStorage.getItem("userDetails"));

  return {
    isAuth: !!authContext?.userId,
    userName: authContext?.name ?? "",
    userId: authContext?.userId ?? "",
  };
};
