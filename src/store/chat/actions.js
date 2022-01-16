export const changeRoom = (context, payload) => {
  context.commit("setRoomId", payload);
};

export const remove = (context, payload) => {
  context.commit("clearRoom", payload);
};
