<template>
  <div class="tawk-slider-container">
    <div class="container">
      <div class="slider-title text-center">
        <h1>Other Categories</h1>
      </div>
      <carousel
        :perPageCustom="[[480, 2], [768, 3]]"
        :navigationEnabled="true"
        navigationPrevLabel="<span class='left-btn'><i class='fa fa-chevron-left' style='font-size: 2rem;background-color: #eee;border-radius: 100%; width: 65px; height: 65px;text-align:center;line-height: 2;'></i></span>"
        navigationNextLabel="<span class='right-btn'><i class='fa fa-chevron-right' style='font-size: 2rem;background-color: #eee;border-radius: 100%; width: 65px; height: 65px;text-align:center;line-height: 2;'></i></span>"
        :paginationEnabled="false"
      >
        <slide
          v-for="category in sortByOrder(categories)"
          :key="category.order"
          v-show="category.enabled"
        >
          <router-link :to="{ name: 'category', params:{ id: category.id }}">
            <div class="categories-cover text-center">
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
            </div>
          </router-link>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Corousel, Slide } from "vue-carousel";
export default {
  name: "slider",
  components: { Corousel, Slide },
  data() {
    return {
      categories: []
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      axios
        .get("/api/categories")
        .then(response => {
          this.categories = response.data;
        })
        .catch(console.error());
    },
    sortByOrder(arr) {
      return arr.slice().sort(function(a, b) {
        return a.order - b.order;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
.tawk-slider-container {
  border-top: 1.5px solid #eeeeee;
  padding: 50px 0;
  background: #fafafa;
  .slider-title {
    padding: 0 0 30px;
    h1 {
      font-family: $font-family;
      font-weight: 600;
      color: $text-gray;
      font-size: 2rem;
    }
  }
  a {
    &:hover {
      text-decoration: none;
    }
    .categories-cover {
      margin: 0 15px;
      margin-bottom: 20px;
      padding: 25px 30px;
      background-color: #ffffff;
      border-radius: 4px;
      border: 1px solid #eeeeee;

      .icon-container {
        i {
          font-size: 2.3rem;
          color: $green;
          margin-top: 10px;
        }
        h2 {
          color: $text-black;
          font-size: 1.2rem;
          font-family: $font-family;
          font-weight: 600;
          letter-spacing: -1px;
          margin: 15px 0;
        }
      }
      .bottom-label {
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
    }
  }
}
</style>