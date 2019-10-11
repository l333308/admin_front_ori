// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  if (typeof title === 'function') {
    title = title()
  }
  return title // 不使用国际化
  // const hasKey = this.$te('route.' + title)
  // const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js
  //
  // if (hasKey) {
  //   return translatedTitle
  // }
  // return title
}
