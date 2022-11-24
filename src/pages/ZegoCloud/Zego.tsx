import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Box, Center, Text } from "@chakra-ui/react";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function Zego() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element: HTMLDivElement) => {
    // generate Kit Token
    const appID = 442638381;
    const serverSecret = "371577620a5eb253ac2a85262b6ee3a6";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.origin +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return (
    <Box w="100vw" h="90vh">
      <Center w="100%" h="100%">
        <Box
          w="90%"
          h="90%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          p="4"
          borderRadius="15px"
        >
          <Text color="white" mt="100px">
            Your room ID is: {roomID}
          </Text>
          <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: "100vw", height: "100vh" }}
          ></div>
        </Box>{" "}
      </Center>
    </Box>
  );
}
