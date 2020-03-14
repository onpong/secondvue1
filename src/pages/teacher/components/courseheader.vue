<template>
  <div class="course">
      <div class="course-title">
        <span  class="course-title-icon"></span>
        <span  class="course-title-text">分组列表</span>
      </div>
      <div class="course-table">
        <el-table
          :data="tableData"
          stripe
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
      </div>
  </div>

      
</template>
<script >
    export default {
        name:"courseheader",
        data(){
            return {
              tableData: []
                  
              
            }
        },
        methods: {
          handleClick(index,row){
                      this.id = row.id;
                      const groupid = row.id;
                      this.$router.push({name: "finishcourse", params: {groupid}});
          }
     
    },
    created(){
      this.$axios({
            methods:'get',
            url:'api/v1/teacher/groups',
        headers:{

            'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'
        }
        }).then((res)=>{    
            console.log(res.data)
            this.tableData=res.data

        }).catch((error) => {
            console.log(error)
            alert('错误')
          
		});	
    }
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
      padding:20px;
      line-height: 10px;
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
 
</style>