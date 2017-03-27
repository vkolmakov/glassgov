const mockEmployees = [
  { name: 'Philip J. Fry', title: 'Delivery Boy', department: 'Planet Express Crew', salary: 30000, rating: 3.2, id: 0, photo: 'https://pbs.twimg.com/profile_images/806313367052976129/CketiJDK.jpg' },
  { name: 'Turanga Leela', title: 'Captain', department: 'Planet Express Crew', salary: 50000, rating: 4.5, id: 1, photo: 'https://geekygirlfilmblog.files.wordpress.com/2014/04/turanga_leela_314.png' },
  { name: 'Bender Bending Rodrigez', title: 'Industrial Robot', department: 'Planet Express Crew', salary: 30000, rating: 5.0, id: 2, photo: 'http://idaconcpts.com/wp-content/uploads/bender-smoking.jpg' },
  { name: 'Amy Wong', title: 'Intern', department: 'Planet Express Crew', salary: 0, rating: 5.0, id: 3, photo: 'https://upload.wikimedia.org/wikipedia/it/1/12/Amy_wong_-_futurama.png' },
  { name: 'Hermes Conrad', title: 'Bureaucrat and Accountant', department: 'Planet Express', salary: 50000, rating: 5.0, id: 4, photo: 'http://vignette1.wikia.nocookie.net/futurama/images/9/95/Hermes_Conrad.png/revision/latest?cb=20090809214221&path-prefix=it' },
  { name: 'Professor Hubert J. Farnsworth', title: 'CEO', department: 'Planet Express', salary: 50000, rating: 4.4, id: 5, photo: 'http://vignette2.wikia.nocookie.net/en.futurama/images/f/f6/Professor-farnsworth.jpg/revision/latest/zoom-crop/width/240/height/240?cb=20120226073833' },
  { name: 'Doctor John A. Zoidberg', title: 'Staff Doctor', department: 'Planet Express', salary: 5000, rating: 3.0, id: 6, photo: 'https://uproxx.files.wordpress.com/2014/10/zoidberg.jpg?quality=100&w=600' },
]

const mockComments = [
  { user: 'John', text: `I've seen better`, rating: 2.0, id: 0 },
  { user: 'Doge', text: 'Much amaze', rating: 5.0, id: 1 },
  { user: 'Ben', text: `I'm Ben!`, rating: 4.0, id: 2 },
]

export function getEmployees() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmployees)
    }, 300)
  })
}

export function getComments(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockComments)
    }, 300)
  })
}

export function getFeatured() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmployees.slice(0, 3))
    })
  }, 300)
}

export function submitRating({ rating, comment, user, employee }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}
