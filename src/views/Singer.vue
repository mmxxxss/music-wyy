<template>
  <div class="all">
    <div class="top">
      <h1>{{ singerDetail?.artist?.name }}</h1>
      <span
        v-for="(item, index) in singerDetail?.artist?.alias || []"
        :key="index"
        class="top-item"
        >{{ item }}</span
      >
    </div>
    <div class="body">
      <img :src="singerDetail?.artist?.avatar" alt="" class="singerimg" />
    </div>
    <div class="bottom">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="热门作品">
          <div class="hotsongs">
            <el-table
              :data="singerMusic"
              style="width: 100%; border-radius: 12px"
              stripe
            >
              <el-table-column prop="number" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="name" label="音乐标题" width="200">
              </el-table-column>
              <el-table-column prop="album" label="专辑" width="200">
              </el-table-column>
              <el-table-column prop="date" label="发布时间" width="150">
              </el-table-column>
              <el-table-column
                label="播放"
                width="120"
                align="center"
                fixed="right"
              >
                <template slot-scope="scope">
                  <a-button
                    @click="handlePlay(scope.row)"
                    shape="circle"
                    icon="customer-service"
                  ></a-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="所有专辑">
          <el-row>
            <el-col
              :span="4"
              v-for="(item, index) in singerAlbums"
              :key="index"
              @click.native="loginAlbum(item.id)"
            >
              <el-card :body-style="{ padding: '0px' }">
                <img :src="item.picUrl" class="image" />
                <div class="name">
                  <span>{{ item.name }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </a-tab-pane>
        <a-tab-pane key="3" tab="相关mv">
          <div class="left">
            <div v-for="item in singerMv" :key="item.id" class="mv-item">
              <img
                :src="item.imgurl"
                alt=""
                class="mvimg"
                @click="loginMv(item.id)"
              />
              <span class="mvname">{{ item.name }}</span>
              <span class="artistname">{{ item.artistName }}</span>
              <div class="videoitem">
                <img src="../images/video.png" alt="" class="video" />
                <span class="playcount">{{
                  formattedNumber(item.playCount)
                }}</span>
              </div>
            </div>
          </div></a-tab-pane
        >
        <a-tab-pane key="4" tab="艺人介绍">
          <div class="singerDesc">
            <h2>个人简介</h2>
            <p>{{ singerDesc.briefDesc }}</p>
            <div v-for="(item, index) in singerDesc.introduction" :key="index">
              <h2>{{ item.ti }}</h2>
              <p style="white-space: pre-line">{{ item.txt }}</p>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import SingerAPI from "../api/singer";
import dayjs from "dayjs";
export default {
  data() {
    return {
      singerDetail: {},
      singerMusic: [],
      singerAlbums: [],
      singerMv: [],
      singerDesc: {},
    };
  },
  computed: {},
  async created() {
    const singerid = this.$route.params.singerid;
    const singerDetail = await SingerAPI.getArtisDetail(singerid);
    this.singerDetail = singerDetail.data;
    // console.log(this.singerDetail);
    const res1 = await SingerAPI.getArtistMusic(singerid);
    // console.log("res1", res1);
    const hotSongs = res1.hotSongs.map((item, index) => {
      return {
        number: index + 1,
        name: item.name,
        album: item.al.name,
        date: dayjs(item.publishTime).format("YYYY年MM月DD日"),
        id: item.id,
      };
    });
    this.singerMusic = hotSongs;
    const { hotAlbums } = await SingerAPI.getSingerAlbum(singerid);
    // console.log("res2", hotAlbums);
    this.singerAlbums = hotAlbums;
    // console.log("111",this.singerAlbums);
    const { mvs } = await SingerAPI.getSingerMv(singerid);
    this.singerMv = mvs;
    const singerdesc = await SingerAPI.getSingerDesc(singerid);
    this.singerDesc = singerdesc;
  },
  methods: {
    async handlePlay({ id }) {
      this.$store.commit({
        type: "refreshId",
        id,
      });
    },
    formattedNumber(e) {
      const value = e;
      if (value >= 10000) {
        return (value / 10000).toFixed(2) + "万";
      } else {
        return value;
      }
    },
    loginMv(id) {
      this.$router.push({ path: `/home/video/${id}` });
    },
    loginAlbum(albumid) {
      this.$router.push({ path: `/home/album/${albumid}` });
    },
  },
};
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.top {
  display: flex;
  height: 45px;
}
.top-item {
  margin: 18px 0px 0px 10px;
}
.singerimg {
  width: 640px;
  height: 300px;
}
.bottom {
  width: 800px;
}
.image {
  display: block;
  width: 100%;
  height: 100px;
  margin-bottom: 3px;
}
.name {
  width: 100%;
  font-size: 10px;
  padding: 0px 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 30px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.el-col {
  margin: 10px;
  width: 100px;
}
.el-card {
  border-radius: 10px;
}
.left {
  flex: 1;
  margin-top: 10px;
  margin-left: 30px;
  display: flex;
  flex-wrap: wrap;
}
.mv-item {
  width: 20%;
  display: flex;
  flex-direction: column;
}
.mvname {
  display: block;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.videoitem {
  display: flex;
}
.video {
  width: 20px;
  height: 20px;
}
.artistname {
  width: 100px;
  font-size: 12px;
  color: darkgray;
}
.playcount {
  font-size: 12px;
  color: darkgray;
}
.mvimg {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>