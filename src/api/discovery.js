import service from "../service/axios.config.js";

export default {
  getNewestAlbum() {
    return service({
      method: "get",
      url: "/banner",
    });
  },

  getRecommend(limit) {
    return service({
      method: "get",
      url: "/personalized",
      params: {
        limit,
      },
    });
  },

  getHotSingers(limit) {
    return service({
      method: "get",
      url: "/top/artists",
      params: {
        limit,
      },
    });
  },

  getMusicList(musicid,limit){
    return service({
      method:"get",
      url:`/playlist/track/all?id=${musicid}&limit=${limit}`
    })
  },
  getMusicDetail(musicid){
    return service({
      method:"get",
      url:`/playlist/detail?id=${musicid}`
    })
  },
  getSingerDetail(singerid){
    return service({
      method:"get",
      url:`/artist/detail?id=${singerid}`
    })
  },
  getRecommendPlayList(){
    return service({
      method:"get",
      url:`/playlist/catlist`
    })
  },
  getRecommendMusic(){
    return service({
      method:'get',
      url:`/recommend/songs`
    })
  }
};
