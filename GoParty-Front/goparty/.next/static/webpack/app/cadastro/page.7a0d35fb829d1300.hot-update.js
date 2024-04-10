"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/cadastro/page",{

/***/ "(app-pages-browser)/./src/resources/usuario/usuario.service.ts":
/*!**************************************************!*\
  !*** ./src/resources/usuario/usuario.service.ts ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useAuth: function() { return /* binding */ useAuth; }\n/* harmony export */ });\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jwt-decode */ \"(app-pages-browser)/./node_modules/jwt-decode/build/esm/index.js\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/next/dist/build/polyfills/process.js\");\n\nclass AuthService {\n    async authenticate(credentials) {\n        const response = await fetch(this.baseURL + \"/auth\", {\n            method: \"POST\",\n            body: JSON.stringify(credentials),\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n        if (response.status == 401) {\n            throw new Error(\"User or password are incorrect!\");\n        }\n        return await response.json();\n    }\n    async save(user) {\n        const response = await fetch(this.baseURL, {\n            method: \"POST\",\n            body: JSON.stringify(user),\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n        if (response.status == 409) {\n            const responseError = await response.json();\n            throw new Error(responseError.error);\n        }\n    }\n    initSession(token) {\n        if (token.accessToken) {\n            const decodedToken = jwt_decode__WEBPACK_IMPORTED_MODULE_0__(token.accessToken);\n            const userSessionToken = {\n                accessToken: token.accessToken,\n                username: decodedToken.username,\n                senha: decodedToken.senha,\n                expiration: decodedToken.exp\n            };\n            this.setUserSession(userSessionToken);\n        }\n    }\n    setUserSession(userSessionToken) {\n        try {\n            localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSessionToken));\n        } catch (error) {}\n    }\n    getUserSession() {\n        try {\n            const authString = localStorage.getItem(AuthService.AUTH_PARAM);\n            if (!authString) {\n                return null;\n            }\n            const token = JSON.parse(authString);\n            return token;\n        } catch (error) {\n            return null;\n        }\n    }\n    isSessionValid() {\n        const userSession = this.getUserSession();\n        if (!userSession) {\n            return false;\n        }\n        const expiration = userSession.expiration;\n        if (expiration) {\n            const expirationDateInMillis = expiration * 1000;\n            return new Date() < new Date(expirationDateInMillis);\n        }\n        return false;\n    }\n    invalidateSession() {\n        try {\n            localStorage.removeItem(AuthService.AUTH_PARAM);\n        } catch (error) {}\n    }\n    constructor(){\n        this.baseURL = process.env.NEXT_PUBLIC_API_URL + \"/v1/users\";\n    }\n}\nAuthService.AUTH_PARAM = \"_auth\";\nconst useAuth = ()=>new AuthService();\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9yZXNvdXJjZXMvdXN1YXJpby91c3VhcmlvLnNlcnZpY2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWtDO0FBR2xDLE1BQU1DO0lBSUYsTUFBTUMsYUFBYUMsV0FBd0IsRUFBeUI7UUFDaEUsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLElBQUksQ0FBQ0MsT0FBTyxHQUFHLFNBQVM7WUFDakRDLFFBQVE7WUFDUkMsTUFBTUMsS0FBS0MsU0FBUyxDQUFDUDtZQUNyQlEsU0FBUztnQkFDTCxnQkFBZ0I7WUFDcEI7UUFDSjtRQUVBLElBQUdQLFNBQVNRLE1BQU0sSUFBSSxLQUFJO1lBQ3RCLE1BQU0sSUFBSUMsTUFBTTtRQUNwQjtRQUVBLE9BQU8sTUFBTVQsU0FBU1UsSUFBSTtJQUM5QjtJQUVBLE1BQU1DLEtBQUtDLElBQWEsRUFBa0I7UUFDdEMsTUFBTVosV0FBVyxNQUFNQyxNQUFNLElBQUksQ0FBQ0MsT0FBTyxFQUFFO1lBQ3ZDQyxRQUFRO1lBQ1JDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQ007WUFDckJMLFNBQVM7Z0JBQ0wsZ0JBQWdCO1lBQ3BCO1FBQ0o7UUFFQSxJQUFHUCxTQUFTUSxNQUFNLElBQUksS0FBSTtZQUN0QixNQUFNSyxnQkFBZ0IsTUFBTWIsU0FBU1UsSUFBSTtZQUN6QyxNQUFNLElBQUlELE1BQU1JLGNBQWNDLEtBQUs7UUFDdkM7SUFDSjtJQUVBQyxZQUFZQyxLQUFrQixFQUFDO1FBQzNCLElBQUdBLE1BQU1DLFdBQVcsRUFBQztZQUNqQixNQUFNQyxlQUFvQnRCLHVDQUFHQSxDQUFDb0IsTUFBTUMsV0FBVztZQUUvQyxNQUFNRSxtQkFBcUM7Z0JBQ3ZDRixhQUFhRCxNQUFNQyxXQUFXO2dCQUM5QkcsVUFBVUYsYUFBYUUsUUFBUTtnQkFDL0JDLE9BQU9ILGFBQWFHLEtBQUs7Z0JBQ3pCQyxZQUFZSixhQUFhSyxHQUFHO1lBQ2hDO1lBRUEsSUFBSSxDQUFDQyxjQUFjLENBQUNMO1FBQ3hCO0lBQ0o7SUFFQUssZUFBZUwsZ0JBQWtDLEVBQUM7UUFDOUMsSUFBRztZQUNDTSxhQUFhQyxPQUFPLENBQUM3QixZQUFZOEIsVUFBVSxFQUFFdEIsS0FBS0MsU0FBUyxDQUFDYTtRQUNoRSxFQUFDLE9BQU1MLE9BQU0sQ0FBQztJQUNsQjtJQUVBYyxpQkFBMkM7UUFDdkMsSUFBRztZQUNDLE1BQU1DLGFBQWFKLGFBQWFLLE9BQU8sQ0FBQ2pDLFlBQVk4QixVQUFVO1lBQzlELElBQUcsQ0FBQ0UsWUFBVztnQkFDWCxPQUFPO1lBQ1g7WUFFQSxNQUFNYixRQUEwQlgsS0FBSzBCLEtBQUssQ0FBQ0Y7WUFDM0MsT0FBT2I7UUFDWCxFQUFDLE9BQU1GLE9BQU07WUFDVCxPQUFPO1FBQ1g7SUFDSjtJQUVBa0IsaUJBQTJCO1FBQ3ZCLE1BQU1DLGNBQXVDLElBQUksQ0FBQ0wsY0FBYztRQUNoRSxJQUFHLENBQUNLLGFBQVk7WUFDWixPQUFPO1FBQ1g7UUFFQSxNQUFNWCxhQUFpQ1csWUFBWVgsVUFBVTtRQUM3RCxJQUFHQSxZQUFXO1lBQ1YsTUFBTVkseUJBQXlCWixhQUFhO1lBQzVDLE9BQU8sSUFBSWEsU0FBUyxJQUFJQSxLQUFLRDtRQUNqQztRQUVBLE9BQU87SUFDWDtJQUVBRSxvQkFBMEI7UUFDdEIsSUFBRztZQUNDWCxhQUFhWSxVQUFVLENBQUN4QyxZQUFZOEIsVUFBVTtRQUNsRCxFQUFDLE9BQU1iLE9BQU0sQ0FBQztJQUNsQjs7YUF4RkFaLFVBQWtCb0MsT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDQyxtQkFBbUIsR0FBRzs7QUEwRnhEO0FBM0ZNM0MsWUFFSzhCLGFBQXFCO0FBMkZ6QixNQUFNYyxVQUFVLElBQU0sSUFBSTVDLGNBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3Jlc291cmNlcy91c3VhcmlvL3VzdWFyaW8uc2VydmljZS50cz9jOTVkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGp3dCBmcm9tICdqd3QtZGVjb2RlJztcclxuaW1wb3J0IHsgQWNjZXNzVG9rZW4sIENyZWRlbnRpYWxzLCBVc2VyU2Vzc2lvblRva2VuLCBVc3VhcmlvIH0gZnJvbSAnLi91c3VhcmlvLnJlc291cmNlJztcclxuXHJcbmNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuICAgIGJhc2VVUkw6IHN0cmluZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9VUkwgKyAnL3YxL3VzZXJzJztcclxuICAgIHN0YXRpYyBBVVRIX1BBUkFNOiBzdHJpbmcgPSBcIl9hdXRoXCI7XHJcblxyXG4gICAgYXN5bmMgYXV0aGVudGljYXRlKGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscykgOiBQcm9taXNlPEFjY2Vzc1Rva2VuPiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLmJhc2VVUkwgKyBcIi9hdXRoXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWxzKSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT0gNDAxKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlciBvciBwYXNzd29yZCBhcmUgaW5jb3JyZWN0IVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2F2ZSh1c2VyOiBVc3VhcmlvKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godGhpcy5iYXNlVVJMLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT0gNDA5KXtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VFcnJvciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlRXJyb3IuZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0U2Vzc2lvbih0b2tlbjogQWNjZXNzVG9rZW4pe1xyXG4gICAgICAgIGlmKHRva2VuLmFjY2Vzc1Rva2VuKXtcclxuICAgICAgICAgICAgY29uc3QgZGVjb2RlZFRva2VuOiBhbnkgPSBqd3QodG9rZW4uYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgdXNlclNlc3Npb25Ub2tlbjogVXNlclNlc3Npb25Ub2tlbiA9IHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiB0b2tlbi5hY2Nlc3NUb2tlbixcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBkZWNvZGVkVG9rZW4udXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBzZW5oYTogZGVjb2RlZFRva2VuLnNlbmhhLFxyXG4gICAgICAgICAgICAgICAgZXhwaXJhdGlvbjogZGVjb2RlZFRva2VuLmV4cFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFVzZXJTZXNzaW9uKHVzZXJTZXNzaW9uVG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VyU2Vzc2lvbih1c2VyU2Vzc2lvblRva2VuOiBVc2VyU2Vzc2lvblRva2VuKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEF1dGhTZXJ2aWNlLkFVVEhfUEFSQU0sIEpTT04uc3RyaW5naWZ5KHVzZXJTZXNzaW9uVG9rZW4pKTtcclxuICAgICAgICB9Y2F0Y2goZXJyb3Ipe31cclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VyU2Vzc2lvbigpIDogVXNlclNlc3Npb25Ub2tlbiB8IG51bGwge1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgY29uc3QgYXV0aFN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEF1dGhTZXJ2aWNlLkFVVEhfUEFSQU0pO1xyXG4gICAgICAgICAgICBpZighYXV0aFN0cmluZyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9rZW46IFVzZXJTZXNzaW9uVG9rZW4gPSBKU09OLnBhcnNlKGF1dGhTdHJpbmcpO1xyXG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzU2Vzc2lvblZhbGlkKCkgOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB1c2VyU2Vzc2lvbjogVXNlclNlc3Npb25Ub2tlbiB8IG51bGwgPSB0aGlzLmdldFVzZXJTZXNzaW9uKCk7XHJcbiAgICAgICAgaWYoIXVzZXJTZXNzaW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXhwaXJhdGlvbjogbnVtYmVyIHwgdW5kZWZpbmVkID0gdXNlclNlc3Npb24uZXhwaXJhdGlvbjtcclxuICAgICAgICBpZihleHBpcmF0aW9uKXtcclxuICAgICAgICAgICAgY29uc3QgZXhwaXJhdGlvbkRhdGVJbk1pbGxpcyA9IGV4cGlyYXRpb24gKiAxMDAwO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKSA8IG5ldyBEYXRlKGV4cGlyYXRpb25EYXRlSW5NaWxsaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGludmFsaWRhdGVTZXNzaW9uKCk6IHZvaWQge1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oQXV0aFNlcnZpY2UuQVVUSF9QQVJBTSk7XHJcbiAgICAgICAgfWNhdGNoKGVycm9yKXt9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IG5ldyBBdXRoU2VydmljZSgpOyAiXSwibmFtZXMiOlsiand0IiwiQXV0aFNlcnZpY2UiLCJhdXRoZW50aWNhdGUiLCJjcmVkZW50aWFscyIsInJlc3BvbnNlIiwiZmV0Y2giLCJiYXNlVVJMIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwic3RhdHVzIiwiRXJyb3IiLCJqc29uIiwic2F2ZSIsInVzZXIiLCJyZXNwb25zZUVycm9yIiwiZXJyb3IiLCJpbml0U2Vzc2lvbiIsInRva2VuIiwiYWNjZXNzVG9rZW4iLCJkZWNvZGVkVG9rZW4iLCJ1c2VyU2Vzc2lvblRva2VuIiwidXNlcm5hbWUiLCJzZW5oYSIsImV4cGlyYXRpb24iLCJleHAiLCJzZXRVc2VyU2Vzc2lvbiIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJBVVRIX1BBUkFNIiwiZ2V0VXNlclNlc3Npb24iLCJhdXRoU3RyaW5nIiwiZ2V0SXRlbSIsInBhcnNlIiwiaXNTZXNzaW9uVmFsaWQiLCJ1c2VyU2Vzc2lvbiIsImV4cGlyYXRpb25EYXRlSW5NaWxsaXMiLCJEYXRlIiwiaW52YWxpZGF0ZVNlc3Npb24iLCJyZW1vdmVJdGVtIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJ1c2VBdXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/resources/usuario/usuario.service.ts\n"));

/***/ })

});