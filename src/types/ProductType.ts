export type ProductType = {
    title: string,
    text: string,
    product_Id: string,
    user_Id: string,
    selected?: boolean,
    user_login?: string,
    current_Price: number,
    rate: number
}
export type UserType = {
    login: string,
    id: string,
    age: number,
    password?: string,
}


export function cleaner(one: any, two?: any, three?: any, four?: any, five?: any, six?: any): void {
    one("")
    if (two) {
        two("")
    }
    if (three) {
        three("")
    }
    if (four) {
        four("")
    }
    if (five) {
        five("")
    }
    if (six) {
        six("")
    }
}

