import axios from "axios";
import { BASE_URL } from "../Config/BaseUrl";

const token = localStorage.getItem("token");

export const SchoolRegAPI = {
  getAllFeesStructure: async (c_id, con_id) => {
    var axiosConfig = {
      method: "GET",
      url: `${BASE_URL}fees_structure_api/?fk_class=${c_id}&fk_concession=${con_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    return await axios(axiosConfig);
  },
  createFeesStructure: async (data) => {
    var axiosConfig = {
      method: "POST",
      url: `${BASE_URL}fees_structure_api/`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    };
    return await axios(axiosConfig);
  },

  getAllConcession: async (data) => {
    var axiosConfig = {
      method: "GET",
      url: `${BASE_URL}masterdata_api/`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    };
    return await axios(axiosConfig);
  },
};
