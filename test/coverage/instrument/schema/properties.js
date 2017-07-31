"use strict";
var __cov_zxm8OSglYsBq6owDuuWFcQ = (Function('return this'))();
if (!__cov_zxm8OSglYsBq6owDuuWFcQ.__coverage__) { __cov_zxm8OSglYsBq6owDuuWFcQ.__coverage__ = {}; }
__cov_zxm8OSglYsBq6owDuuWFcQ = __cov_zxm8OSglYsBq6owDuuWFcQ.__coverage__;
if (!(__cov_zxm8OSglYsBq6owDuuWFcQ['schema/properties.js'])) {
   __cov_zxm8OSglYsBq6owDuuWFcQ['schema/properties.js'] = {"path":"schema/properties.js","s":{"1":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":3,"column":0},"end":{"line":116,"column":2}}},"branchMap":{}};
}
__cov_zxm8OSglYsBq6owDuuWFcQ = __cov_zxm8OSglYsBq6owDuuWFcQ['schema/properties.js'];
__cov_zxm8OSglYsBq6owDuuWFcQ.s['1']++;module.exports={'productId':{'type':'string','required':true,'maxLength':8,'minlength':8},'title':{'type':'string','required':true,'minlength':5},'imagePath':{'type':'string','required':true},'price':{'type':'number','required':true,'minimum':1},'groupId':{'type':'string','required':true,'maxLength':8,'minlength':8},'merchantId':{'type':'string','required':true,'maxLength':8,'minlength':8},'GTIN':{'type':'string','required':true,'maxLength':10,'minlength':10},'currency':{'type':'string','required':true},'quantity':{'type':'integer','required':true,'min':1},'shippingPrice':{'type':'integer','required':true},'shippingMethods':{'type':'array','required':true,'items':{'type':'object','required':true,'properties':{'id':{'type':'integer','required':true},'methodName':{'type':'string','required':true},'price':{'type':'integer','required':true},'selected':{'type':'boolean','required':true}}}},'filters':{'type':'object','required':true,'items':{'type':'object','required':true}}};
