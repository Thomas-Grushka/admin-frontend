import { authInstance } from "./auth-api";

export const fetchAllGroupsRequest = async()=> {
    const {data} = await authInstance.get("/groups");
    return data; 
}

export const fetchAddGroupRequest = async payload => {
    const {data} = await authInstance.post("/groups", payload);
    return data; 
}

export const fetchDeleteGroupsRequest = async payload => {
    const {data} = await authInstance.delete("/groups", {data: payload});
    return data; 
}

export const fetchToggleActiveGroupsRequest = async payload => {
    const {data} = await authInstance.patch("/groups/active", payload);
    return data; 
}

export const fetchUpdateGroupByIdRequest = async (id, payload) => {
    const {data} = await authInstance.put(`/groups/${id}`, payload);
    return data; 
}
