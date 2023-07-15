export const removeVirtualId = function (doc, ret) {
  delete ret.id; // Exclude the 'id' field from toJSON
};
