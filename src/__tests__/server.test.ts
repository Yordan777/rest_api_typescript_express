import request from "supertest";
import server from "../server";


describe('GET /API', () =>{
    it('test api',async () => {
        const res = await request(server).get('/api/products')
        // lo que queremos que se cumpla 
        expect(res.status).toBe(200)   
       
        // lo que no queremos que se cumpla
        expect(res.status).not.toBe(404)
    })
})