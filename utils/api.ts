import axios from "axios";
import { IEnquiry } from "../types";

export const createEnquiry = async (enquiry: IEnquiry): Promise<void> => {
  await axios.post("/api/enquiries", enquiry);
};
