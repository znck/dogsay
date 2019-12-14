<script>
import { getDogPhotos, useInfiniteLoader, usePreLoadImage, getQuote, getAFont, scrollIntoView } from './composables'

{
  
}

export default {
  setup(_, { refs }) {
    const { items, error } = useInfiniteLoader(
      getDogPhotos,
      () => refs.placeholder
    )

    usePreLoadImage(items)

    return {
      dogs: items,
      error,
      getQuote,
      getAFont,
      scrollIntoView,
    }
  },
}
</script>

<template>
  <div
    class="x-container flex flex-row h-screen py-8 overflow-x-auto overflow-y-hidden scrolling-touch select-none"
  >
    <div
      class="flex-shrink-0 h-full w-screen lg:w-3/4 flex flex-col items-center justify-center px-8 lg:px-16"
    >
      <h1 class="text-6xl text-center">
        Welcome to <strong>DogSay!</strong><br />
        <span class="text-xs lg:hidden">(swipe left)</span>
      </h1>

      <footer class="my-8 text-xs">
        <a href="https://github.com/znck/dogsay">Source on Github</a>
      </footer>
    </div>
    <div
      class="flex-shrink-0 h-full w-screen lg:w-1/2 flex flex-col items-center justify-end px-8 lg:px-16"
      v-for="(dog, index) of dogs"
      :key="dog"
      @click="scrollIntoView"
    >
      <div class="x-img-container w-full flex-grow align-bottom relative">
        <img
          :src="dog"
          class="object-contain shadow-xl rounded-lg max-w-full max-h-full absolute bottom-0"
        />
      </div>
      <h2
        class="x-alt-container text-3xl text-center my-6 flex-shrink-0"
        :style="`font-family: ${getAFont(index)}`"
      >
        {{ getQuote(index) }}
      </h2>
    </div>
    <div
      class="flex-shrink-0 h-full w-screen lg:w-1/2 flex flex-col items-center justify-end px-8 lg:px-16"
      ref="placeholder"
    >
      <div class="x-img-container bg-disabled-300"></div>
      <h2 class="x-alt-container text-3xl text-center my-6">
        {{ error || 'Loading' }}
      </h2>
    </div>
  </div>
</template>

<style>
/*! purgecss start ignore */
@tailwind base;
/*! purgecss end ignore */
@tailwind components;
@tailwind utilities;

.x-container {
  scroll-snap-type: x mandatory;
}

.x-container > * {
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

.x-img-container {
  flex-basis: 66.666%;
}

.x-img-container img {
  left: 50%;
  transform: translateX(-50%);
}

.x-alt-container {
  flex-basis: 33.333%;
}

@media screen and (min-width: 1024px) {
  .x-img-container {
    flex-basis: 75%;
  }

  .x-alt-container {
    flex-basis: 25%;
  }
}

@media screen and (min-width: 1600px) {
  .x-img-container {
    flex-basis: 80%;
  }

  .x-alt-container {
    flex-basis: 20%;
  }
}
</style>
