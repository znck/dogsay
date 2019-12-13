<script>
import quotes from './quotes'

export default {
  data() {
    return {
      /* Fetch Dogs */
      error: null,
      /* Pre-load Dogs */
      dogs: [],
    }
  },
  async created() {
    /* Fetch Dogs (Initial Load) */
    this.dogs = await this.getDogPhotos()
  },
  /* Infinite Loading */
  mounted() {
    this.observer = new IntersectionObserver(
      async entries => {
        const [placeholder] = entries

        if (placeholder.isIntersecting) {
          if (this.fetchPromise) return // already fetching.

          this.fetchPromise = this.getDogPhotos()

          const dogs = await this.fetchPromise

          this.dogs.push(...dogs)

          this.fetchPromise = null
        }
      },
      {
        threshold: 0,
      }
    )

    this.observer.observe(this.$refs.placeholder)
  },
  /* Infinite Loading */
  destroyed() {
    this.observer.disconnect()
  },
  methods: {
    /* Fetch Dogs */
    async getDogPhotos() {
      const response = await fetch(
        `https://dog.ceo/api/breeds/image/random/3?q=${Date.now()}`
      )

      if (response.ok) {
        const { message: images } = await response.json()

        this.error = null

        return images
      }

      this.error = response.statusText
    },

    getQuote(id) {
      return quotes[id % quotes.length]
    },

    getAFont(id) {
      const fonts = [
        'Indie Flower',
        'Dancing Script',
        'Lilita One',
        'Pacifico',
        'Lakki Reddy',
        'Shadows Into Light',
        'Amatic SC',
        'Permanent Marker',
        'Sacramento',
        'Mansalva',
        'Special Elite',
        'Parisienne',
        'Reenie Beanie',
        'Rock Salt',
      ]

      return `${fonts[id % fonts.length]}, cursive`
    },

    scrollIntoView({ target }) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    },
  },
  watch: {
    /* Pre-load Dogs */
    dogs(newDogs, oldDogs) {
      const packOfDogs = new Set(newDogs)

      if (Array.isArray(oldDogs)) {
        oldDogs.forEach(dog => packOfDogs.delete(dog))
      }

      Array.from(packOfDogs).forEach(dog => {
        const img = new Image()

        img.src = dog
      })
    },
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
        Welcome to <strong>DogSay!</strong>
      </h1>
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
