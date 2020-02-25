<template>
  <div>
    <!-- header -->
    <tawk-header></tawk-header>
    <!-- header -->
    <div class="tawk-category-container">
      <div class="container">
        <div class="row">
          <nav aria-label="tawk-breadcrumb">
            <ol class="twak-breadcrumb">
              <li class="twak-breadcrumb-item">
                <router-link :to="{path:'/'}">All categories</router-link>
              </li>
              <li class="twak-breadcrumb-item active" aria-current="page">
                <i class="fa fa-chevron-right"></i>
                {{ category.title }}
              </li>
            </ol>
          </nav>
          <!-- col-lg-12 -->
        </div>
        <!-- row -->
        <div class="row">
          <div class="col-xl-4">
            <div class="categories-cover text-center">
              <span class="floating-icon">
                <i class="fa fa-file-alt"></i>
                {{ category.totalArticle }}
              </span>
              <div class="icon-container">
                <i :class="'fa fa-'+category.icon"></i>
                <h2>{{ category.title }}</h2>
              </div>
              <div class="bottom-label">
                <h3
                  class="title"
                >{{ category.totalArticle != 0 ? category.totalArticle +' Articles' : category.totalArticle +' Article' }}</h3>
                <p class="date">
                  <vue-moments-ago prefix="Last updated" suffix="ago" date="category.updatedOn"></vue-moments-ago>
                </p>
              </div>
              <div class="category-description">
                <i class="fa fa-info-circle"></i>
                <p class="description">{{ category.description }}</p>
              </div>
            </div>
          </div>
          <!-- col-xl-4 -->
          <div class="col-xl-8">
            <ul class="articles-list">
              <li
                class="article-item"
                v-for="(article,index) in articles"
                :key="index"
                v-show="article.status != 'archived'"
              >
                <a href class="article-link">
                  <div class="icon-cover">
                    <i :class="'fa fa-'+article.icon"></i>
                  </div>
                  <div class="text-cover">
                    <i class="fa fa-chevron-right"></i>
                    <h3>{{ article.title }}</h3>
                    <p class="article-date">
                      <vue-moments-ago prefix="Last updated" suffix="ago" date="article.updatedOn"></vue-moments-ago>
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <!-- col-xl-8 -->
        </div>
        <!-- row -->
      </div>
    </div>
    <!-- slider -->
    <tawk-slider></tawk-slider>
    <!-- slider -->
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Slider from "../components/Slider.vue";
import VueMomentAgo from "vue-moments-ago";

export default {
  name: "category",
  components: {
    "tawk-header": Header,
    "vue-moments-ago": VueMomentAgo,
    "tawk-slider": Slider
  },
  data() {
    return {
      catId: this.$route.params.id,
      category: [],
      articles: []
    };
  },
  created() {
    this.preparedComponents();
  },
  methods: {
    getArticles() {
      axios
        .get("/api/category/id=" + this.catId)
        .then(response => {
          this.articles = response.data;
        })
        .catch(console.error());
    },
    getCategory() {
      axios
        .get("/api/categories")
        .then(response => {
          response.data.map(item => {
            if (item.id == this.catId) {
              this.category = item;
            }
          });
        })
        .catch(console.error());
    },
    preparedComponents() {
      this.getCategory();
      this.getArticles();
    }
  }
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.tawk-category-container {
  padding: 20px 0 100px;
  background: #fafafa;

  .twak-breadcrumb {
    padding: 10px 15px;
    .twak-breadcrumb-item {
      display: inline-block;
      font-size: 14px;
      font-family: $font-family;
      font-weight: 600;
      i {
        font-size: 12px;
        padding-right: 5px;
      }
      a {
        color: $green;
        &:hover {
          text-decoration: none;
        }
      }
    }
    .active {
      color: $text-gray;
      padding-left: 5px;
    }
  }

  .categories-cover {
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    font-family: $font-family;
    color: $text-gray;
    .floating-icon {
      right: 10%;
      top: 2%;
      position: absolute;
      font-size: 1rem;
      font-weight: 600;
      color: $text-gray;
      i {
        color: $green;
        font-size: 1rem;
      }
    }
    .icon-container {
      padding: 20px 30px 0;
      i {
        font-size: 2.3rem;
        color: $green;
        margin-top: 10px;
      }
      h2 {
        color: $text-black;
        font-size: 1.2rem;
        font-weight: 600;
        letter-spacing: -1px;
        margin: 15px 0;
      }
    }
    .bottom-label {
      padding: 0px 30px 20px;
      line-height: 1;
      .title {
        color: $green;
        font-size: 1rem;
        margin: 0;
      }
      .date {
        color: $text-gray;
        .vue-moments-ago {
          font-size: 0.9rem;
        }
      }
    }

    .category-description {
      border-top: 1px solid #eeeeee;
      padding: 20px 30px;
      i {
        color: $green;
        font-size: 1.3rem;
        margin-bottom: 15px;
      }
    }
  }

  .articles-list {
    margin: 0;
    padding: 0;

    .article-item {
      background-color: #ffffff;
      font-family: $font-family;
      list-style-type: none;
      position: relative;
      margin-bottom: 1.1rem;
      padding: 25px 35px;
      border: 1.5px solid #eeeeee;
      border-radius: 4px;

      .article-link {
        color: $text-gray;
        display: flex;

        .icon-cover {
          width: 15%;
          text-align: center;
          padding-top: 10px;
          i {
            font-size: 2.3rem;
            color: $green;
          }
        }
        .text-cover {
          font-family: $font-family;
          width: 85%;
          position: relative;
          h3 {
            margin: 0;
            font-size: 1.4rem;
            color: $text-black;
          }
          .article-date {
            margin: 0;
          }
          i {
            position: absolute;
            right: 0;
            top: 25%;
            font-size: 1.5rem;
            color: $green;
          }
        }
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>