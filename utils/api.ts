import axios from "axios";
import { IEnquiry } from "../types";
import { IUseVerifyRecaptchaMutationParameters } from "../hooks/useVerifyRecaptcha";

export const createEnquiry = async (enquiry: IEnquiry): Promise<void> => {
  await axios.post("/api/enquiries", enquiry);
};

export const verifyRecaptcha = async (
  parameters: IUseVerifyRecaptchaMutationParameters
): Promise<void> => {
  await axios.post("/api/recaptcha", parameters);
};

export const getIpAddress = async (): Promise<string> => {
  try {
    const response = await axios.get("https://api.ipify.org/?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error retrieving IP address: ", error);
    throw error;
  }
};

export const getFallbackIpAddress = async (): Promise<string> => {
  try {
    const { RTCPeerConnection, RTCSessionDescription } = window;

    /* Create a temporary `RTCPeerConnection`. */
    const peerConnection = new RTCPeerConnection();

    /* Create a data channel to trigger candidate gathering. */
    peerConnection.createDataChannel("");

    /* Create an offer and set the local description. */
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    // Get the local IP address from the ICE candidate
    const localIp =
      peerConnection.localDescription?.sdp.match(/(?<=c=IN IP4 )[^ .]+/)?.[0] ||
      "";

    /* Close the peer connection. */
    peerConnection.close();

    return localIp;
  } catch (error) {
    console.error("Error retrieving IP address:", error);
    throw error;
  }
};
