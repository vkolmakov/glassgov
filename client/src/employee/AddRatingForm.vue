<template>

  <div v-if="!isSubmitting" class="add-rating">
    <div class="top">
      <textarea name="rating-text"
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

  <div v-else class="add-rating">
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
      value: 0,
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
      this.value = rating
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
        value: this.value,
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
.add-rating {
  padding: 1em;
  margin-bottom: 1em;

  min-height: 9em;

  background-color: var(--tertiary-color)
}

.add-rating > .top {
  display: flex;
  padding-bottom: 1em;
}

.add-rating > .top > textarea {
  flex: 1;
  resize: none;
  font-size: 1rem;
  height: 5em;

  border: .2em solid var(--tertiary-color);
  border-radius: 0.4em;
}

.add-rating > .bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.add-rating > .bottom > * {
  margin-left: 1em;
}

.add-rating > .bottom > button {
  background-color: var(--primary-color);
  color: var(--secondary-color);

  cursor: pointer;

  padding: 0 0.8em;
  border: .1em solid var(--tertiary-color);
  border-radius: 0.4em;
  height: 2.2em;
  font-size: 0.9rem;
}

.add-rating > .bottom > button:hover {
  border: .1em solid var(--secondary-color);
}
</style>
