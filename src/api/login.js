// 网络库
import service from "../service/axios.config.js";

export default {
    loginToNet(account, password) {
        return service({
            method: "get",
            url: "/login",
            params: {
                email: account,
                password
            },
        });
    },
    getUserInfo() {
        return service({
            method: "get",
            url: "/user/account",
        });
    },
    getUserMv(order, area, type) {
        return service({
            method: "get",
            url: `/mv/all?limit=100&order=${order}&area=${area}&type=${type}`,
        })
    },
    getMvAdress(id) {
        return service({
            method: "get",
            url: `/mv/url?id=${id}`,
        })
    },
    getMvDetail(id) {
        return service({
            method: "get",
            url: `/comment/mv?id=${id}`,
        })
    },
    getStatus() {
        return service({
            method: "get",
            url: "/login/status"
        })
    },
    backOut(){
        return service({
            method:'get',
            url:"/logout"
        })
    }
};
