<template>
  <bar-chart
    :chart-options="chartOptions"
    :chart-data="chartData"
    dataset-id-key="label"
    :height="200"
    :width="300"
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
  data() {
    return {}
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Остаток в тоннах',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#fff',
            radius: 1,
            fill: true,
            pointBorderColor: 'white',
            backgroundColor: ['#01FFDB', '#FFD600', '#f87979', '#FBF7E5'],
            tension: 0.25,
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
        datasets: {
          bar: {
            borderRadius: 10,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: !this.isMobile,
            formatter(value, context) {
              return value + ' т'
              // return context.chart.data.labels[context.dataIndex];
            },
          },
        },
      }
    },
  },
  methods: {},
}
</script>
