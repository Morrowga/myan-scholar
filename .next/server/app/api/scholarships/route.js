/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/scholarships/route";
exports.ids = ["app/api/scholarships/route"];
exports.modules = {

/***/ "(rsc)/./app/api/scholarships/route.ts":
/*!***************************************!*\
  !*** ./app/api/scholarships/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./lib/supabase.ts\");\n/* harmony import */ var _lib_save_scholarship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/save-scholarship */ \"(rsc)/./lib/save-scholarship.ts\");\n\n\n\n// GET /api/scholarships — public listing with optional filters\nasync function GET(req) {\n    const { searchParams } = new URL(req.url);\n    const country = searchParams.get('country');\n    const level = searchParams.get('level');\n    let query = _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.from('scholarships').select('*').eq('is_published', true).order('deadline', {\n        ascending: true,\n        nullsFirst: false\n    });\n    if (country) query = query.ilike('country', `%${country}%`);\n    if (level && level !== 'any') query = query.eq('level', level);\n    const { data, error } = await query;\n    if (error) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: error.message\n    }, {\n        status: 500\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n}\n// POST /api/scholarships — add new scholarship (protected by admin password)\nasync function POST(req) {\n    const authHeader = req.headers.get('x-admin-password');\n    if (authHeader !== process.env.ADMIN_PASSWORD) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Unauthorized'\n        }, {\n            status: 401\n        });\n    }\n    const body = await req.json();\n    if (!body.name || !body.country || !body.requirements || !body.source_url) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Missing required fields'\n        }, {\n            status: 400\n        });\n    }\n    const result = await (0,_lib_save_scholarship__WEBPACK_IMPORTED_MODULE_2__.saveScholarship)(body, {\n        ai_generated: false\n    });\n    if (result.error && !result.id) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: result.error\n        }, {\n            status: 500\n        });\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        id: result.id,\n        warning: result.error ?? null\n    }, {\n        status: 201\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NjaG9sYXJzaGlwcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF1RDtBQUNkO0FBQ2U7QUFHeEQsK0RBQStEO0FBQ3hELGVBQWVHLElBQUlDLEdBQWdCO0lBQ3hDLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsSUFBSUcsR0FBRztJQUN4QyxNQUFNQyxVQUFVSCxhQUFhSSxHQUFHLENBQUM7SUFDakMsTUFBTUMsUUFBUUwsYUFBYUksR0FBRyxDQUFDO0lBRS9CLElBQUlFLFFBQVFWLG1EQUFRQSxDQUNqQlcsSUFBSSxDQUFDLGdCQUNMQyxNQUFNLENBQUMsS0FDUEMsRUFBRSxDQUFDLGdCQUFnQixNQUNuQkMsS0FBSyxDQUFDLFlBQVk7UUFBRUMsV0FBVztRQUFNQyxZQUFZO0lBQU07SUFFMUQsSUFBSVQsU0FBU0csUUFBUUEsTUFBTU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUVWLFFBQVEsQ0FBQyxDQUFDO0lBQzFELElBQUlFLFNBQVNBLFVBQVUsT0FBT0MsUUFBUUEsTUFBTUcsRUFBRSxDQUFDLFNBQVNKO0lBRXhELE1BQU0sRUFBRVMsSUFBSSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNVDtJQUU5QixJQUFJUyxPQUFPLE9BQU9wQixxREFBWUEsQ0FBQ3FCLElBQUksQ0FBQztRQUFFRCxPQUFPQSxNQUFNRSxPQUFPO0lBQUMsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFDNUUsT0FBT3ZCLHFEQUFZQSxDQUFDcUIsSUFBSSxDQUFDRjtBQUMzQjtBQUVBLDZFQUE2RTtBQUN0RSxlQUFlSyxLQUFLcEIsR0FBZ0I7SUFDekMsTUFBTXFCLGFBQWFyQixJQUFJc0IsT0FBTyxDQUFDakIsR0FBRyxDQUFDO0lBQ25DLElBQUlnQixlQUFlRSxRQUFRQyxHQUFHLENBQUNDLGNBQWMsRUFBRTtRQUM3QyxPQUFPN0IscURBQVlBLENBQUNxQixJQUFJLENBQUM7WUFBRUQsT0FBTztRQUFlLEdBQUc7WUFBRUcsUUFBUTtRQUFJO0lBQ3BFO0lBRUEsTUFBTU8sT0FBNEIsTUFBTTFCLElBQUlpQixJQUFJO0lBRWhELElBQUksQ0FBQ1MsS0FBS0MsSUFBSSxJQUFJLENBQUNELEtBQUt0QixPQUFPLElBQUksQ0FBQ3NCLEtBQUtFLFlBQVksSUFBSSxDQUFDRixLQUFLRyxVQUFVLEVBQUU7UUFDekUsT0FBT2pDLHFEQUFZQSxDQUFDcUIsSUFBSSxDQUFDO1lBQUVELE9BQU87UUFBMEIsR0FBRztZQUFFRyxRQUFRO1FBQUk7SUFDL0U7SUFFQSxNQUFNVyxTQUFTLE1BQU1oQyxzRUFBZUEsQ0FBQzRCLE1BQU07UUFBRUssY0FBYztJQUFNO0lBRWpFLElBQUlELE9BQU9kLEtBQUssSUFBSSxDQUFDYyxPQUFPRSxFQUFFLEVBQUU7UUFDOUIsT0FBT3BDLHFEQUFZQSxDQUFDcUIsSUFBSSxDQUFDO1lBQUVELE9BQU9jLE9BQU9kLEtBQUs7UUFBQyxHQUFHO1lBQUVHLFFBQVE7UUFBSTtJQUNsRTtJQUVBLE9BQU92QixxREFBWUEsQ0FBQ3FCLElBQUksQ0FBQztRQUFFZSxJQUFJRixPQUFPRSxFQUFFO1FBQUVDLFNBQVNILE9BQU9kLEtBQUssSUFBSTtJQUFLLEdBQUc7UUFBRUcsUUFBUTtJQUFJO0FBQzNGIiwic291cmNlcyI6WyIvVXNlcnMvdGhpaGFldW5nL215YW4tc2Nob2xhci9hcHAvYXBpL3NjaG9sYXJzaGlwcy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gJ0AvbGliL3N1cGFiYXNlJ1xuaW1wb3J0IHsgc2F2ZVNjaG9sYXJzaGlwIH0gZnJvbSAnQC9saWIvc2F2ZS1zY2hvbGFyc2hpcCdcbmltcG9ydCB7IFNjaG9sYXJzaGlwRm9ybURhdGEgfSBmcm9tICdAL3R5cGVzJ1xuXG4vLyBHRVQgL2FwaS9zY2hvbGFyc2hpcHMg4oCUIHB1YmxpYyBsaXN0aW5nIHdpdGggb3B0aW9uYWwgZmlsdGVyc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcS51cmwpXG4gIGNvbnN0IGNvdW50cnkgPSBzZWFyY2hQYXJhbXMuZ2V0KCdjb3VudHJ5JylcbiAgY29uc3QgbGV2ZWwgPSBzZWFyY2hQYXJhbXMuZ2V0KCdsZXZlbCcpXG5cbiAgbGV0IHF1ZXJ5ID0gc3VwYWJhc2VcbiAgICAuZnJvbSgnc2Nob2xhcnNoaXBzJylcbiAgICAuc2VsZWN0KCcqJylcbiAgICAuZXEoJ2lzX3B1Ymxpc2hlZCcsIHRydWUpXG4gICAgLm9yZGVyKCdkZWFkbGluZScsIHsgYXNjZW5kaW5nOiB0cnVlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuXG4gIGlmIChjb3VudHJ5KSBxdWVyeSA9IHF1ZXJ5LmlsaWtlKCdjb3VudHJ5JywgYCUke2NvdW50cnl9JWApXG4gIGlmIChsZXZlbCAmJiBsZXZlbCAhPT0gJ2FueScpIHF1ZXJ5ID0gcXVlcnkuZXEoJ2xldmVsJywgbGV2ZWwpXG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgcXVlcnlcblxuICBpZiAoZXJyb3IpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEpXG59XG5cbi8vIFBPU1QgL2FwaS9zY2hvbGFyc2hpcHMg4oCUIGFkZCBuZXcgc2Nob2xhcnNoaXAgKHByb3RlY3RlZCBieSBhZG1pbiBwYXNzd29yZClcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgY29uc3QgYXV0aEhlYWRlciA9IHJlcS5oZWFkZXJzLmdldCgneC1hZG1pbi1wYXNzd29yZCcpXG4gIGlmIChhdXRoSGVhZGVyICE9PSBwcm9jZXNzLmVudi5BRE1JTl9QQVNTV09SRCkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pXG4gIH1cblxuICBjb25zdCBib2R5OiBTY2hvbGFyc2hpcEZvcm1EYXRhID0gYXdhaXQgcmVxLmpzb24oKVxuXG4gIGlmICghYm9keS5uYW1lIHx8ICFib2R5LmNvdW50cnkgfHwgIWJvZHkucmVxdWlyZW1lbnRzIHx8ICFib2R5LnNvdXJjZV91cmwpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ01pc3NpbmcgcmVxdWlyZWQgZmllbGRzJyB9LCB7IHN0YXR1czogNDAwIH0pXG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBzYXZlU2Nob2xhcnNoaXAoYm9keSwgeyBhaV9nZW5lcmF0ZWQ6IGZhbHNlIH0pXG5cbiAgaWYgKHJlc3VsdC5lcnJvciAmJiAhcmVzdWx0LmlkKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IHJlc3VsdC5lcnJvciB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cblxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBpZDogcmVzdWx0LmlkLCB3YXJuaW5nOiByZXN1bHQuZXJyb3IgPz8gbnVsbCB9LCB7IHN0YXR1czogMjAxIH0pXG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwic3VwYWJhc2UiLCJzYXZlU2Nob2xhcnNoaXAiLCJHRVQiLCJyZXEiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJjb3VudHJ5IiwiZ2V0IiwibGV2ZWwiLCJxdWVyeSIsImZyb20iLCJzZWxlY3QiLCJlcSIsIm9yZGVyIiwiYXNjZW5kaW5nIiwibnVsbHNGaXJzdCIsImlsaWtlIiwiZGF0YSIsImVycm9yIiwianNvbiIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJQT1NUIiwiYXV0aEhlYWRlciIsImhlYWRlcnMiLCJwcm9jZXNzIiwiZW52IiwiQURNSU5fUEFTU1dPUkQiLCJib2R5IiwibmFtZSIsInJlcXVpcmVtZW50cyIsInNvdXJjZV91cmwiLCJyZXN1bHQiLCJhaV9nZW5lcmF0ZWQiLCJpZCIsIndhcm5pbmciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/scholarships/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/gemini.ts":
/*!***********************!*\
  !*** ./lib/gemini.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateBurmeseContent: () => (/* binding */ generateBurmeseContent)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n\nconst genai = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: process.env.GEMINI_API_KEY\n});\nconst MODEL = 'gemini-3.1-flash-lite';\nasync function generateBurmeseContent(name, country, level, requirements, covers = '', deadline = '') {\n    const prompt = `\nYou are helping Myanmar citizens understand international scholarships.\nGenerate content in Myanmar (Burmese) script ONLY. Do not use English except for proper nouns like institution names.\n\nScholarship details:\n- Name: ${name}\n- Country: ${country}\n- Level: ${level}\n- Covers: ${covers}\n- Deadline: ${deadline}\n- Requirements (English): ${requirements}\n\nReturn ONLY a valid JSON object with exactly these 4 keys, no markdown, no extra text:\n\n{\n  \"name_mm\": \"Scholarship name translated or transliterated to Burmese\",\n  \"requirements_mm\": \"Full requirements translated to Burmese, in clear paragraphs\",\n  \"instructions_mm\": \"Step-by-step preparation guide in Burmese. What the student needs to do from now until applying. Use numbered steps. Be practical and encouraging.\",\n  \"checklist_mm\": [\"document 1 in Burmese\", \"document 2 in Burmese\", \"...\"]\n}\n\nFor instructions_mm, cover things like:\n- What scores/grades are needed and how to prepare\n- What tests to take (IELTS/TOEFL etc) and when\n- What documents to collect\n- How to write the personal statement\n- When and how to apply\n\nMake it feel like advice from a helpful older sibling who already got a scholarship.\nThe checklist_mm must be an array of strings, each item being one document or requirement.\n`;\n    const response = await genai.models.generateContent({\n        model: MODEL,\n        contents: prompt,\n        config: {\n            temperature: 0.3,\n            responseMimeType: 'application/json'\n        }\n    });\n    const text = response.text ?? '';\n    // Strip any accidental markdown fences\n    const clean = text.replace(/```json|```/g, '').trim();\n    const parsed = JSON.parse(clean);\n    return {\n        name_mm: parsed.name_mm ?? '',\n        requirements_mm: parsed.requirements_mm ?? '',\n        instructions_mm: parsed.instructions_mm ?? '',\n        checklist_mm: JSON.stringify(parsed.checklist_mm ?? [])\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZ2VtaW5pLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTJDO0FBRTNDLE1BQU1DLFFBQVEsSUFBSUQsc0RBQVdBLENBQUM7SUFBRUUsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxjQUFjO0FBQUU7QUFDcEUsTUFBTUMsUUFBUTtBQVNQLGVBQWVDLHVCQUNwQkMsSUFBWSxFQUNaQyxPQUFlLEVBQ2ZDLEtBQWEsRUFDYkMsWUFBb0IsRUFDcEJDLFNBQWlCLEVBQUUsRUFDbkJDLFdBQW1CLEVBQUU7SUFHckIsTUFBTUMsU0FBUyxDQUFDOzs7OztRQUtWLEVBQUVOLEtBQUs7V0FDSixFQUFFQyxRQUFRO1NBQ1osRUFBRUMsTUFBTTtVQUNQLEVBQUVFLE9BQU87WUFDUCxFQUFFQyxTQUFTOzBCQUNHLEVBQUVGLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0J6QyxDQUFDO0lBRUMsTUFBTUksV0FBVyxNQUFNZCxNQUFNZSxNQUFNLENBQUNDLGVBQWUsQ0FBQztRQUNsREMsT0FBT1o7UUFDUGEsVUFBVUw7UUFDVk0sUUFBUTtZQUNOQyxhQUFhO1lBQ2JDLGtCQUFrQjtRQUNwQjtJQUNGO0lBRUEsTUFBTUMsT0FBT1IsU0FBU1EsSUFBSSxJQUFJO0lBRTlCLHVDQUF1QztJQUN2QyxNQUFNQyxRQUFRRCxLQUFLRSxPQUFPLENBQUMsZ0JBQWdCLElBQUlDLElBQUk7SUFDbkQsTUFBTUMsU0FBU0MsS0FBS0MsS0FBSyxDQUFDTDtJQUUxQixPQUFPO1FBQ0xNLFNBQVNILE9BQU9HLE9BQU8sSUFBSTtRQUMzQkMsaUJBQWlCSixPQUFPSSxlQUFlLElBQUk7UUFDM0NDLGlCQUFpQkwsT0FBT0ssZUFBZSxJQUFJO1FBQzNDQyxjQUFjTCxLQUFLTSxTQUFTLENBQUNQLE9BQU9NLFlBQVksSUFBSSxFQUFFO0lBQ3hEO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy90aGloYWV1bmcvbXlhbi1zY2hvbGFyL2xpYi9nZW1pbmkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlR2VuQUkgfSBmcm9tICdAZ29vZ2xlL2dlbmFpJ1xuXG5jb25zdCBnZW5haSA9IG5ldyBHb29nbGVHZW5BSSh7IGFwaUtleTogcHJvY2Vzcy5lbnYuR0VNSU5JX0FQSV9LRVkhIH0pXG5jb25zdCBNT0RFTCA9ICdnZW1pbmktMy4xLWZsYXNoLWxpdGUnXG5cbmludGVyZmFjZSBHZW5lcmF0ZWRDb250ZW50IHtcbiAgbmFtZV9tbTogc3RyaW5nXG4gIHJlcXVpcmVtZW50c19tbTogc3RyaW5nXG4gIGluc3RydWN0aW9uc19tbTogc3RyaW5nXG4gIGNoZWNrbGlzdF9tbTogc3RyaW5nICAgLy8gSlNPTiBzdHJpbmcgb2Ygc3RyaW5nW11cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlQnVybWVzZUNvbnRlbnQoXG4gIG5hbWU6IHN0cmluZyxcbiAgY291bnRyeTogc3RyaW5nLFxuICBsZXZlbDogc3RyaW5nLFxuICByZXF1aXJlbWVudHM6IHN0cmluZyxcbiAgY292ZXJzOiBzdHJpbmcgPSAnJyxcbiAgZGVhZGxpbmU6IHN0cmluZyA9ICcnXG4pOiBQcm9taXNlPEdlbmVyYXRlZENvbnRlbnQ+IHtcblxuICBjb25zdCBwcm9tcHQgPSBgXG5Zb3UgYXJlIGhlbHBpbmcgTXlhbm1hciBjaXRpemVucyB1bmRlcnN0YW5kIGludGVybmF0aW9uYWwgc2Nob2xhcnNoaXBzLlxuR2VuZXJhdGUgY29udGVudCBpbiBNeWFubWFyIChCdXJtZXNlKSBzY3JpcHQgT05MWS4gRG8gbm90IHVzZSBFbmdsaXNoIGV4Y2VwdCBmb3IgcHJvcGVyIG5vdW5zIGxpa2UgaW5zdGl0dXRpb24gbmFtZXMuXG5cblNjaG9sYXJzaGlwIGRldGFpbHM6XG4tIE5hbWU6ICR7bmFtZX1cbi0gQ291bnRyeTogJHtjb3VudHJ5fVxuLSBMZXZlbDogJHtsZXZlbH1cbi0gQ292ZXJzOiAke2NvdmVyc31cbi0gRGVhZGxpbmU6ICR7ZGVhZGxpbmV9XG4tIFJlcXVpcmVtZW50cyAoRW5nbGlzaCk6ICR7cmVxdWlyZW1lbnRzfVxuXG5SZXR1cm4gT05MWSBhIHZhbGlkIEpTT04gb2JqZWN0IHdpdGggZXhhY3RseSB0aGVzZSA0IGtleXMsIG5vIG1hcmtkb3duLCBubyBleHRyYSB0ZXh0OlxuXG57XG4gIFwibmFtZV9tbVwiOiBcIlNjaG9sYXJzaGlwIG5hbWUgdHJhbnNsYXRlZCBvciB0cmFuc2xpdGVyYXRlZCB0byBCdXJtZXNlXCIsXG4gIFwicmVxdWlyZW1lbnRzX21tXCI6IFwiRnVsbCByZXF1aXJlbWVudHMgdHJhbnNsYXRlZCB0byBCdXJtZXNlLCBpbiBjbGVhciBwYXJhZ3JhcGhzXCIsXG4gIFwiaW5zdHJ1Y3Rpb25zX21tXCI6IFwiU3RlcC1ieS1zdGVwIHByZXBhcmF0aW9uIGd1aWRlIGluIEJ1cm1lc2UuIFdoYXQgdGhlIHN0dWRlbnQgbmVlZHMgdG8gZG8gZnJvbSBub3cgdW50aWwgYXBwbHlpbmcuIFVzZSBudW1iZXJlZCBzdGVwcy4gQmUgcHJhY3RpY2FsIGFuZCBlbmNvdXJhZ2luZy5cIixcbiAgXCJjaGVja2xpc3RfbW1cIjogW1wiZG9jdW1lbnQgMSBpbiBCdXJtZXNlXCIsIFwiZG9jdW1lbnQgMiBpbiBCdXJtZXNlXCIsIFwiLi4uXCJdXG59XG5cbkZvciBpbnN0cnVjdGlvbnNfbW0sIGNvdmVyIHRoaW5ncyBsaWtlOlxuLSBXaGF0IHNjb3Jlcy9ncmFkZXMgYXJlIG5lZWRlZCBhbmQgaG93IHRvIHByZXBhcmVcbi0gV2hhdCB0ZXN0cyB0byB0YWtlIChJRUxUUy9UT0VGTCBldGMpIGFuZCB3aGVuXG4tIFdoYXQgZG9jdW1lbnRzIHRvIGNvbGxlY3Rcbi0gSG93IHRvIHdyaXRlIHRoZSBwZXJzb25hbCBzdGF0ZW1lbnRcbi0gV2hlbiBhbmQgaG93IHRvIGFwcGx5XG5cbk1ha2UgaXQgZmVlbCBsaWtlIGFkdmljZSBmcm9tIGEgaGVscGZ1bCBvbGRlciBzaWJsaW5nIHdobyBhbHJlYWR5IGdvdCBhIHNjaG9sYXJzaGlwLlxuVGhlIGNoZWNrbGlzdF9tbSBtdXN0IGJlIGFuIGFycmF5IG9mIHN0cmluZ3MsIGVhY2ggaXRlbSBiZWluZyBvbmUgZG9jdW1lbnQgb3IgcmVxdWlyZW1lbnQuXG5gXG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZW5haS5tb2RlbHMuZ2VuZXJhdGVDb250ZW50KHtcbiAgICBtb2RlbDogTU9ERUwsXG4gICAgY29udGVudHM6IHByb21wdCxcbiAgICBjb25maWc6IHtcbiAgICAgIHRlbXBlcmF0dXJlOiAwLjMsXG4gICAgICByZXNwb25zZU1pbWVUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHRleHQgPSByZXNwb25zZS50ZXh0ID8/ICcnXG5cbiAgLy8gU3RyaXAgYW55IGFjY2lkZW50YWwgbWFya2Rvd24gZmVuY2VzXG4gIGNvbnN0IGNsZWFuID0gdGV4dC5yZXBsYWNlKC9gYGBqc29ufGBgYC9nLCAnJykudHJpbSgpXG4gIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoY2xlYW4pXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lX21tOiBwYXJzZWQubmFtZV9tbSA/PyAnJyxcbiAgICByZXF1aXJlbWVudHNfbW06IHBhcnNlZC5yZXF1aXJlbWVudHNfbW0gPz8gJycsXG4gICAgaW5zdHJ1Y3Rpb25zX21tOiBwYXJzZWQuaW5zdHJ1Y3Rpb25zX21tID8/ICcnLFxuICAgIGNoZWNrbGlzdF9tbTogSlNPTi5zdHJpbmdpZnkocGFyc2VkLmNoZWNrbGlzdF9tbSA/PyBbXSksXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJHb29nbGVHZW5BSSIsImdlbmFpIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIkdFTUlOSV9BUElfS0VZIiwiTU9ERUwiLCJnZW5lcmF0ZUJ1cm1lc2VDb250ZW50IiwibmFtZSIsImNvdW50cnkiLCJsZXZlbCIsInJlcXVpcmVtZW50cyIsImNvdmVycyIsImRlYWRsaW5lIiwicHJvbXB0IiwicmVzcG9uc2UiLCJtb2RlbHMiLCJnZW5lcmF0ZUNvbnRlbnQiLCJtb2RlbCIsImNvbnRlbnRzIiwiY29uZmlnIiwidGVtcGVyYXR1cmUiLCJyZXNwb25zZU1pbWVUeXBlIiwidGV4dCIsImNsZWFuIiwicmVwbGFjZSIsInRyaW0iLCJwYXJzZWQiLCJKU09OIiwicGFyc2UiLCJuYW1lX21tIiwicmVxdWlyZW1lbnRzX21tIiwiaW5zdHJ1Y3Rpb25zX21tIiwiY2hlY2tsaXN0X21tIiwic3RyaW5naWZ5Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/gemini.ts\n");

/***/ }),

