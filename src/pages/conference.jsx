import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../store/AppContext";
import {
  Header,
  ControlBar,
  ParticipantList,
  Settings,
} from "@100mslive/sdk-components";
import { ScreenShareView } from "../views/screenShareView";
import { TeacherView } from "../views/teacherView";
import { useHistory } from "react-router-dom";
import { useHMSRoom } from "@100mslive/sdk-components";
import { isScreenSharing } from "../utlis/index";

export const Conference = () => {
  const history = useHistory();
  const context = useContext(AppContext);
<<<<<<< HEAD

  const {
    loginInfo,
    isChatOpen,
    toggleChat,
    isConnected,
    maxTileCount,
    setMaxTileCount,
    leave,
  } = context;

  const {
    sendMessage,
    localPeer,
    toggleMute,
    toggleScreenShare,
    peers,
    audioMuted,
    videoMuted,
  } = useHMSRoom();
  const [participants, setParticipants] = useState([]);
=======
  const { loginInfo, isConnected, leave } = context;

  const {localPeer, toggleMute, toggleScreenShare, peers } = useHMSRoom();
>>>>>>> main

  if (!loginInfo.token) {
    history.push("/");
  }
  useEffect(() => {
    return () => {
      leave();
    };
  }, []);

  useEffect(() => {
    setParticipants(
      peers && peers.length > 0 && peers[0]
        ? peers
            .map((participant) => {
              console.debug("app: Participant is ", participant);
              return {
                peer: {
                  displayName: participant.name,
                  id: participant.id,
                },
              };
            })
        : []
    );
  }, [peers]);

  return (
    <div className="w-full h-full bg-black">
      <div style={{ padding: "25px", height: "10%" }}>
<<<<<<< HEAD
        <Header
          rightComponents={[
            <ParticipantList key={0} participantList={participants} />,
          ]}
        />
=======
        <Header rightComponents={[<ParticipantList key={0} participantList={participants} />]} />
>>>>>>> main
      </div>
      <div className="w-full flex" style={{ height: "80%" }}>
        {peers.some(isScreenSharing) ? <ScreenShareView /> : <TeacherView />}
        {/* // ) : (
        //   <StudentView
        //     streamsWithInfo={streamsWithInfo
        //       .filter(
        //         (item) =>
        //           item.videoSource == "screen" || item.videoSource == "camera"
        //       )
        //       .map((item) => ({
        //         ...item,
        //         stream: !item.isVideoMuted
        //           ? item.videoSource == "screen"
        //             ? screenStream
        //             : cameraStream
        //           : new MediaStream(),
        //       }))}
        //   />
        // )} */}
      </div>
      <div className="bg-black" style={{ height: "10%" }}>
<<<<<<< HEAD
        {isConnected && (
          <ControlBar
            maxTileCount={maxTileCount}
            setMaxTileCount={setMaxTileCount}
            audioButtonOnClick={() => toggleMute("audio")}
            videoButtonOnClick={() => toggleMute("video")}
            leaveButtonOnClick={() => {
              leave();
              history.push("/");
            }}
            screenshareButtonOnClick={() => toggleScreenShare()}
            isAudioMuted={audioMuted}
            isVideoMuted={videoMuted}
            isChatOpen={isChatOpen}
            chatButtonOnClick={() => {
              toggleChat();
            }}
          />
        )}
=======
        {isConnected && <ControlBar
          audioButtonOnClick={() => {
            toggleMute(localPeer.audioTrack);
          }}
          videoButtonOnClick={() => {
            toggleMute(localPeer.videoTrack);
          }}
          leaveButtonOnClick={() => {
            leave();
            history.push("/");
          }}
          screenshareButtonOnClick={() => toggleScreenShare()}
          isAudioMuted={localPeer &&
            !(
              localPeer.audioTrack &&
              localPeer.audioTrack.enabled
            )
          }
          isVideoMuted={localPeer &&
            !(
              localPeer.videoTrack &&
              localPeer.videoTrack.enabled
            )
          }
        />}
>>>>>>> main
      </div>
    </div>
  );
};
