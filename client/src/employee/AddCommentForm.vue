<template>

  <div v-if="!isSubmitting" class="add-comment">
    <div class="top">
      <textarea name="comment-text"
                v-model="comment"
                :placeholder="`Comment on ${employee.name} here...`"></textarea>
    </div>

    <div class="bottom">
      <star-rating :writable="true"
                   :hideText="true"
                   :onSelect="onSelectRating"></star-rating>
      <button @click="onSubmitRating">Rate</button>
    </div>
  </div>

  <div v-else class="add-comment">
    <loading></loading>
  </div>

</template>

<script>
import { submitRating } from '../api'
import Loading from '../components/Loading.vue'
import StarRating from '../components/StarRating.vue'

export default {
  props: {
    employee: { type: Object },
    afterSubmitted: { type: Function },
  },

  data() {
    return {
      rating: 0,
      comment: '',
      isSubmitting: false,
    }
  },

  components: {
    StarRating,
    Loading,
  },

  methods: {
    onSelectRating(rating) {
      this.rating = rating
    },

    displaySpinner() {
      this.isSubmitting = true
    },

    hideSpinner() {
      this.isSubmitting = false
    },

    onSubmitRating() {
      this.displaySpinner()

      const submission = {
        rating: this.rating,
        comment: this.comment,
        user: this.user,
        employee: this.employee,
      }

      const onSuccess = () => {
        this.hideSpinner()
        this.afterSubmitted()
      }

      submitRating(submission).then(
        onSuccess,
        err => console.error('error')
      )
    },
  },
}
</script>

<style>
.add-comment {
  padding: 1em;
  margin-bottom: 1em;

  min-height: 9em;

  background-color: var(--tertiary-color)
}

.add-comment > .top {
  display: flex;
  padding-bottom: 1em;
}

.add-comment > .top > textarea {
  flex: 1;
  resize: none;
  font-size: 1rem;
  height: 5em;

  border: .2em solid var(--tertiary-color);
  border-radius: 0.4em;
}

.add-comment > .bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.add-comment > .bottom > * {
  margin-left: 1em;
}

.add-comment > .bottom > button {
  background-color: var(--primary-color);
  color: var(--secondary-color);

  cursor: pointer;

  padding: 0 0.8em;
  border: .1em solid var(--tertiary-color);
  border-radius: 0.4em;
  height: 2.2em;
  font-size: 0.9rem;
}

.add-comment > .bottom > button:hover {
  border: .1em solid var(--secondary-color);
}
</style>