/***/ "(rsc)/./lib/save-scholarship.ts":
/*!*********************************!*\
  !*** ./lib/save-scholarship.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   saveScholarship: () => (/* binding */ saveScholarship)\n/* harmony export */ });\n/* harmony import */ var _supabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supabase */ \"(rsc)/./lib/supabase.ts\");\n/* harmony import */ var _gemini__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gemini */ \"(rsc)/./lib/gemini.ts\");\n\n\nasync function saveScholarship(data, options = {}) {\n    try {\n        // 1. Save raw English data first so it's in DB even if AI step fails\n        const { data: inserted, error: insertError } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabaseAdmin.from('scholarships').insert({\n            ...data,\n            is_published: false,\n            ai_generated: options.ai_generated ?? false,\n            ai_processed: false\n        }).select('id').single();\n        if (insertError || !inserted) {\n            return {\n                id: '',\n                error: insertError?.message ?? 'Insert failed'\n            };\n        }\n        const id = inserted.id;\n        // 2. Generate Burmese content with Gemini\n        const burmese = await (0,_gemini__WEBPACK_IMPORTED_MODULE_1__.generateBurmeseContent)(data.name, data.country, data.level, data.requirements, data.covers, data.deadline);\n        // 3. Update record with AI content and publish\n        const { error: updateError } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabaseAdmin.from('scholarships').update({\n            ...burmese,\n            ai_processed: true,\n            is_published: true\n        }).eq('id', id);\n        if (updateError) {\n            // Still saved in DB, just not published — you can retry\n            console.error('Gemini update failed:', updateError.message);\n            return {\n                id,\n                error: 'Saved but AI generation failed. Will retry.'\n            };\n        }\n        return {\n            id\n        };\n    } catch (err) {\n        const message = err instanceof Error ? err.message : 'Unknown error';\n        return {\n            id: '',\n            error: message\n        };\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc2F2ZS1zY2hvbGFyc2hpcC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMEM7QUFDTztBQUcxQyxlQUFlRSxnQkFDcEJDLElBQXlCLEVBQ3pCQyxVQUFzQyxDQUFDLENBQUM7SUFFeEMsSUFBSTtRQUNGLHFFQUFxRTtRQUNyRSxNQUFNLEVBQUVELE1BQU1FLFFBQVEsRUFBRUMsT0FBT0MsV0FBVyxFQUFFLEdBQUcsTUFBTVAsb0RBQWFBLENBQy9EUSxJQUFJLENBQUMsZ0JBQ0xDLE1BQU0sQ0FBQztZQUNOLEdBQUdOLElBQUk7WUFDUE8sY0FBYztZQUNkQyxjQUFjUCxRQUFRTyxZQUFZLElBQUk7WUFDdENDLGNBQWM7UUFDaEIsR0FDQ0MsTUFBTSxDQUFDLE1BQ1BDLE1BQU07UUFFVCxJQUFJUCxlQUFlLENBQUNGLFVBQVU7WUFDNUIsT0FBTztnQkFBRVUsSUFBSTtnQkFBSVQsT0FBT0MsYUFBYVMsV0FBVztZQUFnQjtRQUNsRTtRQUVBLE1BQU1ELEtBQUtWLFNBQVNVLEVBQUU7UUFFdEIsMENBQTBDO1FBQzFDLE1BQU1FLFVBQVUsTUFBTWhCLCtEQUFzQkEsQ0FDMUNFLEtBQUtlLElBQUksRUFDVGYsS0FBS2dCLE9BQU8sRUFDWmhCLEtBQUtpQixLQUFLLEVBQ1ZqQixLQUFLa0IsWUFBWSxFQUNqQmxCLEtBQUttQixNQUFNLEVBQ1huQixLQUFLb0IsUUFBUTtRQUdmLCtDQUErQztRQUMvQyxNQUFNLEVBQUVqQixPQUFPa0IsV0FBVyxFQUFFLEdBQUcsTUFBTXhCLG9EQUFhQSxDQUMvQ1EsSUFBSSxDQUFDLGdCQUNMaUIsTUFBTSxDQUFDO1lBQ04sR0FBR1IsT0FBTztZQUNWTCxjQUFjO1lBQ2RGLGNBQWM7UUFDaEIsR0FDQ2dCLEVBQUUsQ0FBQyxNQUFNWDtRQUVaLElBQUlTLGFBQWE7WUFDZix3REFBd0Q7WUFDeERHLFFBQVFyQixLQUFLLENBQUMseUJBQXlCa0IsWUFBWVIsT0FBTztZQUMxRCxPQUFPO2dCQUFFRDtnQkFBSVQsT0FBTztZQUE4QztRQUNwRTtRQUVBLE9BQU87WUFBRVM7UUFBRztJQUNkLEVBQUUsT0FBT2EsS0FBSztRQUNaLE1BQU1aLFVBQVVZLGVBQWVDLFFBQVFELElBQUlaLE9BQU8sR0FBRztRQUNyRCxPQUFPO1lBQUVELElBQUk7WUFBSVQsT0FBT1U7UUFBUTtJQUNsQztBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvdGhpaGFldW5nL215YW4tc2Nob2xhci9saWIvc2F2ZS1zY2hvbGFyc2hpcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdXBhYmFzZUFkbWluIH0gZnJvbSAnLi9zdXBhYmFzZSdcbmltcG9ydCB7IGdlbmVyYXRlQnVybWVzZUNvbnRlbnQgfSBmcm9tICcuL2dlbWluaSdcbmltcG9ydCB7IFNjaG9sYXJzaGlwRm9ybURhdGEgfSBmcm9tICdAL3R5cGVzJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNjaG9sYXJzaGlwKFxuICBkYXRhOiBTY2hvbGFyc2hpcEZvcm1EYXRhLFxuICBvcHRpb25zOiB7IGFpX2dlbmVyYXRlZD86IGJvb2xlYW4gfSA9IHt9XG4pOiBQcm9taXNlPHsgaWQ6IHN0cmluZzsgZXJyb3I/OiBzdHJpbmcgfT4ge1xuICB0cnkge1xuICAgIC8vIDEuIFNhdmUgcmF3IEVuZ2xpc2ggZGF0YSBmaXJzdCBzbyBpdCdzIGluIERCIGV2ZW4gaWYgQUkgc3RlcCBmYWlsc1xuICAgIGNvbnN0IHsgZGF0YTogaW5zZXJ0ZWQsIGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgLmZyb20oJ3NjaG9sYXJzaGlwcycpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgaXNfcHVibGlzaGVkOiBmYWxzZSxcbiAgICAgICAgYWlfZ2VuZXJhdGVkOiBvcHRpb25zLmFpX2dlbmVyYXRlZCA/PyBmYWxzZSxcbiAgICAgICAgYWlfcHJvY2Vzc2VkOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KCdpZCcpXG4gICAgICAuc2luZ2xlKClcblxuICAgIGlmIChpbnNlcnRFcnJvciB8fCAhaW5zZXJ0ZWQpIHtcbiAgICAgIHJldHVybiB7IGlkOiAnJywgZXJyb3I6IGluc2VydEVycm9yPy5tZXNzYWdlID8/ICdJbnNlcnQgZmFpbGVkJyB9XG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSBpbnNlcnRlZC5pZFxuXG4gICAgLy8gMi4gR2VuZXJhdGUgQnVybWVzZSBjb250ZW50IHdpdGggR2VtaW5pXG4gICAgY29uc3QgYnVybWVzZSA9IGF3YWl0IGdlbmVyYXRlQnVybWVzZUNvbnRlbnQoXG4gICAgICBkYXRhLm5hbWUsXG4gICAgICBkYXRhLmNvdW50cnksXG4gICAgICBkYXRhLmxldmVsLFxuICAgICAgZGF0YS5yZXF1aXJlbWVudHMsXG4gICAgICBkYXRhLmNvdmVycyxcbiAgICAgIGRhdGEuZGVhZGxpbmVcbiAgICApXG5cbiAgICAvLyAzLiBVcGRhdGUgcmVjb3JkIHdpdGggQUkgY29udGVudCBhbmQgcHVibGlzaFxuICAgIGNvbnN0IHsgZXJyb3I6IHVwZGF0ZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAuZnJvbSgnc2Nob2xhcnNoaXBzJylcbiAgICAgIC51cGRhdGUoe1xuICAgICAgICAuLi5idXJtZXNlLFxuICAgICAgICBhaV9wcm9jZXNzZWQ6IHRydWUsXG4gICAgICAgIGlzX3B1Ymxpc2hlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICAuZXEoJ2lkJywgaWQpXG5cbiAgICBpZiAodXBkYXRlRXJyb3IpIHtcbiAgICAgIC8vIFN0aWxsIHNhdmVkIGluIERCLCBqdXN0IG5vdCBwdWJsaXNoZWQg4oCUIHlvdSBjYW4gcmV0cnlcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0dlbWluaSB1cGRhdGUgZmFpbGVkOicsIHVwZGF0ZUVycm9yLm1lc3NhZ2UpXG4gICAgICByZXR1cm4geyBpZCwgZXJyb3I6ICdTYXZlZCBidXQgQUkgZ2VuZXJhdGlvbiBmYWlsZWQuIFdpbGwgcmV0cnkuJyB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgaWQgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdVbmtub3duIGVycm9yJ1xuICAgIHJldHVybiB7IGlkOiAnJywgZXJyb3I6IG1lc3NhZ2UgfVxuICB9XG59XG4iXSwibmFtZXMiOlsic3VwYWJhc2VBZG1pbiIsImdlbmVyYXRlQnVybWVzZUNvbnRlbnQiLCJzYXZlU2Nob2xhcnNoaXAiLCJkYXRhIiwib3B0aW9ucyIsImluc2VydGVkIiwiZXJyb3IiLCJpbnNlcnRFcnJvciIsImZyb20iLCJpbnNlcnQiLCJpc19wdWJsaXNoZWQiLCJhaV9nZW5lcmF0ZWQiLCJhaV9wcm9jZXNzZWQiLCJzZWxlY3QiLCJzaW5nbGUiLCJpZCIsIm1lc3NhZ2UiLCJidXJtZXNlIiwibmFtZSIsImNvdW50cnkiLCJsZXZlbCIsInJlcXVpcmVtZW50cyIsImNvdmVycyIsImRlYWRsaW5lIiwidXBkYXRlRXJyb3IiLCJ1cGRhdGUiLCJlcSIsImNvbnNvbGUiLCJlcnIiLCJFcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/save-scholarship.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase.ts":
