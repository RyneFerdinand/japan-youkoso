<template>
  <div class="font-main bg-[#f9f9f9]">
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'

export default {
  components: { HeaderComponent, FooterComponent }
}
</script>
