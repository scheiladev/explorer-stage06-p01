export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname }  = window.location
    const route = this.routes[pathname] || this.routes[404]

    switch (pathname) {
      case '/universe':
        document.querySelector('body').classList.add('universe');
        document.querySelector('body').classList.remove('home');
        document.querySelector('body').classList.remove('explorer');
        document.querySelector('#universe').classList.add('active');
        document.querySelector('#default').classList.remove('active');
        document.querySelector('#explorer').classList.remove('active');
        break;
      case '/explorer':
        document.querySelector('body').classList.add('explorer');
        document.querySelector('body').classList.remove('home');
        document.querySelector('body').classList.remove('universe');
        document.querySelector('#explorer').classList.add('active');
        document.querySelector('#default').classList.remove('active');
        document.querySelector('#universe').classList.remove('active');
        break;
      default:
        document.querySelector('body').classList.add('home');
        document.querySelector('body').classList.remove('universe');
        document.querySelector('body').classList.remove('explorer');
        document.querySelector('#default').classList.add('active');
        document.querySelector('#universe').classList.remove('active');
        document.querySelector('#explorer').classList.remove('active');
        break;
    }
    
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })
  }
}
