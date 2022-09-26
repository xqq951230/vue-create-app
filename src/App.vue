<template>
  <div id="root" class="h100-e">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import './static/css/common.css'
import './static/css/elementReset.scss'
import './static/css/scroll.css'

export default {
  name: 'App'
}
</script>

