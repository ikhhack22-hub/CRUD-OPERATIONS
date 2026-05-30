const express = require("express");
const router = express.Router();

const {
  getAllPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} = require("../controllers/peopleController");

/**
 * @swagger
 * tags:
 *   name: People
 *   description: People API
 */

/**
 * @swagger
 * /people:
 *   get:
 *     summary: جلب قائمة الأشخاص مع ترقيم وتصفية
 *     tags: [People]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: بحث باسم الشخص
 *       - in: query
 *         name: minAge
 *         schema: { type: integer }
 *       - in: query
 *         name: maxAge
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: نجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { type: array, items: { $ref: '#/components/schemas/Person' } }
 *                 pagination: { $ref: '#/components/schemas/Pagination' }
 */
router.get("/", getAllPeople);

/**
 * @swagger
 * /people/{id}:
 *   get:
 *     summary: جلب شخص واحد حسب المعرف
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: معرف الشخص (MongoDB ObjectId)
 *         example: "674a1b2c3d4e5f67890abcde"
 *     responses:
 *       200:
 *         description: تم جلب البيانات بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Person' }
 *       404:
 *         description: الشخص غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 error:
 *                   type: object
 *                   properties:
 *                     code: { type: string, example: 'NOT_FOUND' }
 *                     message: { type: string, example: 'Person not found' }
 *       400:
 *         description: معرف غير صالح
 */
router.get("/:id", getPerson);

/**
 * @swagger
 * /people:
 *   post:
 *     summary: إنشاء شخص جديد
 *     tags: [People]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, age]
 *             properties:
 *               name: 
 *                 type: string 
 *                 minLength: 2
 *                 example: "Ahmed"
 *               age: 
 *                 type: integer 
 *                 minimum: 0
 *                 example: 25
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ahmed@example.com"
 *     responses:
 *       201:
 *         description: تم الإنشاء بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Person' }
 *       400:
 *         description: بيانات غير صحيحة
 */
router.post("/", createPerson);

/**
 * @swagger
 * /people/{id}:
 *   put:
 *     summary: تحديث بيانات شخص بالكامل
 *     description: يستبدل جميع الحقول بالقيم المرسلة. الحقول الناقصة تُحذف أو تُعيّن للقيمة الافتراضية.
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: معرف الشخص (MongoDB ObjectId)
 *         example: "674a1b2c3d4e5f67890abcde"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, age]
 *             properties:
 *               name: 
 *                 type: string 
 *                 minLength: 2
 *                 example: "Ahmed Updated"
 *               age: 
 *                 type: integer 
 *                 minimum: 0
 *                 maximum: 120
 *                 example: 26
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ahmed.updated@example.com"
 *     responses:
 *       200:
 *         description: تم التحديث بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Person' }
 *       400:
 *         description: بيانات غير صحيحة أو معرف غير صالح
 *       404:
 *         description: الشخص غير موجود
 */
router.put("/:id", updatePerson);

/**
 * @swagger
 * /people/{id}:
 *   delete:
 *     summary: حذف شخص حسب المعرف
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: معرف الشخص (MongoDB ObjectId)
 *         example: "674a1b2c3d4e5f67890abcde"
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: 'Person deleted successfully' }
 *       404:
 *         description: الشخص غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 error:
 *                   type: object
 *                   properties:
 *                     code: { type: string, example: 'NOT_FOUND' }
 *                     message: { type: string, example: 'Person not found' }
 *       400:
 *         description: معرف غير صالح
 */
router.delete("/:id", deletePerson);

module.exports = router;