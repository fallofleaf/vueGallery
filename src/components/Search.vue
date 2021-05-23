<template>
  <div>
    <el-container>
      <el-main>
        <div style="text-align: -webkit-center;height: 150px">
          <div style="display: flex;width: 80%">
            <el-input v-model="keyWords" @change="searchByKey"  placeholder="关键字"></el-input>
            <el-button type="primary" @click="searchByKey" style="margin-left: 8px">搜索</el-button>
          </div>
          <div style="display: flex;width: 80%;margin-top: 16px">
            <el-dropdown size="medium">
<!--              <span class="el-dropdown-link">类别<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>-->
              <el-button type="primary">
                类别<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item  :key="title" v-for="title in categoryList" @click="categoryChoose(title)" :disabled="title === categoryKey">{{title}}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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

let baseURL = "https://pixabay.com/api/?key=21039693-40d98fce614790ce1b9fefb04"
let perPageF = "&per_page="
// Accepted values: cs, da, de, en, es, fr, id, it, hu, nl, no, pl, pt, ro, sk, fi, sv, tr, vi, th, bg, ru, el, ja, ko, zh
// Default: "en"
let keyWordF = "&q="
let categoryF = "&category="
// Accepted values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music
// let languageF = "&lang="
let pageF = "&page="
let end = "&pretty=true"

export default {
  name: 'Search',
  props: {
    msg: String
  },
  mounted() {
    if (this.$route.params.keyWord !=null) {
      this.keyWords = this.$route.params.keyWord
    }else {
      this.keyWords = 'flowers'
    }
    this.searchByKey()
  },
  setup() {
    return {
    };
  },
  data() {
    return {
      categoryKey:'all',
      categoryList:['all','backgrounds', 'fashion', 'nature',
        'science', 'education', 'feelings', 'health', 'people', 'religion',
        'places', 'animals', 'industry', 'computer', 'food', 'sports',
        'transportation', 'travel', 'buildings', 'business', 'music'],
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
    searchByKey(){
      let tempURL = baseURL + keyWordF+ this.keyWords+ pageF + this.currentPage + perPageF + this.pageSize + end
      if (this.categoryKey !== "all") {
        tempURL = baseURL + keyWordF+ this.keyWords+categoryF+this.categoryKey+ pageF + this.currentPage + perPageF + this.pageSize + end
      }
      axios.get(tempURL).then((response) => {
        this.gallery = response.data.hits
        console.log(tempURL)
      }).catch((reason) => {
        console.log(reason)
      })
    },

    currentChange() {
      console.log(this.currentPage)
      let tempURL = baseURL + keyWordF+ this.keyWords+ pageF + this.currentPage + perPageF + this.pageSize + end
      if (this.categoryKey !== "all") {
       tempURL = baseURL + keyWordF+ this.keyWords+categoryF+this.categoryKey+ pageF + this.currentPage + perPageF + this.pageSize + end
      }
      axios.get(tempURL).then((response) => {
        this.gallery = response.data.hits
        console.log(tempURL)
      }).catch((reason) => {
        console.log(reason)
      })


    },
    categoryChoose(title){
      this.categoryKey = title
      console.log(title)
    }


  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
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
