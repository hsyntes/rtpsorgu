import HttpRequest from "./HttpRequest";

export const searchGames = async (payload) =>
  await HttpRequest.get(`games/search/${payload}`);
// export const getGames = async () => await HttpRequest.get("games");
export const getGame = async (id) => await HttpRequest.get(`games/${id}`);
export const createRtp = async () => await HttpRequest.post("games/rtp/create");
