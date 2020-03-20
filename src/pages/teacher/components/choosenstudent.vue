<template>  
    <div class="student-list">
           <div class="student-list-title">
                <span  class="student-list-title-icon"></span>
                <span  class="student-list-title-text">学院年级-分组列表-学生列表-已选择学生</span>
                <ul class="nav">
                    <li class="nav-choosen">
                   <!-- <el-dropdown size="small" split-button  >
                        返回选择页面
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item @click.native="gotoroun1">返回第一轮选择页面</el-dropdown-item>
                            <el-dropdown-item @click.native="gotoroun2">返回第二轮选择页面</el-dropdown-item>
                            <el-dropdown-item @click.native="gotoroun3">返回第三轮选择页面</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>-->
                        <el-select  placeholder="返回选择页面">
                            <el-option label="返回第一轮选择页面" value="roun1" @click.native="gotoroun1"></el-option>
                            <el-option label="返回第二轮选择页面" value="roun2" @click.native="gotoroun2"></el-option>
                            <el-option label="返回第三轮选择页面" value="roun3" @click.native="gotoroun3"></el-option>
                        </el-select>
                    </li>
                </ul>
            </div>
           <div class="student-list-table">
                <el-table
                v-infinite-scroll="load" 
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance="0px"
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
        name:"choosenstudent",
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
           this.id=this.$route.params.id
        this.$axios({
            method:'get',
            url:'api/v1/teacher/courses/'+this.id+'/students',
            params:{
                page:this.page,
                size:2,
                 type:1
            },
        headers:{

            'Authorization':localStorage.getItem('token'),
        }
        }).then((res)=>{    

            this.list=this.list.concat(res.data.students)
            this.totalPages = Math.ceil(res.data.count/2)
            this.loading = false;
            console.log(this.totalPages)

        }).catch((error) => {
            console.log(error)
            alert('错误')
          
		});		
    },
             handleSizeChange: function(size) {
                this.pagesize = size;
                /*console.log(this.pagesize) */
            },
             handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
                /*console.log(this.currentPage) */
            },
             searchdetails(index,row){
                      let ccourseid = this.$route.params.id;
                      let studentid = row.studentId
                      let round =row.round
                      this.$router.push({name: "studentdetails", params: {ccourseid,studentid,round}});
          },
      gotoroun1(){
          const courseid=this.$route.params.id
          this.$router.push({name:'round1',params:{courseid}})
      },
      gotoroun2(){
          const courseid=this.$route.params.id
          this.$router.push({name:'round2',params:{courseid}})
      },
      gotoroun3(){
          const courseid=this.$route.params.id
          this.$router.push({name:'round3',params:{courseid}})
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