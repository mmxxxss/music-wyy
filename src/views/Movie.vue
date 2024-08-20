<template>
  <div class="mv">
    <div class="left">
      <div v-for="item in UserMv" :key="item.id" class="mv-item">
        <img :src="item.cover" alt="" class="image" @click="loginMv(item.id)" />
        <span class="mvname">{{ item.name }}</span>
        <span class="artistname">{{ item.artistName }}</span>
        <div class="videoitem">
          <img src="../images/video.png" alt="" class="video" />
          <span class="playcount">{{ formattedNumber(item.playCount)}}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="tabbar">
        <div class="filter">
          <h3 class="title">排序</h3>
          <a-checkable-tag
            v-for="(item, index) in sorts"
            :key="index"
            :checked="isSelected1(item.value)"
            @change="handleChange1(item.value,item.name)"
          >
            {{ item.name }}
          </a-checkable-tag>
        </div>
        <div class="filter">
          <h3 class="title">区域</h3>
          <a-checkable-tag
            v-for="(item, index) in address"
            :key="index"
            :checked="isSelected2(item.value)"
            @change="handleChange2(item.value,item.name)"
          >
            {{ item.name }}
          </a-checkable-tag>
        </div>
        <div class="filter">
          <h3 class="title">类型</h3>
          <a-checkable-tag
            v-for="(item, index) in kinds"
            :key="index"
            :checked="isSelected3(item.value)"
            @change="handleChange3(item.value, item.name)"
          >
            {{ item.name }}
          </a-checkable-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../api/login";
export default {
  data() {
    return {
      sorts: [
        { name: "上升最快", value: "sort1Value" },
        { name: "最新", value: "sort2Value" },
        { name: "最热", value: "sort3Value" },
      ],
      address: [
        { name: "全部", value: "address1Value" },
        { name: "内地", value: "address2Value" },
        { name: "港台", value: "address3Value" },
        { name: "欧美", value: "address4Value" },
        { name: "日本", value: "address5Value" },
        { name: "韩国", value: "address6Value" },
      ],
      kinds: [
        { name: "全部", value: "kind1Value" },
        { name: "官方版", value: "kind2Value" },
        { name: "原生", value: "kind3Value" },
        { name: "现场版", value: "kind4Value" },
        { name: "网易出品", value: "kind5Value" },
      ],
      selectedTag1: "sort1Value",
      selectedTag2: "address1Value",
      selectedTag3: "kind1Value",
      UserMv: [],
      order: "上升最快",
      area: "全部",
      type: "全部",
    };
  },
  async created() {
    this.$store.commit("changeSelectedKey", "4");
    const res1 = await API.getUserMv(this.order, this.area, this.type);
    this.UserMv = res1.data;
  },
  methods: {
    isSelected1(value) {
      return value === this.selectedTag1;
    },
    async handleChange1(value, name) {
      this.selectedTag1 = value;
      this.order = name;
      const res1 = await API.getUserMv(this.order, this.area, this.type);
      this.UserMv = res1.data;
    },
    isSelected2(value) {
      return value === this.selectedTag2;
    },
    async handleChange2(value, name) {
      this.selectedTag2 = value;
      this.area = name;
      const res1 = await API.getUserMv(this.order, this.area, this.type);
      this.UserMv = res1.data;
    },
    isSelected3(value) {
      return value === this.selectedTag3;
    },
    async handleChange3(value, name) {
      this.selectedTag3 = value;
      this.type = name;
      const res1 = await API.getUserMv(this.order, this.area, this.type);
      this.UserMv = res1.data;

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
      this.$router.push({ path: `video/${id}` });
    },
  },
};
</script>

<style>
.mv {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.left {
  flex: 1;
  margin-top: 10px;
  margin-left: 30px;
  display: flex;
  flex-wrap: wrap;
}
.right {
  width: 300px;
}
.tabbar {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 20px 27px #0000000d;
  border: 1px solid #efefef;
  width: 250px;
  height: 300px;
  position: fixed;
  top: 100px;
  padding-left: 10px;
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
.image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
.filter {
  margin: 10px 0;
}
.title {
  margin-left: 8px;
}
</style>