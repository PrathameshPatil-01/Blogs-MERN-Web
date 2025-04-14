import axios from "axios";
import { config } from "./config";


export async function registerUser(
    userInfo
) {
    console.log(userInfo);

    try {
        // create the API url
        const url = `${config.serverURL}/users/register`

        // make the POST /user/register API call
        const response = await axios.post(url, userInfo)

        // return the response body to the caller
        return response.data
    } catch (ex) {
        console.log(`exception occurred: `, ex)
    }
}

export const loginUser = async (userInfo) => {
    try {
        const url = `${config.serverURL}/users/login`;

        const response = await axios.post(url, userInfo);

        return response.data;
    }
    catch (err) {
        console.log('Error in login', err);
    }
}

export const updateUser = async (userInfo) => {

    const { first_name, last_name, mobile_no, bio, profile_picture } = userInfo;


    const formData = new FormData();

    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('mobile_no', mobile_no);
    formData.append('bio', bio);
    formData.append('profile_picture', profile_picture);

    try {
        const url = `${config.serverURL}/users/update`;
        // get the token
        const user = JSON.parse(sessionStorage.getItem('user'));

        const response = await axios.put(url, userInfo, {
            headers: {
                token: user.token, // sending the token here
            },
        });

        return response.data;
    }
    catch (err) {
        console.log('Error in update profile', err);
    }
}