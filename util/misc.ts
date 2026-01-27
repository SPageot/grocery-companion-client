import { GroceryListProps } from "@/types/ListTypes"
import { UserDBType, UserDetailsType } from "@/types/userTypes"

const DEV = false

export const BASE_URL = DEV ?  process.env.EXPO_PUBLIC_API_URL : process.env.EXPO_PUBLIC_PROD_API_URL


export const userDetails: UserDetailsType = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    name: "",
}

export const userDBDetails: UserDBType = {
    _id:"",
    username: "",
    password: "",
    email: "",
    phone_number: "",
    name: "",
}

export const listDBDetails: GroceryListProps = {
    _id:"",
    user_id:"",
    title:"",
    list_items:[],
}