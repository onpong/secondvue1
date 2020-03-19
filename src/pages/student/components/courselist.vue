<template>
  <div class="course">
      <div class="course-title">
        <span  class="course-title-icon"></span>
        <span  class="course-title-text">课程列表</span>
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
            prop="teacherName"
            label="教师姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ground"
            label="轮数">
          </el-table-column>
          <el-table-column
            prop="status"
            label="轮数状态"
            :formatter="formatSex">
          </el-table-column>
          <el-table-column
            prop="limit"
            label="上限人数">
          </el-table-column>
          <el-table-column
            prop="now"
            label="已选人数">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick2(scope.$index,scope.row)" type="text" size="small">查看课程详情</el-button>
              <el-button @click="handleClick3(scope.$index,scope.row)" type="text" size="small">选择此课程</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  </div>

      
</template>
<script >
    export default {
        name:"courselist",
        data(){
            return {
              tableData: []
                  
              
            }
        },
        methods: {
          formatSex: function (row, column) {
      return row.status === 0 ? '准备中' : row.status === 1 ? '进行中' : row.status === 2 ? '已结束':'未知'
},
          handleClick2(index,row){
                      this.id = row.CourseId;
                      const courseid = row.CourseId;
                      this.$router.push({name: "studentcourse", params: {courseid}});
          },
          handleClick3(index,row){
            
                      let header={'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'}
               this.$axios({
							method:'put',
                            url:'api/v1/student/course',
                            headers:header,
							data:{
								'course':row.CourseId,
                                
							
                        }})
                        .then((res)=>{
                            this.$message({
          message: '选择成功',
          type: 'success'
        });
     

                        }).catch((error) => {
                          if(row.status === 0){
                            this.$message({
          message: '本轮导师选择还未开始',
          type: 'warning'
        });
                          }
                          if(row.status === 2){
                            this.$message({
          message: '本轮导师选择已经结束',
          type: 'warning'
        });
                          }
                          else{
                            this.$message({
          message: '你已经被导师选择',
          type: 'warning'
        });
                          }


          
		});	
          }
     
    },
    created(){
      this.$axios({
            methods:'get',
            url:'api/v1/student/courses',
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
      width:90%;
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