<template>
  <div>
    <!-- header -->
    <tawk-header></tawk-header>
    <!-- header -->
    <div class="tawk-categories-container">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-4"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMomentAgo from "vue-moments-ago";
import Header from "../components/Header.vue";
export default {
  name: "home",
  components: { "tawk-header": Header, "vue-moments-ago": VueMomentAgo },
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

<style lang="scss">
@import "../scss/variables.scss";

.tawk-categories-container {
  padding: 150px 0;
  background: #fafafa;

  a {
    &:hover {
      text-decoration: none;
    }
    .categories-cover {
      margin-bottom: 20px;
      padding: 25px 30px;
      background-color: #ffffff;
      border-radius: 4px;
      border: 1px solid #eeeeee;
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
</style>