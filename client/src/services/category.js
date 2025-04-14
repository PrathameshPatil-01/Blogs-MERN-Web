import axios from "axios";
import { config } from "./config";


export async function addCategory(
    category
) {
    console.log(category);

    try {
        // create the API url
        const url = `${config.serverURL}/categories/addcategory`

        const user = JSON.parse(sessionStorage.getItem('user'));

        // make the POST /user/register API call
        const response = await axios.post(url, category, {
            headers: {
                token: user.token, // sending the token here
            },
        })

        // return the response body to the caller
        return response.data
    } catch (ex) {
        console.log(`exception occurred in add category: `, ex)
    }
}

export const showCategories = async () => {
    try {
        const url = `${config.serverURL}/categories/showcategories`;

        const response = await axios.get(url);

        return response.data;
    }
    catch (err) {
        console.log('Error in showcategories', err);
    }
}
