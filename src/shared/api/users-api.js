import { authInstance } from "./auth-api";

export const fetchAllUsersFromGroupsRequest = async(id)=> {
    const {data} = await authInstance.get(`/users/group/${id}`);
    return data; 
}

