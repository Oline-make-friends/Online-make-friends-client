import { createContext, useContext } from "react";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  // const userInfo = useSelector((state) => state.auth?.login.currentUser);
  //   const [user, setUser] = useState();

  //   useEffect(() => {
  //     setUser(userInfo);
  //     // eslint-disable-next-line
  //   }, []);
  return <ChatContext.Provider>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  useContext(ChatContext);
};

export default ChatProvider;
