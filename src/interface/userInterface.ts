export interface UserRegisterInterface {
    username: string,
    email: string,
    password: string,
    confirm_password: string,
}

export interface UserLoginInterface {
    email: string,
    password: string,
}

export interface UserAuthState {
    token: string | null,
    setToken: (token: string) => void,
    logOut: () => void,
}