import { useNavigate } from "react-router-dom";

const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back by one step in the browser history
  };

  return goBack;
};

export default useGoBack;
