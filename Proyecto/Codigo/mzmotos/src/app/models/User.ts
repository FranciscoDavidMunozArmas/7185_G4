export class User {
    _id?:string;
    username:string;
    password:string;
    role: string

    constructor(username:string, password:string, role:string, id?:string) {
        this.username = username;
        this.password = password;
        this.role = role;
        this._id = id;
    }
}

export const userConverter = {
    fromJSON: (json: any): User => {
        return new User(json.username, json.password, json.role, json._id);
    },
    toJSON: (user: User): any => {
        return {
            username: user.username,
            password: user.password,
            role: user.role,
            _id: user._id
        };
    }
}