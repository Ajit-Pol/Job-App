"use strict";(self.webpackChunkJobApp=self.webpackChunkJobApp||[]).push([[349],{9349:(J,m,n)=>{n.r(m),n.d(m,{NewJobComponent:()=>v});var t=n(4341);class p{constructor(){this.position=null,this.company=null,this.description=null,this.location=null,this.type=null,this.status=null,this.vacancy=null,this.exprience=null,this.requirement=null}}var r=n(5694),d=n(177),e=n(4438),h=n(2845),c=n(4963),b=n(2130),u=n(6554);const F=a=>({disabled:a});let v=(()=>{class a{constructor(i,o,s,l,f){this.jobService=i,this.activatedRoute=o,this.toasterService=s,this.router=l,this.spinner=f,this.formTitle="Add New Job",this.editJobUId=null}ngOnInit(){this.editJobUId=this.activatedRoute.snapshot.paramMap.get("id"),this.formTitle=this.editJobUId?"Edit Job Details":"Add New Job",this.createForm(),this.getSingleJob()}createForm(){this.addJobForm=new t.gE({position:new t.MJ("",[t.k0.required]),company:new t.MJ("",[t.k0.required]),description:new t.MJ("",[t.k0.required]),location:new t.MJ("",[t.k0.required]),type:new t.MJ("Full-time",[t.k0.required]),status:new t.MJ("Pending",[t.k0.required]),vacancy:new t.MJ("",[t.k0.required,t.k0.min(0),t.k0.max(99)]),exprience:new t.MJ("",[t.k0.required,t.k0.min(0),t.k0.max(99)]),requirement:new t.MJ("",[t.k0.required])})}getSingleJob(){this.editJobUId&&(this.spinner.show(),this.jobService.getJob(this.editJobUId).subscribe(i=>{if(i){let o=i.job;this.addJobForm.patchValue({position:o.position,company:o.company,description:o.description,location:o.location,type:o.type,status:o.status,vacancy:o.vacancy,exprience:o.exprience,requirement:o.requirement}),this.spinner.hide()}}))}addNewJob(){let i=new p;i.company=this.addJobForm?.value?.company?.trim(),i.position=this.addJobForm?.value?.position?.trim(),i.description=this.addJobForm?.value?.description?.trim(),i.location=this.addJobForm?.value?.location?.trim(),i.type=this.addJobForm?.value?.type?.trim(),i.status=this.addJobForm?.value?.status?.trim(),i.exprience=this.addJobForm?.value?.exprience,i.vacancy=this.addJobForm?.value?.vacancy,i.requirement=this.addJobForm?.value?.requirement?.trim(),this.spinner.show(),this.editJobUId?this.jobService.editJob(this.editJobUId,i).subscribe(o=>{o?(this.addJobForm.reset(),this.toasterService.showToaster(r.NH.success,r.dF.save),this.router.navigateByUrl("/my-jobs")):this.toasterService.showToaster(r.NH.warning,r.dF.errorMsg),this.spinner.hide()},()=>{this.spinner.hide()}):this.jobService.saveNewJob(i).subscribe(o=>{o?(this.toasterService.showToaster(r.NH.success,r.dF.save),this.addJobForm.reset(),this.router.navigateByUrl("/my-jobs")):this.toasterService.showToaster(r.NH.warning,r.dF.errorMsg),this.spinner.hide()},()=>{this.spinner.hide()})}onClickCancel(){this.router.navigateByUrl("/my-jobs")}static{this.\u0275fac=function(o){return new(o||a)(e.rXU(h.L),e.rXU(c.nX),e.rXU(b.W),e.rXU(c.Ix),e.rXU(u.ex))}}static{this.\u0275cmp=e.VBU({type:a,selectors:[["app-new-job"]],standalone:!0,features:[e.aNF],decls:70,vars:9,consts:[[1,"container","my-5"],[1,"card-body","p-4"],[1,"mb-4","heading_fw"],[3,"formGroup"],[1,"mb-3"],["for","position",1,"form-label"],[1,"text-danger"],["type","text","id","position","placeholder","Enter the job position","formControlName","position",1,"form-control",3,"maxlength"],["for","companyName",1,"form-label"],["type","text","id","companyName","placeholder","Enter the company name","formControlName","company",1,"form-control",3,"maxlength"],["for","description",1,"form-label"],["id","description","rows","5","placeholder","Provide a job description","formControlName","description",1,"form-control",3,"maxlength"],["for","requirement",1,"form-label"],["id","requirement","rows","5","placeholder","Enter the key knowledge, skills, and abilities required for the role.","formControlName","requirement",1,"form-control",3,"maxlength"],["for","exprience-required",1,"form-label"],["type","number","min","0","max","99","id","exprience-required","placeholder","Enter the minimum years of experience for this position.","formControlName","exprience",1,"form-control"],["for","vacancy",1,"form-label"],["type","number","min","0","max","99","id","vacancy","placeholder","Enter the number of vacancies available for this role.","formControlName","vacancy",1,"form-control"],["for","location",1,"form-label"],["type","text","id","location","placeholder","Enter the job location","formControlName","location",1,"form-control"],["for","jobType",1,"form-label"],["id","jobType","formControlName","type",1,"form-select"],["value","","disabled","","selected",""],["value","Full-time"],["value","Part-time"],["value","Remote"],["value","Freelance"],["value","Internship"],[1,"d-grid","gap-2"],["type","button",1,"btn","btn-primary",3,"click","ngClass"],["type","button",1,"btn","btn-secondary",3,"click"]],template:function(o,s){1&o&&(e.j41(0,"div",0)(1,"div",1)(2,"h2",2),e.EFF(3),e.k0s(),e.j41(4,"form",3)(5,"div",4)(6,"label",5),e.EFF(7,"Position "),e.j41(8,"span",6),e.EFF(9,"*"),e.k0s()(),e.nrm(10,"input",7),e.k0s(),e.j41(11,"div",4)(12,"label",8),e.EFF(13,"Company Name "),e.j41(14,"span",6),e.EFF(15,"*"),e.k0s()(),e.nrm(16,"input",9),e.k0s(),e.j41(17,"div",4)(18,"label",10),e.EFF(19,"Job Description "),e.j41(20,"span",6),e.EFF(21,"*"),e.k0s()(),e.nrm(22,"textarea",11),e.k0s(),e.j41(23,"div",4)(24,"label",12),e.EFF(25,"Job Requirement "),e.j41(26,"span",6),e.EFF(27,"*"),e.k0s()(),e.nrm(28,"textarea",13),e.k0s(),e.j41(29,"div",4)(30,"label",14),e.EFF(31,"Required Experience "),e.j41(32,"span",6),e.EFF(33,"*"),e.k0s()(),e.nrm(34,"input",15),e.k0s(),e.j41(35,"div",4)(36,"label",16),e.EFF(37,"Vacancies Available "),e.j41(38,"span",6),e.EFF(39,"*"),e.k0s()(),e.nrm(40,"input",17),e.k0s(),e.j41(41,"div",4)(42,"label",18),e.EFF(43,"Location "),e.j41(44,"span",6),e.EFF(45,"*"),e.k0s()(),e.nrm(46,"input",19),e.k0s(),e.j41(47,"div",4)(48,"label",20),e.EFF(49,"Job Type "),e.j41(50,"span",6),e.EFF(51,"*"),e.k0s()(),e.j41(52,"select",21)(53,"option",22),e.EFF(54,"Choose job type"),e.k0s(),e.j41(55,"option",23),e.EFF(56,"Full-time"),e.k0s(),e.j41(57,"option",24),e.EFF(58,"Part-time"),e.k0s(),e.j41(59,"option",25),e.EFF(60,"Remote"),e.k0s(),e.j41(61,"option",26),e.EFF(62,"Freelance"),e.k0s(),e.j41(63,"option",27),e.EFF(64,"Internship"),e.k0s()()(),e.j41(65,"div",28)(66,"button",29),e.bIt("click",function(){return s.addNewJob()}),e.EFF(67,"Save Job"),e.k0s(),e.j41(68,"button",30),e.bIt("click",function(){return s.onClickCancel()}),e.EFF(69,"Cancel"),e.k0s()()()()()),2&o&&(e.R7$(3),e.JRh(s.formTitle),e.R7$(),e.Y8G("formGroup",s.addJobForm),e.R7$(6),e.Y8G("maxlength",100),e.R7$(6),e.Y8G("maxlength",50),e.R7$(6),e.Y8G("maxlength",500),e.R7$(6),e.Y8G("maxlength",500),e.R7$(38),e.Y8G("ngClass",e.eq3(7,F,null==s.addJobForm?null:s.addJobForm.invalid)))},dependencies:[t.X1,t.qT,t.xH,t.y7,t.me,t.Q0,t.wz,t.BC,t.cb,t.tU,t.VZ,t.zX,t.j4,t.JD,d.MD,d.YU],styles:[".card_r[_ngcontent-%COMP%]{border-radius:10px}.heading_fw[_ngcontent-%COMP%]{font-weight:600}"]})}}return a})()}}]);