import React from "react";

import { CometChatUI } from "../../cometchat-pro-react-ui-kit-master/cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import * as CONSTANT from "../../constants/constans";
import { CometChat } from "@cometchat-pro/chat";

const ChatAdmin = () => {
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(CONSTANT.APP_REGION)
    .build();
  CometChat.init(CONSTANT.APP_ID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
      CometChat.login(`admin`, CONSTANT.AUTH_KEY)
        .then(console.log("Login success"))
        .catch(() => {
          console.log("Login fail");
        });
    },
    (error) => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}>
      <CometChatUI />
    </div>
  );
};

export default ChatAdmin;
