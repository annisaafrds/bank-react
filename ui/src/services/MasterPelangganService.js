import http from "..http-common";

const getAll = () => {
  return http.get("/getMasterPelanggan")
}

export default MasterPelangganService;
