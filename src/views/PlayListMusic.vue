<template>
  <div class="all">
    <div class="top">
      <img :src="MusicDetail.coverImgUrl" class="musicimg" />
      <div class="right">
        <h2>{{ MusicDetail.name }}</h2>
        <h4>歌单简介</h4>
        <p>{{ MusicDetail.description }}</p>
      </div>
    </div>
    <div class="box">
      <div class="bottom">
        <div class="bottom-top">
          <h3>歌曲列表</h3>
          <span class="musiccount">{{ MusicList.length }}首歌</span>
        </div>
        <el-table :data="MusicList" style="width: 100%; border-radius: 12px" stripe>
          <el-table-column prop="name" label="音乐标题" width="200">
          </el-table-column>
          <el-table-column prop="singer" label="歌手" width="180">
          </el-table-column>
          <el-table-column prop="album" label="专辑" width="200">
          </el-table-column>
          <el-table-column prop="date" label="发布时间" width="200">
          </el-table-column>
          <el-table-column label="播放" width="120" align="center" fixed="right">
            <template slot-scope="scope">
              <a-button @click="handlePlay(scope.row)" shape="circle" icon="customer-service"></a-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../api/login";
import discoveryApi from "../api/discovery.js";
import dayjs from "dayjs";
export default {
  data() {
    return {
      MusicList: [],
      MusicDetail: "",
      res1: "",
    };
  },
  async created() {
    const musicid = this.$route.params.musicid;
    const res = await API.getStatus();
    if (res.data.profile === null) {
      const data1 = await discoveryApi.getMusicList(musicid, 20);
      this.res1 = data1;
    } else {
      const data2 = await discoveryApi.getMusicList(musicid);
      this.res1 = data2;
    }
    // const res1 = await discoveryApi.getMusicList(musicid);
    const MusicList = this.res1.songs.map((item) => {
      return {
        name: item.name,
        singer: item.ar[0].name,
        album: item.al.name,
        date: dayjs(item.publishTime).format("YYYY年MM月DD日"),
        id: item.id,
      };
    });
    this.MusicList = MusicList;
    const res2 = await discoveryApi.getMusicDetail(musicid);
    this.MusicDetail = res2.playlist;
  },
  methods: {
    async handlePlay({ id }) {
      this.$store.commit({
        type: "refreshId",
        id,
      });
    },
  },
};
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
}

.top {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.musicimg {
  border-radius: 10px;
  width: 200px;
  height: 200px;
}

.right {
  background-color: white;
  margin-left: 30px;
  width: 400px;
  height: 200px;
  border: 1px solid #efefef;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px #efefef;
}

h2 {
  margin: 10px;
}

h4 {
  margin: 10px;
}

p {
  font-size: 12px;
  margin: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box {
  display: flex;
  justify-content: center;
}

.bottom {
  width: 1000px;
  padding: 0 20px;
  margin-top: 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 27px #0000000d;
}

.bottom-top {
  display: flex;
  padding: 30px 0 10px;
}

.musiccount {
  margin-left: 10px;
  font-size: 13px;
  margin-top: 5px;
}
</style>