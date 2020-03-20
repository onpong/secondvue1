<template>
       <div class="student-list">
           <div class="student-list-title">
                <span  class="student-list-title-icon"></span>
                <span  class="student-list-title-text">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/courseheader' }">学院年级</el-breadcrumb-item>
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
                v-infinite-scroll="load" 
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance="0px"
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
           <p v-if="loading">加载中...</p>
         <p v-if="noMore"></p>
       </div>
</template>
<script >
    export default {
        name:"round3",
        data(){
            return {
                list:[],
                multipleSelection:[],
              page:1,
              size:0,
              loading: false,
              totalPages: "",//取后端返回内容的总页数
                
            }
        },
        created(){
            
            this.getmessage();
        },
        methods:{
         
          handleClick(index,row){
                      this.id = row.id;
                      const groupid = row.id;
                      this.$router.push({name: "finishcourse", params: {groupid}});
          },
     
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
            gotounchoosen(){    
                this.$message('你已经处在未选择学生页面');
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
     load() {
      //滑到底部时进行加载
      this.loading = true;
      setTimeout(() => {
        this.page += 1; //页数+1
        this.getmessage(); //调用接口，此时页数+1，查询下一页数据
        console.log('hello')
      }, 2000);
    },
         getmessage(){ 
           this.courseid=this.$route.params.courseid
        this.$axios({
            method:'get',
            url:'api/v1/teacher/courses/'+this.courseid+'/students',
            params:{
                page:this.page,
                size:8,
                round:3,
                type:0
            },
        headers:{

            'Authorization':localStorage.getItem('token'),
        }
        }).then((res)=>{
            this.list=this.list.concat(res.data.students)
            this.totalPages = Math.ceil(res.data.count/8)
            this.loading = false;
            console.log(this.totalPages)

        }).catch((error) => {
            console.log(error)
            alert('暂无数据')
          
		});	
    },
        
        },
       
        computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      
      return this.page >= this.totalPages
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
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
       height:500px;
      padding:20px;
      line-height: 10px;
      overflow-y: auto;
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
   .el-pagination{
        position: absolute;
        height:50px;
        bottom: 0px;
        left:400px;
        line-height:10px
      }
      .el-pager{
        height:50px;
        line-height:10px
      }
    
    
  
</style>