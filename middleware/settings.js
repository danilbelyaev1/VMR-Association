export default async function ({ store }) {
  await store.dispatch('setting/fetchSetting')
}
