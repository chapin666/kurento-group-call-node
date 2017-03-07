

/**
 * 
 */
export default class Register {

    /**
     * 
     */
    constructor() {
        this.usersById = {};
        this.usersByName = {};
    }

    /**
     * register
     * 
     * @param {object} user 
     */
    register(user) {
        this.usersById[user.id] = user;
        this.usersByName[user.name] = user;
    }

    /**
     * 
     * @param {string} id 
     */
    unregister(id) {
        let user = this.getById(id);
        if (user) {
            delete this.usersById[id];
        }
        if (user && this.getByName(user.name)) {
            delete this.usersByName[user.name];
        }
    }

    /**
     * 
     * @param {*} id 
     */
    removeById(id) {
        let userSession = this.usersById[id];
        if (!userSession) {
            return;
        }
        delete this.usersById[id];
        delete this.usersByName[userSession.name];
    }

    /**
     * 
     * @param {string} room 
     */
    getUsersByRoom(room) {
        let userList = this.usersByName;
        let usersInRoomList = [];
        for (let i in userList) {
            if (userList[i].room === room) {
                usersInRoomList.push(userList[i]);
            }
        }
    }

    /**
     * 
     * @param {string} id 
     */
    getById(id) {
        return this.usersById[id];
    }

    /**
     * 
     * @param {string} name 
     */
    getByName(name) {
        return this.usersByName[name];
    }
}
