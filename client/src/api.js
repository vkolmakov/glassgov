const mockEmployees = [
  { name: 'John Duh', title: 'Mayor', department: 'City', salary: 200000, rating: 3.2, id: 0, photo: 'https://s-media-cache-ak0.pinimg.com/736x/44/2a/8c/442a8cdde3891bdabb4763d9d208c494.jpg' },
  { name: 'Jane Doe', title: 'Treasurer', department: 'City', salary: 200000, rating: 4.5, id: 1, photo: 'https://pbs.twimg.com/profile_images/552145045663408129/egywNuyx.png' },
  { name: 'Chuck Norris', title: 'Badass', department: 'City', salary: 999999, rating: 5.0, id: 2, photo: 'https://cbsdallas.files.wordpress.com/2010/12/walker.jpg?w=640' },
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