/*!*************************!*\
  !*** ./lib/supabase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase),\n/* harmony export */   supabaseAdmin: () => (/* binding */ supabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n\nconst supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;\nconst supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;\nconst supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\n// Public client (frontend — respects RLS, reads published only)\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n// Admin client (backend API routes — bypasses RLS, full access)\nconst supabaseAdmin = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseServiceKey, {\n    auth: {\n        persistSession: false\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW9EO0FBRXBELE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0Msd0JBQXdCO0FBQ3hELE1BQU1DLGtCQUFrQkgsUUFBUUMsR0FBRyxDQUFDRyw2QkFBNkI7QUFDakUsTUFBTUMscUJBQXFCTCxRQUFRQyxHQUFHLENBQUNLLHlCQUF5QjtBQUVoRSxnRUFBZ0U7QUFDekQsTUFBTUMsV0FBV1QsbUVBQVlBLENBQUNDLGFBQWFJLGlCQUFnQjtBQUVsRSxnRUFBZ0U7QUFDekQsTUFBTUssZ0JBQWdCVixtRUFBWUEsQ0FBQ0MsYUFBYU0sb0JBQW9CO0lBQ3pFSSxNQUFNO1FBQUVDLGdCQUFnQjtJQUFNO0FBQ2hDLEdBQUUiLCJzb3VyY2VzIjpbIi9Vc2Vycy90aGloYWV1bmcvbXlhbi1zY2hvbGFyL2xpYi9zdXBhYmFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnXG5cbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIVxuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkhXG5jb25zdCBzdXBhYmFzZVNlcnZpY2VLZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIVxuXG4vLyBQdWJsaWMgY2xpZW50IChmcm9udGVuZCDigJQgcmVzcGVjdHMgUkxTLCByZWFkcyBwdWJsaXNoZWQgb25seSlcbmV4cG9ydCBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VBbm9uS2V5KVxuXG4vLyBBZG1pbiBjbGllbnQgKGJhY2tlbmQgQVBJIHJvdXRlcyDigJQgYnlwYXNzZXMgUkxTLCBmdWxsIGFjY2VzcylcbmV4cG9ydCBjb25zdCBzdXBhYmFzZUFkbWluID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZVNlcnZpY2VLZXksIHtcbiAgYXV0aDogeyBwZXJzaXN0U2Vzc2lvbjogZmFsc2UgfVxufSlcbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJzdXBhYmFzZUFub25LZXkiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsInN1cGFiYXNlU2VydmljZUtleSIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJzdXBhYmFzZSIsInN1cGFiYXNlQWRtaW4iLCJhdXRoIiwicGVyc2lzdFNlc3Npb24iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fscholarships%2Froute&page=%2Fapi%2Fscholarships%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fscholarships%2Froute.ts&appDir=%2FUsers%2Fthihaeung%2Fmyan-scholar%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fthihaeung%2Fmyan-scholar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fscholarships%2Froute&page=%2Fapi%2Fscholarships%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fscholarships%2Froute.ts&appDir=%2FUsers%2Fthihaeung%2Fmyan-scholar%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fthihaeung%2Fmyan-scholar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_thihaeung_myan_scholar_app_api_scholarships_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/scholarships/route.ts */ \"(rsc)/./app/api/scholarships/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/scholarships/route\",\n        pathname: \"/api/scholarships\",\n        filename: \"route\",\n        bundlePath: \"app/api/scholarships/route\"\n    },\n    resolvedPagePath: \"/Users/thihaeung/myan-scholar/app/api/scholarships/route.ts\",\n    nextConfigOutput,\n    userland: _Users_thihaeung_myan_scholar_app_api_scholarships_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzY2hvbGFyc2hpcHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnNjaG9sYXJzaGlwcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnNjaG9sYXJzaGlwcyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnRoaWhhZXVuZyUyRm15YW4tc2Nob2xhciUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZ0aGloYWV1bmclMkZteWFuLXNjaG9sYXImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ1c7QUFDeEY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy90aGloYWV1bmcvbXlhbi1zY2hvbGFyL2FwcC9hcGkvc2Nob2xhcnNoaXBzL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zY2hvbGFyc2hpcHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zY2hvbGFyc2hpcHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3NjaG9sYXJzaGlwcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy90aGloYWV1bmcvbXlhbi1zY2hvbGFyL2FwcC9hcGkvc2Nob2xhcnNoaXBzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fscholarships%2Froute&page=%2Fapi%2Fscholarships%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fscholarships%2Froute.ts&appDir=%2FUsers%2Fthihaeung%2Fmyan-scholar%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fthihaeung%2Fmyan-scholar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:https":
/*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/promises":
/*!***************************************!*\
  !*** external "node:stream/promises" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/promises");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/google-auth-library","vendor-chunks/@supabase","vendor-chunks/ws","vendor-chunks/gaxios","vendor-chunks/gcp-metadata","vendor-chunks/jws","vendor-chunks/retry","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/@google","vendor-chunks/safe-buffer","vendor-chunks/p-retry","vendor-chunks/jwa","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fscholarships%2Froute&page=%2Fapi%2Fscholarships%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fscholarships%2Froute.ts&appDir=%2FUsers%2Fthihaeung%2Fmyan-scholar%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fthihaeung%2Fmyan-scholar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();