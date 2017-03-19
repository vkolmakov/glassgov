const mockEmployees = [
  { name: 'John Duh', title: 'Mayor', picture: '', department: 'City', salary: 200000, rating: 3.2, id: 0 },
  { name: 'Jane Doe', title: 'Treasurer', picture: '', department: 'City', salary: 200000, rating: 4.5, id: 1 },
  { name: 'Chuck Norris', title: 'Badass', picture: '', department: 'City', salary: 999999, rating: 5.0, id: 2 },
]

export function getEmployees() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmployees)
    }, 300)
  })
}
