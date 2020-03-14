<template>
       <div class="teacher-details">
           <div class="teacher-details-title">
                <span  class="teacher-details-title-icon"></span>
                <span  class="teacher-details-title-text">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/courselist' }">课程列表</el-breadcrumb-item>
                        <el-breadcrumb-item>已创建课程</el-breadcrumb-item>
                        <el-breadcrumb-item>课程详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </span>
            </div>
           <div class="teacher-details-form">
                <el-form ref="form"  label-width="80px">
                          <el-form-item label="教师姓名:" placeholder="请输入内容" >
                              {{form.teacherName}}
                          </el-form-item>
                          <el-form-item label="专业:" >
                              {{form.specialty}}
                          </el-form-item>
                          <el-form-item label="性别:" >
                              {{form.gender==1 ? "男":"女"}}
                          </el-form-item>
                          <el-form-item label="学历:" placeholder="请输入内容" >
                              {{form.education}}
                          </el-form-item>
                          <el-form-item label="学院:" placeholder="请输入内容" >
                              {{form.academy}}
                          </el-form-item>
                          <el-form-item label="年级:" placeholder="请输入内容" >
                              {{form.grade}}
                          </el-form-item>
                          <el-form-item label="轮数:" placeholder="请输入内容" >
                              {{form.ground}}
                          </el-form-item>
                          <el-form-item label="自我介绍:">
                              <quill-editor 
                                    ref="editor1"
                                v-model="form.description"
                                :options="editorOption"
                                @focus="onEditorFocus($event)">
                            </quill-editor>
                          </el-form-item>
              </el-form>
          </div>
          <div class="personal-pic">
         <img  class="head-img" :src="form.pic" />
    </div>
        <div class="teacher-details-choosebtn">
            <el-button @click="handleClick4" type="primary" size="small">选择此课程</el-button>
        </div>
        
         
       </div>
</template>
<script >
    export default {
        name:"studentcourse",
        data(){
            return {
                form:[],
                courseid:'',
                editorOption: {
         theme: 'snow',
      boundary: document.body, 
      modules: {
        toolbar: [
          
        ],
            
      },
     
      },
            }
        },
        methods:{
            onEditorFocus(event) { 
        event.enable(false);
    }, // 获得焦点事件
            handleClick4(){
                this.courseid=this.$route.params.courseid
                let header={'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'}
               this.$axios({
							method:'put',
                            url:'api/v1/student/course',
                            headers:header,
							data:{
								'course':this.courseid,
                                
							
                        }})
                        .then((res)=>{
                            alert('选择成功')
     

                        }).catch((error) => {
        alert('错误');
          
		});
            }
        },
        created(){
            
            this.courseid=this.$route.params.courseid
            console.log(this.courseid)
        this.$axios({
            methods:'get',
            url:'api/v1/student/courses/'+this.courseid,
            params:{
            },
        headers:{

            'Authorization':localStorage.getItem('token'),
        }
        }).then((res)=>{    
            console.log(res.data)
            this.form=res.data

        }).catch((error) => {
            console.log(error)
            alert('错误')
          
		});	
        }
    }
</script>

<style >
.ql-editor{
        height:800px;
    }
.teacher-details{
    width:100%;
    height:100%;
    position:relative;
}

    .teacher-details-title{
        height: 50px;
      padding-left: 30px;
      border-bottom: 1px solid #ddd
    }
        .teacher-details-title-icon{
            float: left;
        width: 4px;
        height: 16px;
        margin-top: 18px;
        background-color: #00a1d6;
        border-radius: 4px;
        }
        .teacher-details-title-text{
             float: left;
        margin: 15px 0 0 5px;
        color: #00a1d6;
        font-size: 14px;
        cursor: default;
        line-height: 25px;
        }
    .teacher-details-form{
       width:80%;
        padding:20px;
    }
      .el-form{
        float: left;
        width:80%;
        text-align:left
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
    .teacher-details-choosebtn{
        width:100px;
        height:100px;
        position: relative;;
        float:right;
        bottom: -1180px;
        z-index:100;
        
    }
     .el-breadcrumb{
        line-height: 23px;
      }
  
</style>