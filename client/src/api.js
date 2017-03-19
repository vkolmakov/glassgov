const mockEmployees = [
  { name: 'John Duh', title: 'Mayor', picture: '', department: 'City', salary: 200000 },
  { name: 'Jane Doe', title: 'Treasurer', picture: '', department: 'City', salary: 200000 },
  { name: 'Chuck Norris', title: 'Badass', picture: '', department: 'City', salary: 999999 },
]

export function getEmployees() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmployees)
    }, 300)
  })
}
