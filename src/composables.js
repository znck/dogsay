import {
  reactive,
  ref,
  onMounted,
  onUnmounted,
  toRefs,
  watch,
} from '@vue/composition-api'
import quotes from './quotes'

export async function getDogPhotos() {
  const response = await fetch(
    `https://dog.ceo/api/breeds/image/random/3?q=${Date.now()}`
  )

  if (response.ok) {
    const { message: images } = await response.json()

    return images
  }

  throw new Error(response.statusText)
}

export function useInfiniteLoader(fn, getDOMRef) {
  const state = reactive({
    items: [],
  })
  const errorRef = ref(null)
  let activePromise = fn()

  activePromise
    .then(images => {
      state.items.push(...images)
      activePromise = null
    })
    .catch(error => (errorRef.value = error.message))

  const observer = new IntersectionObserver(
    async entries => {
      const [placeholder] = entries
      console.log('Its here!')
      if (placeholder.isIntersecting) {
        if (activePromise) return // already fetching.

        activePromise = fn()

        try {
          const images = await activePromise
          errorRef.value = null
          console.log(images)
          state.items.push(...images)
        } catch (error) {
          errorRef.value = error.message
        }

        activePromise = null
      }
    },
    {
      threshold: 0,
    }
  )

  onMounted(() => {
    observer.observe(getDOMRef())
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  return {
    ...toRefs(state),
    error: errorRef,
  }
}

export function usePreLoadImage(images) {
  watch(
    () => images,
    (newDogs, oldDogs) => {
      const packOfDogs = new Set(newDogs)

      if (Array.isArray(oldDogs)) {
        oldDogs.forEach(dog => packOfDogs.delete(dog))
      }

      Array.from(packOfDogs).forEach(dog => {
        const img = new Image()

        img.src = dog
      })
    }
  )
}

export function getQuote(id) {
  return quotes[id % quotes.length]
}

export function getAFont(id) {
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
}

export function scrollIntoView({ target }) {
  target.scrollIntoView({ behavior: 'smooth', inline: 'center' })
}
