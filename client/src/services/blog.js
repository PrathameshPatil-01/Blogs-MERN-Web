import axios from "axios";
import { config } from "./config";
import AllBlogs from './../pages/AllBlogs';


export async function addBlog(
    blog
) {
    console.log(blog);

    try {
        // create the API url
        const url = `${config.serverURL}/blogs/addblog`

        const user = JSON.parse(sessionStorage.getItem('user'));

        // make the POST /user/register API call
        const response = await axios.post(url, blog, {
            headers: {
                token: user.token, // sending the token here
            },
        })

        // return the response body to the caller
        return response.data
    } catch (ex) {
        console.log(`exception occurred in add blog: `, ex)
    }
}

export const getAllBlogs = async () => {
    try {
        const url = `${config.serverURL}/blogs/allblogs`;

        const response = await axios.get(url);

        return response.data;
    }
    catch (err) {
        console.log('Error in showcategories', err);
    }
}

export const getMyBlogs = async () => {
    try {
        const url = `${config.serverURL}/blogs/myblogs`;

        // get the token
        const user = JSON.parse(sessionStorage.getItem('user'));

        const response = await axios.get(url, {
            headers: {
                token: user.token, // sending the token here
            },
        });

        return response.data;
    }
    catch (err) {
        console.log('Error in myblogs', err);
    }
}
