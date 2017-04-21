<template>

  <div class="visualizations">
    <div class="visualization">
      <h1>Top {{ count }} employees by salary</h1>
      <chartjs-bar :labels="topBySalary.labels"
                   :datalabel="topBySalary.datalabel"
                   :options="chartOptions"
                   :data="topBySalary.data"></chartjs-bar>
    </div>

    <div class="visualization">
      <h1>Top {{ count }} employees by rating</h1>
      <chartjs-bar :labels="topByRating.labels"
                   :datalabel="topByRating.datalabel"
                   :data="topByRating.data"></chartjs-bar>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
import 'chart.js'
import 'hchs-vue-charts'

import { prop, compose } from '../utils'

Vue.use(window.VueCharts)

export default {
  data() {
    return {
      count: 5,
    }
  },

  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      }
    },

    topBySalary() {
      const employees = this.$store.getters.getTopEmployeesBySalary(this.count)

      return {
        datalabel: 'By Salary',
        labels: employees.map(prop('name')),
        data: employees.map(prop('salary')),
      }
    },
    topByRating() {
      const employees = this.$store.getters.getTopEmployeesByRating(this.count)

      return {
        datalabel: 'By Rating',
        labels: employees.map(prop('name')),
        data: employees.map(prop('rating')),
      }
    }
  },
}
</script>
