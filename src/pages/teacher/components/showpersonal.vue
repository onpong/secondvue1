<template>
<div class="personal">
    <div class="personal-title">
        <span  class="personal-title-icon"></span>
        <span  class="personal-title-text">我的信息</span>
    </div>
    <div class="personal-form">
        <el-form ref="form" :model="form" label-width="80px">


            <el-form-item label="姓名" placeholder="请输入内容" >
                {{form.name}}
            </el-form-item>
            <el-form-item label="专业" >
                <el-input v-model="form.specialty" class="el-input1" style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="学历" placeholder="请输入学历">
                {{form.education}}
            </el-form-item>
            <el-form-item label="性别" >
                {{form.gender==1 ? "男":"女"}}
            </el-form-item>
            <el-form-item label="用户名" placeholder="请输入内容" >
                {{form.username}}
            </el-form-item>
            <el-form-item label="自我介绍">
              <el-upload
                                action="#"
                                class="avatar-uploader"
                                name="picture"
                                 :show-file-list="false"
                                :http-request="Upload"
                                :before-upload="beforeUpload"     
                                >
                        </el-upload>
                        <el-row v-loading="quillUpdateImg"></el-row>
                <quill-editor 
                 class="editor"
                ref="myQuillEditor"
              v-model="form.description"
              :options="editorOption"
              @change="onEditorChange($event)">
          </quill-editor>
     
            </el-form-item>
            <el-form-item>
                <el-button :plain="true" type="primary" @click="save()">立即保存</el-button>
            </el-form-item>
</el-form>
    </div>
    <div class="personal-pic">
        
                <el-image  v-if="this.form.pic" class="head-img" :src="this.form.pic"  ></el-image>
                <!--<el-upload class="img-btn" action="#"
    :show-file-list="false"  :before-upload="beforeAvatarUpload"
    :http-request="uploadImg">
    <el-button type="success" plain round size="mini" class="img-button">更改头像</el-button></el-upload>
            -->
        
    </div>
