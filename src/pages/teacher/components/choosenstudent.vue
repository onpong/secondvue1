<template>  
    <div class="student-list">
           <div class="student-list-title">
                <span  class="student-list-title-icon"></span>
                <span  class="student-list-title-text">分组列表-已创建课程-学生列表-已选择学生</span>
                <ul class="nav">
                    <li class="nav-choosen">
                    <el-dropdown size="small" split-button  >
                        已选/未选
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item @click.native="gotochoosen">已选择学生</el-dropdown-item>
                            <el-dropdown-item @click.native="gotounchoosen">未选择学生</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </div>
           <div class="student-list-table">
                <el-table
                :data="list"
                tooltip-effect="dark"
                stripe
                style="width: 100%"
                >
                <el-table-column
                    prop="studentName"
                    label="学生姓名">
                </el-table-column>
                <el-table-column
                    prop="discipline"
                    label="专业">
                </el-table-column>
                 <el-table-column
                    prop="gender"
                    label="性别">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="searchdetails(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>
          </div>   
       </div>
       
</template>
<script >
    export default {
        name:"choosenstudent",
        data(){
            return {
              list:[

              ],
              
            }
        },
        methods:{
             searchdetails(index,row){
                      let courseid = this.$route.params.id;
                      let studentid = row.studentId
                      this.$router.push({name: "studentdetails", params: {courseid,studentid}});
          },
      gotounchoosen(){
          const courseid=this.$route.params.id
          this.$router.push({name:'studentlist',params:{courseid}})
      },
      gotochoosen(){
           this.$message('你已经处在已选择学生页面');
      }
          },
    created(){
        this.id=this.$route.params.id
        this.$axios({
            method:'get',
            url:'api/v1/teacher/courses/'+this.id+'/students',
            params:{
                round:1,
                page:0,
                size:20,
                 type:1
            },
        headers:{

            'Authorization':localStorage.getItem('token'),
        }
        }).then((res)=>{    
            console.log(res.data.students)
            this.list=res.data.students

        }).catch((error) => {
            console.log(error)
            alert('错误')
          
		});					
    }
    }
</script>

<style >
.student-list{
    width:100%;
    height:100%;
    position:relative;
}
    .student-list-title{
        height: 50px;
      padding-left: 30px;
      border-bottom: 1px solid #ddd
    }
        .student-list-title-icon{
            float: left;
        width: 4px;
        height: 16px;
        margin-top: 18px;
        background-color: #00a1d6;
        border-radius: 4px;
        }
        .student-list-title-text{
             float: left;
        margin: 15px 0 0 5px;
        color: #00a1d6;
        font-size: 14px;
        cursor: default;
        line-height: 25px;
        }
    .student-list-table{
       width:70%;
      padding:20px;
      line-height: 10px;
    }
    .nav{
        float: right;
    height: 100%;
    width:70%;
    line-height: 80px;
    background: transparent;
    padding: 0;
    margin: 0;
    list-style: none;
    }
    .nav-choosen{
        margin: 0;
        width:150px;
    float: right;
    list-style: none;
    position: relative;
    cursor: pointer;
    line-height: 50px;
    }
    
 
</style>