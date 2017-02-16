<template>
  <div>
    <p class="control">
      <div class="panel">
        <div class="panel-heading" v-if="title" v-html="title">
        </div>
        <div class="panel-block">
          <input
            type="text"
            class="input"
            v-model="queryString"
            @input="update"
            @keydown.up="up"
            @keydown.down="down"
            @keydown.enter= "hit"
            @keydown.esc="reset"
            :placeholder="placeholder"
            >
        </div>
        <a
          v-for="(result, index) in results"
          v-if="index <= 5"
          class="panel-block"
          v-bind:class="{'is-active' : isActive(index)}"
          @mousemove="currentIndex = index"
          @mousedown.prevent="hit"
          ><partial :result="result" :templatePartial="templatePartial"></partial></a>
      </div>
    </p>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: {
      title: {
        type: String,
        default: false,
      },
      apiUri: {
        type: String,
        required: true
      },
      templatePartial: {
        type: String,
        required: true
      },
      successCallback: {},
      inputText: {
        type: String
      },
      placeholder: {
        type: String,
        default: ''
      },
      inputClass: {
        type: String
      },
    },

    components: {
      /**
       * Component for the template to be shown on the list
       */
      partial: {
        template: '<div>{{ templatePartial }}</div>',

        props: {
          templatePartial: {
            type: String
          },
          result: {
            type: Object
          }
        },

        created() {
          this.$options.template = this.templatePartial

        }
      }
    },

    watch: {
      /**
       * Updates the search text
       */
      inputText (val) {
        this.queryString = val
      }
    },

    /**
     * Component's data
     */
    data () {
      return {
        results: {},
        currentIndex: 0,
        openDropdown: false,
        queryString: '',
        loading: false,
      }
    },

    methods: {
      /**
       * API Call to populate results
       */
      update: _.debounce(function () {
          axios.defaults.headers.common = {};
          axios.get(this.apiUri + this.queryString)
            .then((response) => {
              this.results = response.data
              this.openDropdown = true
            })
        }, 500)
      ,

      /**
       * Key up method
       */
      up () {
        if (this.currentIndex > 0) {
          this.currentIndex -= 1
        }
      },

      /**
       * Key down method
       */
      down () {
        if (this.currentIndex < this.results.length) {
          this.currentIndex += 1
        }
      },

      /**
       * Class check if the result is active
       */
      isActive (index) {
        return this.currentIndex === index
      },

      /**
       * Select a result
       */
      hit () {
        this.openDropdown = false
        this.successCallback(this.results[this.currentIndex])
      }
    }
  }
</script>
