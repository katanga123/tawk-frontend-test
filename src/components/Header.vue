<template>
  <div class="container">
    <div class="row justify-content-center">
      <div id="header-wrapper">
        <div id="header-text">
          <h1>Knowledge base doesn't have to be boring</h1>
          <h3>Everything you need to manage your messaging</h3>
        </div>

        <div class="search-category-container">
          <div class="input-group mb-3 mt-3">
            <input type="text" class="form-control form-control-lg" placeholder="Search for answer" />
            <div class="input-group-append">
              <button class="btn btn-success btn-lg" type="button">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.search-category-container {
  .input-group {
    height: 60px;

    .form-control {
      height: 60px;

      &::placeholder {
        color: #9c9aa6 !important;
        font-weight: 500;
        font-size: 1rem;
        font-family: $font-family;
      }

      &:focus {
        border-color: $green;
        box-shadow: 0 0 0 0.2rem rgba(3, 168, 78, 0.25);
      }
    }
    .input-group-append {
      .btn {
        background: $green;
        border-color: $green;
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
}

#header-wrapper {
  padding: 30px 0;

  #header-text {
    text-align: center;
    font-family: $font-family;
    color: $text-black;
    padding: 20px;

    h1 {
      font-style: normal;
      font-weight: bold;
      font-size: 34px;
      line-height: 41px;
    }

    h3 {
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 24px;
    }
  }
}
</style>