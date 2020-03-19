<template>
       <div class="student-list">
           <div class="student-list-title">
                <span  class="student-list-title-icon"></span>
                <span  class="student-list-title-text">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/courseheader' }">学院年级</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/finishcourse/:groupid' }">分组列表</el-breadcrumb-item>
                        <el-breadcrumb-item >学生列表</el-breadcrumb-item>
                        <el-breadcrumb-item >未选择学生</el-breadcrumb-item>
                    </el-breadcrumb>
                </span>
                <ul class="nav">
                    <li class="nav-save">
                        <el-button @click="speedupCheckbox" size="small">确认选择</el-button>
                    </li>
                    <li class="nav-choosen">
                    <el-button @click="handleClick1"  size="small">查看已选择学生</el-button>
                    </li>
                </ul>
            </div>
           <div class="student-list-table">
                <el-table
                ref="multipleTable"
                :data="list"
                tooltip-effect="dark"
                stripe
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                    type="selection"
                    width="55"
                    v-model="multipleSelection">
                </el-table-column>
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
                <el-table-column
                    prop="round"
                    label="轮数">
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
        name:"round2",
        data(){
            return {
                list:[],
                multipleSelection:[],
                
                
            }
        },
        methods:{
             searchdetails(index,row){
                      let ccourseid = this.$route.params.courseid;
                      let studentid = row.studentId
                      let round = row.round
                      this.$router.push({name: "studentdetails", params: {ccourseid,studentid,round}});
          },
            handleClick1(){
                let id=this.$route.params.courseid
                this.$router.push({name:'choosenstudent', params: {id}})
            },
           handleSelectionChange(val) {
            this.multipleSelection = val;
            },

            speedupData(){
        var arr=this.multipleSelection;
        let multis = [];
        for (var i=0;i<arr.length;i++){
        multis.push(arr[i].studentId);
        console.log(multis)
    }
//以上为将数组中key值为id的数据遍历出来，然后，将所得到的数据传入mutis数组中，最后将multis数据提交至后端
     var url = 'api/v1/teacher/course/student';
     let header={'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'}
     this.$axios({
         method:'put',
         url:url,
         headers:header,
        data:{
            'round':this.$route.params.round,
            'course':this.$route.params.courseid,
            'students':multis   
        }
        }).then(rs=>{
            if(multis.length!==null){
                this.$message.success("操作成功")
            }else{
                this.$message.error("操作失败")
            }
            console.log(rs);
            this.$refs.multipleTable.clearSelection(); //操作完成清除勾选框
            }).catch((error) => {
            console.log(error)
            alert('')
          
		});	
                   
        },
//全速选择框
    speedupCheckbox() {
        if (this.multipleSelection.length === 0) {
            this.$message({
                message: '请至少勾选一项，再进行操作',
                type: 'warning'
            });
        } 
        if (this.list.length <<this.$route.params.limit) {
            if(this.multipleSelection.length <this.list.length){
            this.$message({
                message: '未满规定人数，请全选',
                type: 'warning'
            });
            }
        } 
        if (this.list.length >=this.$route.params.limit) {
            if(this.multipleSelection.length <this.list.length){
            this.$message({
                message: '未满规定人数，请选满至规定人数',
                type: 'warning'
            });
            }
        } 
        else {
            this.speedupData();
        }
    },
        
        },
        created(){
            
            this.courseid=this.$route.params.courseid
        this.$axios({
            method:'get',
            url:'api/v1/teacher/courses/'+this.courseid+'/students',
            params:{
                round:2,
                page:0,
                size:20,
                type:0
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
    width:50%;
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
    .nav-save{
        margin: 0;
        width:150px;
    float: right;
    list-style: none;
    position: relative;
    cursor: pointer;
    line-height: 50px;
    }
   
    
    
  
</style>