<template>
  <div>
    <el-container>
      <el-main>
        <div style="text-align: -webkit-center;height: 300px">
          <span>基于Pixabay的图片搜索网站</span>
          <div style="display: flex;width: 80%">
            <el-input v-model="keyWords"   placeholder="关键字"></el-input>
            <el-button type="primary" @click="toSearchPage" style="margin-left: 8px">搜索</el-button>
          </div>



        </div>


        <div id="img_gallery">
          <div class="card parent_container" :key="photo.id" v-for="photo in gallery">
            <img class="card " alt="image"
                 :src="photo.largeImageURL"
                 :width="photo.webformatWidth" :height="photo.webformatHeight"
                 :style="{objectFit: 'cover',width: '100%',height:'100%',cursor: 'pointer'}">

            <div class="banner" >
              <div :style="{display:'flex',overflow:'hidden',height: '100%',justifyContent:'space-around',alignItems:'center'}">
                <div style="overflow: hidden;width: 200px">
                   <span :style="{color: 'white'}" :key="n" v-for="(word,n) in photo.tags.split(',')">
                     {{ word }}
                   </span>
                </div>
                <div style="margin-left: 8px">
                  <i class="el-icon-star-off " :style="{color: 'white'}"></i><span style="color: white;margin-left: 4px">{{photo.favorites}}</span>
                </div>
              </div>
              </div>
          </div>
        </div>
      </el-main>

      <el-footer>
        <el-pagination
            :hide-on-single-page="true"
            background
            v-model:current-page="currentPage"
            @current-change="currentChange"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
        <div>
          © 2021 Designed by Zhang Xingkun
        </div>
      </el-footer>
    </el-container>

  </div>

</template>

<script>
import axios from "axios";

// let requestURL = "https://pixabay.com/api/?key=21039693-40d98fce614790ce1b9fefb04&q=" + encodeURI('flower') + "&per_page=" + '25' + "&pretty=true"
let requesURL = "https://pixabay.com/api/?key=21039693-40d98fce614790ce1b9fefb04&per_page=" + '25' + "&pretty=true"
let baseURL = "https://pixabay.com/api/?key=21039693-40d98fce614790ce1b9fefb04"
let perPageF = "&per_page="
// Accepted values: cs, da, de, en, es, fr, id, it, hu, nl, no, pl, pt, ro, sk, fi, sv, tr, vi, th, bg, ru, el, ja, ko, zh
// Default: "en"
let keyWordF = "&q="

let languageF = "&lang="
let pageF = "&page="
let end = "&pretty=true"

export default {
  name: 'Index',
  props: {
    msg: String
  },
  mounted() {
    // this.get()
    this.initCurrentPage()
  },
  setup() {
    return {
    };
  },
  data() {
    return {
      keyWords:'',
      currentPage: 1,
      total: 480,
      pageSize: 24,
      gallery: [{
        "id": 6253669,
        "pageURL": "https://pixabay.com/photos/mountain-alps-hills-valley-6253669/",
        "type": "photo",
        "tags": "mountain, alps, hills",
        "previewURL": "https://cdn.pixabay.com/photo/2021/05/14/15/17/mountain-6253669_150.jpg",
        "previewWidth": 150,
        "previewHeight": 100,
        "webformatURL": "https://pixabay.com/get/g1e78ca8f06c6565c41ee618248f853ed53ec817ef0fe3b6f8bfb37e8f7b77b754af400b6251c9eb8910d96da258b6b685713056a26f2ed5963a86b3784fa343a_640.jpg",
        "webformatWidth": 640,
        "webformatHeight": 427,
        "largeImageURL": "https://pixabay.com/get/g7895c1913b907480007d7949de89d3d1dd754b77da3cd4bb3084d08ebcf4766a58c215ea0decd8e64a5fea2558ebf4fa754d0af08da6bee932cfc4b0ffd71950_1280.jpg",
        "imageWidth": 6000,
        "imageHeight": 4000,
        "imageSize": 9594314,
        "views": 35764,
        "downloads": 32313,
        "favorites": 0,
        "likes": 125,
        "comments": 114,
        "user_id": 3764790,
        "user": "enriquelopezgarre",
        "userImageURL": "https://cdn.pixabay.com/user/2021/03/08/19-47-06-54_250x250.jpg"
      }],

    }
  },
  methods: {
    get() {
      axios.get(baseURL + keyWordF + "flower+yellow" + languageF + "en" + pageF + 2 + perPageF + 25 + end).then((response) => {
        console.log(response.data)
      })
    },
    all() {
      axios.get(requesURL).then((response) => {
        console.log(response.data)
      })
    },
    currentChange() {
      console.log(this.currentPage)

      axios.get(baseURL + pageF + this.currentPage + perPageF + this.pageSize + end).then((response) => {
        this.gallery = response.data.hits
        console.log(baseURL + pageF + this.currentPage + perPageF + this.pageSize + end)
      }).catch((reason) => {
        console.log(reason)
      })
    },
    initCurrentPage() {
      axios.get(baseURL + pageF + this.currentPage + perPageF + this.pageSize + end).then((response) => {
        this.gallery = response.data.hits
        console.log(baseURL + pageF + this.currentPage + perPageF + this.pageSize + end)
      }).catch((reason) => {
        console.log(reason)
      })
    },
    toSearchPage(){
      this.$router.push({path:'/search',params:{
        keyword:this.keywords
        }})
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s linear;
  bottom: 0;
  left: 0;
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 64px;
  background: linear-gradient(0deg, rgba(0, 0, 0, .6) 0, transparent)
}

.parent_container {
  position: relative;
  padding: 0;
  margin: 4px;
}

.banner_item {
  position: absolute;

}

.parent_container:hover .banner {
  visibility: visible;
  opacity: 1;
}

.banner:hover {
  visibility: visible;
  opacity: 1;
}


.el-header, .el-footer {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}


.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  box-shadow: 0 0 4px #2c2c2c;
  border-radius: 4px;
  /*margin: 8px;*/
  /*padding: 16px;*/
}

@media screen and (min-width: 1920px) {
  #img_gallery {
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px, auto);
  }
}

@media screen and (max-width: 1920px) {
  #img_gallery {
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px, auto);
  }
}

@media screen and (max-width: 1200px) {
  #img_gallery {
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px, auto);
  }
}

@media screen and (max-width: 992px) {
  #img_gallery {
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px, auto);
  }
}

@media screen and (max-width: 768px) {
  #img_gallery {
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px, auto);
  }
}
</style>