</div>
</template>
<script >
const titleConfig=[
		    {Choice:'.ql-bold',title:'加粗'},
		    {Choice:'.ql-italic',title:'斜体'},
		    {Choice:'.ql-underline',title:'下划线'},
		    {Choice:'.ql-header',title:'段落格式'},
		    {Choice:'.ql-strike',title:'删除线'},
		    {Choice:'.ql-blockquote',title:'块引用'},
		    {Choice:'.ql-code',title:'插入代码'},
		    {Choice:'.ql-code-block',title:'插入代码段'},
		    {Choice:'.ql-font',title:'字体'},
		    {Choice:'.ql-size',title:'字体大小'},
		    {Choice:'.ql-list[value="ordered"]',title:'编号列表'},
		    {Choice:'.ql-list[value="bullet"]',title:'项目列表'},
		    {Choice:'.ql-direction',title:'文本方向'},
		    {Choice:'.ql-header[value="1"]',title:'h1'},
		    {Choice:'.ql-header[value="2"]',title:'h2'},
		    {Choice:'.ql-align',title:'对齐方式'},
		    {Choice:'.ql-color',title:'字体颜色'},
		    {Choice:'.ql-background',title:'背景颜色'},
		    {Choice:'.ql-image',title:'图像'},
		    {Choice:'.ql-video',title:'视频'},
		    {Choice:'.ql-link',title:'添加链接'},
		    {Choice:'.ql-formula',title:'插入公式'},
		    {Choice:'.ql-clean',title:'清除字体格式'},
		    {Choice:'.ql-script[value="sub"]',title:'下标'},
		    {Choice:'.ql-script[value="super"]',title:'上标'},
		    {Choice:'.ql-indent[value="-1"]',title:'向左缩进'},
		    {Choice:'.ql-indent[value="+1"]',title:'向右缩进'},
		    {Choice:'.ql-header .ql-picker-label',title:'标题大小'},
		    {Choice:'.ql-header .ql-picker-item[data-value="1"]',title:'标题一'},
		    {Choice:'.ql-header .ql-picker-item[data-value="2"]',title:'标题二'},
		    {Choice:'.ql-header .ql-picker-item[data-value="3"]',title:'标题三'},
		    {Choice:'.ql-header .ql-picker-item[data-value="4"]',title:'标题四'},
		    {Choice:'.ql-header .ql-picker-item[data-value="5"]',title:'标题五'},
		    {Choice:'.ql-header .ql-picker-item[data-value="6"]',title:'标题六'},
		    {Choice:'.ql-header .ql-picker-item:last-child',title:'标准'},
		    {Choice:'.ql-size .ql-picker-item[data-value="small"]',title:'小号'},
		    {Choice:'.ql-size .ql-picker-item[data-value="large"]',title:'大号'},
		    {Choice:'.ql-size .ql-picker-item[data-value="huge"]',title:'超大号'},
		    {Choice:'.ql-size .ql-picker-item:nth-child(2)',title:'标准'},
		    {Choice:'.ql-align .ql-picker-item:first-child',title:'居左对齐'},
		    {Choice:'.ql-align .ql-picker-item[data-value="center"]',title:'居中对齐'},
		    {Choice:'.ql-align .ql-picker-item[data-value="right"]',title:'居右对齐'},
		    {Choice:'.ql-align .ql-picker-item[data-value="justify"]',title:'两端对齐'}
		];

    export default {
        name:"showpersonal",
        data(){
            return {  
                 serverUrl: 'http://47.98.235.117:1337/api/v1/user/picture',
                  header: {'Authorization':localStorage.getItem('token'),'Content-Type': 'multipart/form-data'},
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                        editorOption: {
         theme: 'snow',
      boundary: document.body, 
      modules: {
        toolbar: {
            container:[
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['link', 'image', ]
            ],
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
           
            }
            
        },
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            },
            imageDrop:true,
      },
    
      placeholder: 'Insert text here ...',
     
      },
                   
                        form: {
                            description: '',
                            pic: '',
                            specialty: '',
                            },
                            headUrl: '' ,
                        
            
            }
        },
         methods: {
             onEditorChange() {
      //内容改变事件
      this.$emit("input", this.form.description);
    },
             beforeUpload(res, file) {
                  this.quillUpdateImg = true
             },

           Upload (f) {
                let vm = this
                let quill0 = vm.$refs['myQuillEditor'].quill
                let header={'Authorization':localStorage.getItem('token'),'Content-Type': 'multipart/form-data'}
                let formdata = new FormData()
                formdata.append('picture', f.file)
                    this.$axios({
                    method:'put',
                    url:'api/v1/user/picture',
                    headers:header,
                    data:formdata,
                
                    
                    
                })
                .then((res)=>{
            let quillFwb = quill0
            let pathUrl = res.data.picUrl
            // 获取光标所在位置
            let length = quillFwb.getSelection().index
            // 插入图片，res为服务器返回的图片链接地址
            quillFwb.insertEmbed(length, 'image', pathUrl)
            // 调整光标到最后
            quillFwb.setSelection(length + 1)
            this.quillUpdateImg = false;
                        }).catch((error) => {
                            console.log(error)
                            this.quillUpdateImg = false;
        alert('错误');
          
		});
        },
        // 上传图片前的过滤
      
       
         save(){
                // 包装成list要求的对象
                //var p = {id:this.id, fleet_name: this.fleet_name,user_id:this.user_id,status:this.status, ctime: new Date()}
                //this.list.push(p);
                // 清空文本框中的数据
               let header={'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'}
               this.$axios({
							method:'put',
                            url:'api/v1/teacher',
                            headers:header,
							data:{
								'description':this.form.description,
                                'pic':this.form.pic,
                                'specialty':this.form.specialty
							
                        }})
                        .then((res)=>{
                            this.$message({
          message: '保存成功',
          type: 'success'
        });
     

                        }).catch((error) => {
        alert('错误');
          console.log(header);
		});						
						
        },
         },
      created(){
        this.$axios({
            methods:'get',
            url:'api/v1/teacher',
        headers:{

            'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'
        }
        }).then((res)=>{    
            console.log(res.data)
            this.form=res.data
        }).catch((error) => {
            console.log(error)
            alert('错误')
          
		});						
    },
    mounted() {
			 autotip:{
			      document.getElementsByClassName('ql-editor')[0].dataset.placeholder=''
			      for(let item of titleConfig){
			          let tip = document.querySelector('.quill-editor '+ item.Choice)
			          if (!tip) continue
			          tip.setAttribute('title',item.title)
			      }
			  }
		  },
    }

</script>
<style>
    .ql-editor{
        height:800px;
    }
</style>
<style scoped>

    .personal{
        width:100%;
        height:100%;
        position:relative;
    }
    .personal-title{
        height: 50px;
    padding-left: 30px;
    border-bottom: 1px solid #ddd
    }
        .el-form{
                text-align: left;
                
              

        }
        .personal-title-icon{
            float: left;
            width: 4px;
            height: 16px;
            margin-top: 18px;
            background-color: #00a1d6;
            border-radius: 4px;
        }
        .personal-title-text{
            float: left;
            margin: 15px 0 0 5px;
            color: #00a1d6;
            font-size: 14px;
            cursor: default;
            line-height: 25px;
        }
    .personal-form{
        padding:20px;
        width:70%
    }
        .el-input1{
            width:50%
        }
    .personal-pic{
        width:200px;
        height:200px;
        position:absolute;
        right:0px;
        top:50px;
        z-index:100;
        border: 1px dashed #d9d9d9;

    }
       .head-img{
           width:200px;
           height:200px
       }
       .img-btn{
            width:100px;
        height:100px;
        position:absolute;
        right:10px;
        top:200px;
        z-index:100;
        
       }
       .img-button{
           width:90px;
        height:30px;
        position:absolute;
        right:40px;
        top:10px;
        z-index:100;
        
       }


</style>