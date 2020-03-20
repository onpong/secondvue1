<template>
  <div class="course">
      <div class="course-title">
        <span  class="course-title-icon"></span>
        <span  class="course-title-text">学院与年级</span>
      </div>
      <div class="course-table"   >
        <el-table
        v-infinite-scroll="load" 
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance="0px"
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="academy"
            label="学院"
            width="180">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="年级"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ground"
            label="轮数">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">查看对应课程</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p v-if="loading">加载中...</p>
         <p v-if="noMore"></p>
      </div>
       <!--<el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" 
                :page-sizes="[4,8]" 
                :page-size="pagesize" 
                layout="total, sizes,prev, pager, next" 
                :total="size" 
                prev-text="上一页" 
                next-text="下一页">
            </el-pagination>-->
        
  </div>

      
</template>
<script >

    export default {
        name:"courseheader",
        data(){
            return {
              tableData: [],
              page:1,
              size:0,
              pagesize:8,
              loading: false,
              totalPages: "",//取后端返回内容的总页数
             
               
              
            }
        },

        created(){
    this.getmessage();
    },
        methods: {
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
           this.$axios({
            methods:'get',
            url:'api/v1/teacher/groups',
            params:{
              page:this.page,
              size:8,
            },
           
        headers:{

            'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'
        }
        }).then((res)=>{       
            this.tableData=this.tableData.concat(res.data.groups)
            this.totalPages = Math.ceil(res.data.count/8)
            this.loading = false;
            

        }).catch((error) => {
            console.log(error)
            alert('错误')
          
    });	
    },
          /*handleSizeChange: function(size) {
                this.pagesize = size;
                /*console.log(this.pagesize) 
            },
             handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage) 
            },*/
          handleClick(index,row){
                      this.id = row.id;
                      const groupid = row.id;
                      this.$router.push({name: "finishcourse", params: {groupid}});
          }
     
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
<style scoped>
  .course{
    width:100%;
    height:100%;
    position:relative;
  } 
    .course-title{
      height: 50px;
      padding-left: 30px;
      border-bottom: 1px solid #ddd
    }
    .course-table{
      width:70%;
      height:500px;
      padding:20px;
      line-height: 10px;
      overflow-y: auto;
      
    }
      .course-title-icon{
        float: left;
        width: 4px;
        height: 16px;
        margin-top: 18px;
        background-color: #00a1d6;
        border-radius: 4px;
      }
      .course-title-text{
        float: left;
        margin: 15px 0 0 5px;
        color: black;
        font-size: 14px;
        cursor: default;
        line-height: 25px;
      }
      /*.el-pagination{
        position: absolute;
        height:50px;
        bottom: 0px;
        left:400px;
        line-height:10px
      }
      .el-pager{
        height:50px;
        line-height:10px
      }*/
      
 
</style>