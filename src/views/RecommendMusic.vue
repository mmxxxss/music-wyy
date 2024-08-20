<template>
  <div class="musiclist">
    <span class="recmusic">每日推荐好歌</span>
    <el-table :data="musicList" style="width: 100%; border-radius: 12px" stripe>
      <el-table-column prop="name" label="音乐标题" width="210">
      </el-table-column>
      <el-table-column prop="singer" label="歌手" width="180">
      </el-table-column>
      <el-table-column prop="album" label="专辑" width="300"> </el-table-column>
      <el-table-column prop="date" label="发布时间" width="200">
      </el-table-column>
      <el-table-column label="播放" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <a-button @click="handlePlay(scope.row)" shape="circle" icon="customer-service"></a-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from "dayjs";
import discoveryAPI from "../api/discovery";
export default {
  data() {
    return {
      musicList: [],
    };
  },
  async created() {
    this.$store.commit("changeSelectedKey", "3");
    const res = await discoveryAPI.getRecommendMusic();
    const musicList = res.data.dailySongs.map((item) => {
      return {
        name: item.name,
        singer: item.ar[0].name,
        album: item.al.name,
        date: dayjs(item.publishTime).format("YYYY年MM月DD日"),
        id: item.id,
      };
    });
    this.musicList = musicList;
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
.musiclist {
  width: 100%;
  padding: 20px 5%;
}

.recmusic {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #4a4a4a;
  padding: 10px 0px;
}
</style>