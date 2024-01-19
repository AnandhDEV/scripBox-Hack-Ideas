export const useAuth = () => {
  const authContext = JSON.parse(localStorage.getItem("userDetails"));

  console.log(authContext);
  return {
    isAuth: !!authContext?.userId,
    userName: authContext?.name ?? "",
    userId: authContext?.userId ?? "",
  };
};
