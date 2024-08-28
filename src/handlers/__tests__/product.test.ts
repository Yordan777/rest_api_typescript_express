import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("Debería mostrar errores de validación", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(401);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("mostrar que el precio no sea 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Equipo de sonido",
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(401);
    expect(response.body.errors).not.toHaveLength(4);
  });

  it("mostrar que el precio sea numero o tenga un string", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Equipo de sonido",
      price: "hola",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(401);
    expect(response.body.errors).not.toHaveLength(4);
  });

  it("Debería crear un nuevo producto", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Pantalla",
      price: 100,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  it("check si la URL existe /api/products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(404);
  });

  it("Obtenga una respuesta JSON con productos", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:ID", () => {
  it("Debería devolver la respuesta 404 para un producto inexistente", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");
  });

  it("Debe comprobar una identificación válida en la URL", async () => {
    const response = await request(server).get(`/api/products/not-valid-url`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("ID NO VALIDO");
    expect(response.body.errors).toHaveLength(1);
  });

  it("Obtenga una respuesta JSON para un solo producto", async () => {
    const response = await request(server).get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/products/:id", () => {
  it("Debe comprobar una identificación válida en la URL", async () => {
    const response = await request(server)
      .put("/api/products/not-valid-url")
      .send({
        name: "Monitor Curvo",
        availability: true,
        price: 300,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  it("Debería mostrar mensajes de error de validación al actualizar un producto.", async () => {
    const response = await request(server).put("/api/products/1").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("Debe validar que el precio sea mayor a 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor Curvo",
      availability: true,
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].msg).toBe("Precio no valido");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("Debería devolver una respuesta 404 para un producto inexistente", async () => {
    const productId = 2000;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor Curvo",
        price: 300,
        available: true,
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("Debe actualizar un producto existente con datos válidos.", async () => {
    const response = await request(server).put(`/api/products/1`).send({
      name: "Monitor Curvo",
      price: 300,
      available: true,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe('PATCH /api/products/:id', () => {
  it('should return a 404 response for a non-existing product', async () => {
      const productId = 2000
      const response = await request(server).patch(`/api/products/${productId}`)
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Producto no encontrado')
      expect(response.status).not.toBe(200)
      expect(response.body).not.toHaveProperty('data')
  })

  it('should update the product availability', async () => {
      const response = await request(server).patch('/api/products/1')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('data')
      

      expect(response.status).not.toBe(404)
      expect(response.status).not.toBe(400)
      expect(response.body).not.toHaveProperty('error')
  })
})

describe('DELETE /api/products/:id', () => {
  it('Debe comprobar una identificación válida', async () => {
      const response = await request(server).delete('/api/products/not-valid')
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].msg).toBe('ID NO VALIDO')
  })

  it('Debería devolver una respuesta 404 para un producto inexistente', async () => {
      const productId = 2000
      const response = await request(server).delete(`/api/products/${productId}`)
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Producto no encontrado')
      expect(response.status).not.toBe(200)
  })

  it('Debería eliminar un producto', async () => {
      const response = await request(server).delete('/api/products/1')
      expect(response.status).toBe(200)
      expect(response.body.data).toBe("Producto Eliminado")

      expect(response.status).not.toBe(404)
      expect(response.status).not.toBe(400)
  })
})
