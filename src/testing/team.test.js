const supertest = require('supertest')
const request = supertest('./routes/team')

// describe('#getUser() using async/await', () => { 
//     test("It should respond with an status 200", async () => { 
//         const resq = await resq.get("http://localhost:3000/team/view");  
//         expect(resq.statusCode).toBe(200); 
//     });
// })

it('gets the Team endpoint', async done => {
    const response = await request.get('http://localhost:3000/team/view')
  
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
    done()
  })