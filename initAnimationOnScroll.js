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

  // Add class for start animation if block was scrolled
  addScrolledElemAnimationClass();
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

function addScrolledElemAnimationClass(
  selectorElem = '[data-animation-on-scroll]',
  animationSelector = 'start-animation-on-scroll'
) {
  const elements = document.querySelectorAll(selectorElem);
  const scroll = window.pageYOffset - (window.innerHeight / 2);

  if (!elements.length) return;

  [...elements].forEach(element => {
    const rect = element.getBoundingClientRect();
    if ( rect.top < scroll ) {
      element.classList.add(animationSelector);
    }
  })
}