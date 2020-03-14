<template>
<div class="personal">
    <div class="personal-title">
        <span  class="personal-title-icon"></span>
        <span  class="personal-title-text">我的信息</span>
    </div>
    <div class="personal-form">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名" placeholder="请输入内容" >
                {{form.name}}
            </el-form-item>
            <el-form-item label="专业" >
                {{form.discipline}}
            </el-form-item>
            <el-form-item label="性别" >
                {{form.gender==1 ? "男":"女"}}
            </el-form-item>
            <el-form-item label="用户名" placeholder="请输入内容" >
                {{form.username}}
            </el-form-item>
            <el-form-item label="自我介绍">
                <el-input type="textarea" v-model="form.description" :rows="5"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save1" >立即保存</el-button>
            </el-form-item>
</el-form>
    </div>
</div>
</template>
<script >
    export default {
        name:"studentpersonal",
        data(){
            return {
              
                        form: {
                            description: '',
                           
                            },
                
            
            }
        },
         methods: {
         save1(){
                // 包装成list要求的对象
                //var p = {id:this.id, fleet_name: this.fleet_name,user_id:this.user_id,status:this.status, ctime: new Date()}
                //this.list.push(p);
                // 清空文本框中的数据
               let header={'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'}
               this.$axios({
							method:'put',
                            url:'api/v1/student',
                            headers:header,
							data:{
								'description':this.form.description,
							
                        }})
                        .then((res)=>{
                            alert('添加成功')
     

                        }).catch((error) => {
        alert('错误');
          console.log(header);
		});						
						
        },
    },
      created(){
        this.$axios({
            methods:'get',
            url:'api/v1/student',
        headers:{

            'Authorization':localStorage.getItem('token'),'Content-Type':'application/json'
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
<style scoped>
    .personal{
        width:100%;
        height:100%;
        position:relative;
    }
    .personal-title{
        height: 50px;
    padding-left: 30px;
    border-bottom: 1px solid #ddd
    }
        .el-form{
                text-align: left;

        }
        .personal-title-icon{
            float: left;
            width: 4px;
            height: 16px;
            margin-top: 18px;
            background-color: #00a1d6;
            border-radius: 4px;
        }
        .personal-title-text{
            float: left;
            margin: 15px 0 0 5px;
            color: #00a1d6;
            font-size: 14px;
            cursor: default;
            line-height: 25px;
        }
    .personal-form{
        width:50%;
        height:500px;
        padding:20px;
    }
    .el-form {
        height:500px
    }

    
   
    


</style>