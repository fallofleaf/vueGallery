<template>
  <div>
    <el-container>
      <el-main>
<!--        <el-row >-->
<!--          <el-col  :key="photo.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" :span="24"-->
<!--                  v-for="photo in gallery" >-->


<!--            <el-card  shadow="always" style="margin: 8px" :body-style="{ padding: '0px' }">-->
<!--              <div>-->
<!--                <el-image-->
<!--                           :src="photo.largeImageURL" fit="cover" lazy>-->
<!--                </el-image>-->
<!--              </div>-->
<!--            </el-card>-->


<!--          </el-col>-->
<!--        </el-row>-->


        <div id="img_gallery" style="overflow: auto">
<!--          <div class="card"  style="margin: 4px;padding: 0" >-->
            <el-image class="card"
                      :key="photo.id" v-for="photo in gallery"
                      scroll-container="body"
                      :src="photo.largeImageURL"
                      style="object-fit: cover;width: 100%;height:100%;cursor: pointer" lazy>
              <template #placeholder>
                <img class="image-slot"
                     :width="photo.webformatWidth" :height="photo.webformatHeight"
                     style="object-fit: cover;width: 100%;height:100%;cursor: pointer">
              </template>
            </el-image>
<!--          </div>-->
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
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    // this.get()
    this.initCurrentPage()
  },
  setup() {
    return {
      current: 2,
    };
  },
  data() {
    return {
      currentPage: 1,
      total: 200,
      pageSize: 20,
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
    initCurrentPage(){
      axios.get(baseURL + pageF + this.currentPage + perPageF + this.pageSize + end).then((response) => {
        this.gallery = response.data.hits
        console.log(baseURL + pageF + this.currentPage + perPageF + this.pageSize + end)
      }).catch((reason) => {
        console.log(reason)
      })
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.card {
  box-shadow: 0 0 6px #2c2c2c;
  border-radius: 4px;
  /*margin: 8px;*/
  /*padding: 16px;*/
}
@media screen and (min-width: 1920px){
  #img_gallery{
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px,auto);
  }
}
@media screen and (max-width: 1920px){
  #img_gallery{
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px,auto);
  }
}

@media screen and (max-width: 1200px){
  #img_gallery{
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px,auto);
  }
}
@media screen and (max-width: 992px){
  #img_gallery{
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px,auto);
  }
}
@media screen and (max-width: 768px){
  #img_gallery{
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(1,1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px,auto);
  }
}
</style>
