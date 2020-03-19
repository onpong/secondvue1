<template>
    <div class="choosencourse">
      <div class="choosencourse-title">
        <span  class="choosencourse-title-icon"></span>
        <span  class="choosencourse-title-text">已选择课程</span>
      </div>
      <div class="choosencourse-table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="teacherName"
            label="老师姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="rstatus"
            label="是否被选择"
            width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.rstatus == 1">是</span>
              <span v-if="scope.row.rstatus == 0">否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="round"
            label="轮数">
          </el-table-column>
          <el-table-column
            prop="limit"
            label="上限人数">
          </el-table-column>
          <el-table-column
            prop="now"
            label="已选人数">
          </el-table-column>

        </el-table>
      </div>
  </div>
</template>
<script>
export default {
    name:"choosencourse",
        data(){
            return {
              tableData: []
                  
              
            }
        },
        created(){
                let header={'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'}
               this.$axios({
							method:'get',
                            url:'api/v1/student/results',
                            headers:header,
							
								
                                
							
                        })
                        .then((res)=>{
                            console.log(res.data)
                            this.tableData=res.data
     

                        }).catch((error) => {
        
          
		});
        }
}
</script>
<style >
.choosencourse{
    width:100%;
    height:100%;
    position:relative;
  } 
    .choosencourse-title{
      height: 50px;
      padding-left: 30px;
      border-bottom: 1px solid #ddd
    }
    .choosencourse-table{
      width:50%;
      padding:20px;
      line-height: 10px;
    }
      .choosencourse-title-icon{
        float: left;
        width: 4px;
        height: 16px;
        margin-top: 18px;
        background-color: #00a1d6;
        border-radius: 4px;
      }
      .choosencourse-title-text{
        float: left;
        margin: 15px 0 0 5px;
        color: #00a1d6;
        font-size: 14px;
        cursor: default;
        line-height: 25px;
      }
</style>