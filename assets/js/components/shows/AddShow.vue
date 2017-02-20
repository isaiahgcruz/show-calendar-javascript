<template>
  <div>
    <transition name="fade">
      <div class="modal" :class="{ 'is-active': isModalToggled }" v-if="result && isModalToggled">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add Show</p>
            <button class="delete" @click="toggleModal"></button>
          </header>
          <section class="modal-card-body">
            Are you sure you want to add this show?
            <div class="box">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img v-if="result.show.image" :src="result.show.image.medium">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ result.show.name }}</strong>
                      <br>
                      {{ showSummary }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>
          <footer class="modal-card-foot">
            <a class="button is-success" :class="{ 'is-loading': isLoading }" @click="addShow">Yes</a>
            <a class="button" :class="{ 'is-disabled': isLoading }" @click="toggleModal">No</a>
          </footer>
        </div>
      </div>
    </transition>

    <typeahead
      api-uri="http://api.tvmaze.com/search/shows?q="
      :template-partial="templatePartial"
      :success-callback="typeaheadSelect"
      :input-text="typeaheadText"
      placeholder="Search a show"
      title="Add Show"
    ></typeahead>
  </div>
</template>

<script>
  import Typeahead from '../Typeahead.vue';

  export default {
    components: {
      Typeahead,
    },

    data() {
      return {
        templatePartial: '<span>{{ result.show.name }} | {{ result.show.premiered }}</span>',
        result: false,
        typeaheadText: '',
        isModalToggled: false,
        isLoading: false,
      }
    },

    methods: {
      /**
       * Callback when a result is selected
       */
      typeaheadSelect(result) {
        if (result) {
          this.toggleModal();
          this.result = result
          this.typeaheadText = result.show.name
        }
      },

      /**
       * Toggle modal
       */
      toggleModal() {
        this.isModalToggled = !this.isModalToggled;
      },

      /**
       * Add Show
       */
      addShow() {
        const payLoad = {
          title: this.result.show.name,
          showId: this.result.show.id,
        }
        this.isLoading = true;
        axios.post('/api/shows/', payLoad)
          .then((response) => {
            this.isLoading = false;
            this.result = false;
            this.typeaheadText = '';
            this.toggleModal();
            this.$bus.$emit('notify', {
              message: 'Show added successfully',
              class: 'is-success',
            });
            this.$bus.$emit('refreshShows', null);
            this.$bus.$emit('refreshEpisodes', null);
          }).catch((response) => {
            this.$bus.$emit('notify', {
              error: true,
            });
          })
      }
    },

    computed: {
      showSummary() {
        if (this.result.show.summary) {
          return strip(this.result.show.summary);
        } else {
          return false;
        }
      },
    },
  }

  function strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
</script>
