<template>
       <div class="student-details">
           <div class="student-details-title">
                <span  class="student-details-title-icon"></span>
                <span  class="student-details-title-text">课程列表-已创建课程-学生详情</span>
            </div>
           <div class="student-details-form">
                <el-form ref="form"  label-width="80px">
                          <el-form-item label="学生姓名:" placeholder="请输入内容" >
                              {{form.studentName}}
                          </el-form-item>
                          <el-form-item label="专业:" >
                              {{form.discipline}}
                          </el-form-item>
                          <el-form-item label="性别:" >
                              {{form.gender==1 ? "男":"女"}}
                          </el-form-item>
                          <el-form-item label="学院:" placeholder="请输入内容" >
                              {{form.academy}}
                          </el-form-item>
                          <el-form-item label="年级:" placeholder="请输入内容" >
                              {{form.grade}}
                          </el-form-item>
                          <el-form-item label="自我介绍:">
                              {{form.description}}
                          </el-form-item>
              </el-form>
          </div>
               
       </div>
</template>
<script >
    export default {
        name:"studentdetails",
        data(){
            return {
                form:[],
                
                
            }
        },
        methods:{
            
        },
        created(){
            this.studentid=this.$route.params.studentid
            this.scourseid=this.$route.params.ccourseid
        this.$axios({
            methods:'get',
            url:'api/v1/teacher/courses/'+this.scourseid+'/students/'+this.studentid,
            params:{
                round:this.$route.params.round,
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
.student-details{
    width:100%;
    height:100%;
    position:relative;
}

    .student-details-title{
        height: 50px;
      padding-left: 30px;
      border-bottom: 1px solid #ddd
    }
        .student-details-title-icon{
            float: left;
        width: 4px;
        height: 16px;
        margin-top: 18px;
        background-color: #00a1d6;
        border-radius: 4px;
        }
        .student-details-title-text{
             float: left;
        margin: 15px 0 0 5px;
        color: #00a1d6;
        font-size: 14px;
        cursor: default;
        line-height: 25px;
        }
    .student-details-form{
       width:50%;
        padding:20px;
    }
      .el-form{
        float: left;
      }
     
       
   
  
</style>