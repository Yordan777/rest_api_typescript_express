declare const router: import("express-serve-static-core").Router;
/**
 * @swagger
 * /api/product/{id}:
 *  delete:
 *    summary: Delete a Product
 *    tags:
 *          - Products
 *    description: Delete Product
 *    parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *    responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 *
 */
export default router;
