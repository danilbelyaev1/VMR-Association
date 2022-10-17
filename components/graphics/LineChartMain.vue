<template>
  <line-chart
    :chart-options="chartOptions"
    :chart-data="chartData"
    :height="200"
    :width="300"
    dataset-id-key="label"
    chart-id="lineChart"
  />
</template>

<script>
import WindowSizeMixin from '~/components/mixins/WindowSizeMixin'

export default {
  mixins: [WindowSizeMixin],
  props: {
    labels: {
      required: true,
      type: Array,
    },
    values: {
      required: true,
      type: Array,
    },
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            borderWidth: 3,
            borderColor: '#01FFDB',
            radius: 0,
            fill: false,
            pointBorderColor: '#01FFDB',
            backgroundColor: ['#01FFDB', '#FFD600', '#f87979', '#FBF7E5'],
            tension: 0.3,
            data: this.values,
          },
        ],
      }
    },
    chartOptions() {
      return {
        scales: {
          y: {
            // not 'yAxes: [{' anymore (not an array anymore)
            ticks: {
              color: 'white', // not 'fontColor:' anymore
              // fontSize: 18,
              font: {
                size: 10, // 'size' now within object 'font {}'
              },
              // stepSize: 1,
              // beginAtZero: true
            },
          },
          x: {
            // not 'xAxes: [{' anymore (not an array anymore)
            display: !this.isMobile,
            ticks: {
              color: 'white', // not 'fontColor:' anymore
              // fontSize: 14,
              font: {
                size: 14, // 'size' now within object 'font {}'
              },
              // stepSize: 1,
              // beginAtZero: true
            },
          },
        },
        locale: 'ru',
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
        },
      }
    },
  },
  methods: {},
}
</script>
