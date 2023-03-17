import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_DB_URL);

const addPackage = async (payload) => {
  if (!payload.client){
    throw new Error("there is no client input");
  } else if(!payload.data){
    throw new Error("there is no data input");
  }
  try {
    const record = await pb.collection("packages").create(payload);
    return record;
  } catch (error) {
    throw new Error("database error");
  }
};

export { addPackage };
