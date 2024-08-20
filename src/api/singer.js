import service from "../service/axios.config.js";

export default {
    getArtisDetail(singerid){
        return service({
            method:'get',
            url:`/artist/detail?id=${singerid}`
        })
    },
    getArtistMusic(singerid){
        return service({
            method:'get',
            url:`/artists?id=${singerid}`
        })
    },
    getSingerAlbum(singerid){
        return service({
            method:'get',
            url:`/artist/album?id=${singerid}`
        })
    },
    getSingerMv(singerid){
        return service({
            method:'get',
            url:`/artist/mv?id=${singerid}`
        })
    },
    getSingerDesc(singerid){
        return service({
            method:'get',
            url:`/artist/desc?id=${singerid}`
        })
    },
    getAlbumDesc(albumid){
        return service({
            method:'get',
            url:`/album?id=${albumid}`
        })
    }
};
