import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import { addUser, getUsers, getUser } from '../../controllers/user.controller.js';
import { addUserSchema } from '../../validations/users-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     Skills:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Skill name.
 *           example: JavaScript
 *         proficiency:
 *           type: string
 *           description: Skill proficiency level.
 *           enum: ['Beginer', 'Intermediate', 'Advanced']
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first/given name.
 *           example: Chetan
 *         lastName:
 *           type: string
 *           description: The user's surname/family name.
 *           example: Patil
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *
 *     CreateUserRequest:
 *       allOf:
 *       - $ref: '#/components/schemas/User'
 *       - type: object
 *         properties:
 *           skills:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Skills'
 *
 *     CreateUserSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         body:
 *           allOf:
 *           - $ref: '#/components/schemas/User'
 *           - type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Id generated for created user.
 *                 example: 1
 *               skills:
 *                 type: array
 *                 items:
 *                   allOf:
 *                   - type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: Id generated for created skill.
 *                         example: 1
 *                       userId:
 *                         type: number
 *                         description: Id generated for created user.
 *                         example: 1
 *                   - $ref: '#/components/schemas/Skills'
 */

/**
 * @openapi
 * /v1/users:
 *   post:
 *     tags:
 *       - v1
 *     description: Endpoint to create/add new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       200:
 *         description: Application helath details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccess'
 *
 */
router
  .route('/')
  .post(validate({ body: addUserSchema }), addUser)
  .get(getUsers);

router
  .route('/:userId')
  .get(getUser);

export default router;
