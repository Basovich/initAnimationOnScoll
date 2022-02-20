export const initAnimationOnScroll = () => {
  // Example usages:
  scrollTrigger('[data-animation-on-scroll]', {}, 'start-animation')

  scrollTrigger('[data-animation-on-scroll]', {
    rootMargin: '-200px',
  })

  scrollTrigger('[data-animation-on-scroll]', {
    rootMargin: '-200px',
    callback: function (el) {
      console.log(el);
      console.log('It is callback function');
    }
  })
}


function scrollTrigger(selector, options = {}, activeClass = 'start-animation-on-scroll') {
  const els = document.querySelectorAll(selector);
  [...els].forEach(el => {
    addObserver(el, options, activeClass)
  })
}

function addObserver(el, options, activeClass) {
  if (!('IntersectionObserver' in window)) {
    if (options.callback) {
      options.callback(el)
    } else {
      entry.target.classList.add(`${activeClass}`)
    }
    return
  }
  let observer = new IntersectionObserver((entries, observer) => { //this takes a callback function which receives two arguments: the elemts list and the observer instance
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (options.callback) {
          options.callback(el)
        } else {
          entry.target.classList.add(`${activeClass}`)
        }
        observer.unobserve(entry.target)
      }
    })
  }, options)
  observer.observe(el)
}