(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dff02cb0"],{"1daf":function(t,e,a){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var i=a("1d80"),r=a("5899"),n="["+r+"]",o=RegExp("^"+n+n+"*"),l=RegExp(n+n+"*$"),s=function(t){return function(e){var a=String(i(e));return 1&t&&(a=a.replace(o,"")),2&t&&(a=a.replace(l,"")),a}};t.exports={start:s(1),end:s(2),trim:s(3)}},7156:function(t,e,a){var i=a("861d"),r=a("d2bb");t.exports=function(t,e,a){var n,o;return r&&"function"==typeof(n=e.constructor)&&n!==a&&i(o=n.prototype)&&o!==a.prototype&&r(t,o),t}},"857a":function(t,e,a){var i=a("1d80"),r=/"/g;t.exports=function(t,e,a,n){var o=String(i(t)),l="<"+e;return""!==a&&(l+=" "+a+'="'+String(n).replace(r,"&quot;")+'"'),l+">"+o+"</"+e+">"}},"8b43":function(t,e,a){"use strict";a("1daf")},"91b6":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var i=a("4020");function r(t){return Object(i["b"])("/file/upload-file",t)}},9911:function(t,e,a){"use strict";var i=a("23e7"),r=a("857a"),n=a("af03");i({target:"String",proto:!0,forced:n("link")},{link:function(t){return r(this,"a","href",t)}})},a9e3:function(t,e,a){"use strict";var i=a("83ab"),r=a("da84"),n=a("94ca"),o=a("6eeb"),l=a("5135"),s=a("c6b6"),c=a("7156"),u=a("c04e"),d=a("d039"),f=a("7c73"),p=a("241c").f,m=a("06cf").f,b=a("9bf2").f,v=a("58a8").trim,g="Number",h=r[g],_=h.prototype,y=s(f(_))==g,k=function(t){var e,a,i,r,n,o,l,s,c=u(t,!1);if("string"==typeof c&&c.length>2)if(c=v(c),e=c.charCodeAt(0),43===e||45===e){if(a=c.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+c}for(n=c.slice(2),o=n.length,l=0;l<o;l++)if(s=n.charCodeAt(l),s<48||s>r)return NaN;return parseInt(n,i)}return+c};if(n(g,!h(" 0o1")||!h("0b1")||h("+0x1"))){for(var w,I=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof I&&(y?d((function(){_.valueOf.call(a)})):s(a)!=g)?c(new h(k(e)),a,I):k(e)},x=i?p(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),N=0;x.length>N;N++)l(h,w=x[N])&&!l(I,w)&&b(I,w,m(h,w));I.prototype=_,_.constructor=I,o(r,g,I)}},af03:function(t,e,a){var i=a("d039");t.exports=function(t){return i((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},d648:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"search-form"},[a("el-form",{attrs:{inline:!0,size:"small"}},[a("el-form-item",{attrs:{label:"位置"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{clearable:""},model:{value:t.searchForm.advert_type,callback:function(e){t.$set(t.searchForm,"advert_type",e)},expression:"searchForm.advert_type"}},t._l(t.typeOptions,(function(t){return a("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})})),1)],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{clearable:""},model:{value:t.searchForm.audit_status,callback:function(e){t.$set(t.searchForm,"audit_status",e)},expression:"searchForm.audit_status"}},t._l(t.auditOptions,(function(t){return a("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")]),a("el-button",{attrs:{icon:"el-icon-refresh-left"},on:{click:t.reset}},[t._v("重置")])],1)],1)],1),a("div",{staticClass:"table-view"},[a("div",{staticClass:"add-view"},[a("el-button",{attrs:{icon:"el-icon-plus",type:"primary",plain:""},on:{click:function(e){return t.openDialog("add")}}},[t._v("新增")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,align:"center"}},[a("el-table-column",{attrs:{prop:"id",label:"编号"}}),a("el-table-column",{attrs:{prop:"advert_name",label:"广告名称"}}),a("el-table-column",{attrs:{prop:"advert_type_name",label:"位置"}}),a("el-table-column",{attrs:{label:"广告图","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-image",{staticClass:"table-image",attrs:{fit:"cover",src:e.row.imgList,"preview-src-list":t._f("toArray")(e.row.imgList)}})]}}])}),a("el-table-column",{attrs:{prop:"link",label:"路径","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"disable_status_name",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[2===e.row.disable_status?a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.changeStatus(e.row.id,1,e.row)}}},[t._v("停用 ")]):a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.changeStatus(e.row.id,2,e.row)}}},[t._v(" 启用 ")])]}}])}),a("el-table-column",{attrs:{prop:"note",label:"备注","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"操作",width:"200px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(a){return t.openDialog("edit",e.row)}}},[t._v(" 编辑 ")]),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(a){return t.del(e.row.id)}}},[t._v("删除 ")])]}}])})],1)],1),a("el-pagination",{staticClass:"page",attrs:{background:"",layout:"total,prev, pager, next",total:t.total},on:{"current-change":t.currentChange}}),a("el-dialog",{attrs:{title:"add"===t.type?"添加广告":"编辑广告",visible:t.dialogVisible,width:"400px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"form",attrs:{size:"small",model:t.form,"label-width":"60px",rules:t.rules}},[a("el-form-item",{attrs:{label:"标题",prop:"advert_name"}},[a("el-input",{attrs:{placeholder:"标题"},model:{value:t.form.advert_name,callback:function(e){t.$set(t.form,"advert_name",e)},expression:"form.advert_name"}})],1),a("el-form-item",{attrs:{label:"位置",prop:"advert_type"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{clearable:""},model:{value:t.form.advert_type,callback:function(e){t.$set(t.form,"advert_type",e)},expression:"form.advert_type"}},t._l(t.typeOptions,(function(t){return a("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})})),1)],1),a("el-form-item",{attrs:{label:"广告",prop:"imgList"}},[a("upload",{attrs:{limit:1,"file-list":t._f("toArray")(t.form.imgList.url)},on:{success:t.upload,del:t.delImage}})],1),a("el-form-item",{attrs:{label:"跳转"}},[a("el-input",{attrs:{placeholder:"跳转"},model:{value:t.form.link,callback:function(e){t.$set(t.form,"link",e)},expression:"form.link"}})],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{placeholder:"备注"},model:{value:t.form.note,callback:function(e){t.$set(t.form,"note",e)},expression:"form.note"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.submit}},[t._v("确 定")])],1)],1)],1)},r=[],n=(a("9911"),a("decf")),o=a("4020");function l(t){return Object(o["a"])("advert/add",t,!0)}function s(t){return Object(o["a"])("advert/update",t,!0)}function c(t){return Object(o["a"])("advert/list",t,!0)}function u(t){return Object(o["a"])("advert/del/",t,!0)}function d(){return Object(o["a"])("basic-data/synchronize-basic",{})}function f(t){return Object(o["a"])("advert/audit",t,!0)}var p={name:"index",components:{Upload:n["a"]},data:function(){return{tableData:[],type:"add",dialogVisible:!1,form:{advert_name:"",advert_type:"",link:"",imgList:{},note:""},rules:{advert_name:[{required:!0,message:"请输入"}],advert_type:[{required:!0,message:"请选择"}],imgList:[{required:!0,message:"请上传"}]},searchForm:{disable_status:"",advert_type:""},pageNumber:1,typeOptions:[],auditOptions:[],editId:0,total:0}},mounted:function(){var t=this;this.getData(),d().then((function(e){t.typeOptions=e.list.advertType,t.auditOptions=e.list.disableStatus}))},methods:{changeStatus:function(t,e,a){var i=this;f({id:t,disable_status:e}).then((function(){a.disable_status=e;var t=1===e?"已启用":"已停用";i.$message.success(t)}))},currentChange:function(t){this.pageNumber=t,this.getData()},search:function(){this.pageNumber=1,this.getData()},reset:function(){this.searchForm={disable_status:"",advert_type:""}},del:function(t){var e=this;this.$confirm("确认删除该广告位?").then((function(){u({id:t}).then((function(){e.getData()}))}))},openDialog:function(t,e){this.type=t,this.dialogVisible=!0,"add"===t?this.form={advert_name:"",advert_type:"",link:"",imgList:{},note:""}:(this.editId=e.id,this.form={advert_name:e.advert_name,advert_type:e.advert_type+"",link:e.link,imgList:{path:e.img,url:e.imgList},note:e.note})},submit:function(){var t=this;this.$refs["form"].validate((function(e){if(e){var a={advert_name:t.form.advert_name,advert_type:t.form.advert_type,link:t.form.link,imgList:t.form.imgList.url,img:t.form.imgList.path,note:t.form.note};"add"===t.type&&l(a).then((function(){t.$message.success("添加成功"),t.dialogVisible=!1,t.getData()})),"edit"===t.type&&(a.id=t.editId,s(a).then((function(){t.$message.success("修改成功"),t.dialogVisible=!1,t.getData()})))}}))},getData:function(){var t=this,e={disable_status:this.searchForm.audit_status,advert_type:this.searchForm.advert_type,page:this.pageNumber,pageSize:10};c(e).then((function(e){t.tableData=e.list,t.total=e.data.count}))},upload:function(t){this.form.imgList=t},delImage:function(){this.form.imgList={}}}},m=p,b=a("2877"),v=Object(b["a"])(m,i,r,!1,null,"4c9deaf0",null);e["default"]=v.exports},decf:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"upload-view"},[t._l(t.fileList,(function(e,i){return a("div",{key:i,class:["lk-upload-image-container",0!==i?"margin-left":""]},[a("el-image",{staticClass:"lk-upload-image",attrs:{"preview-src-list":t.fileList,src:e,fit:"cover"}}),a("i",{staticClass:"el-icon-remove del-image",on:{click:function(e){return t.delImage(i)}}})],1)})),t.limit>t.fileList.length?a("div",{class:["lk-upload",t.fileList.length>0?"margin-left":""],on:{click:t.handleClick}},[a("input",{ref:"uploadImage",staticClass:"lk-upload-input",attrs:{type:"file",accept:".jpg, .jpeg, .png, .gif"},on:{change:t.doUpload}})]):t._e()],2)},r=[],n=(a("a9e3"),a("91b6")),o={props:{fileList:{type:Array,default:function(){return[]}},limit:{type:Number,default:1}},methods:{delImage:function(t){this.$emit("del",t)},handleClick:function(){this.$refs.uploadImage.click()},doUpload:function(t){var e=this,a=t.target.files[0];Object(n["a"])(a).then((function(t){e.$message.success("上传成功"),e.$refs.uploadImage.value=null,e.$emit("success",t)}))}}},l=o,s=(a("8b43"),a("2877")),c=Object(s["a"])(l,i,r,!1,null,"0725db80",null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-dff02cb0.21008df7.js.map