export const GetTokenSS = (): string => {
    const token = sessionStorage.getItem("token");
    if (token != null) {
        return token;
    } else {
        return "-";
    }
}
export const SetTokenSS = (token: string) => {
    sessionStorage.setItem("token", token)
}