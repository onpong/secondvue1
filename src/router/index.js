import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Teacher from '@/pages/teacher/Teacher'
import courseheader from '@/pages/teacher/components/courseheader'
import round1 from '@/pages/teacher/components/round1'
import round2 from '@/pages/teacher/components/round2'
import round3 from '@/pages/teacher/components/round3'
import finishcourse from '@/pages/teacher/components/finishcourse'
import showpersonal from '@/pages/teacher/components/showpersonal'
import changepic from '@/pages/teacher/components/changepic'
import Student from '@/pages/student/Student'
import studentpersonal from '@/pages/student/components/studentpersonal'
import studentcourse from '@/pages/student/components/studentcourse'
import courselist from '@/pages/student/components/courselist'
import choosencourse from '@/pages/student/components/choosencourse'
import choosenstudent from '@/pages/teacher/components/choosenstudent'
import studentdetails from '@/pages/teacher/components/studentdetails'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/teacher',
      name:'teacher',
      component:Teacher,
      children:[
          {
            path:'/showpersonal',
            name:'showpersonal',
            component:showpersonal,
          },
          {
            path:'/changepic',
            name:'changepic',
            component:changepic,
          },
          {path:'/choosenstudent/:id',
          name:'choosenstudent',
          component:choosenstudent,

          },
          {path:'/studentdetails//:ccourseid/:studentid/:round',
          name:'studentdetails',
          component:studentdetails,

          },
          
      {
        path:'/courseheader',
        name:'courseheader',
        component:courseheader,
      },
      {
        path:'/finishcourse/:groupid',
        name:'finishcourse',
        component:finishcourse,
      },
      {
        path:'/round1//:courseid/:round/:limit',
        name:'round1',
        component:round1,
        
      },
      {
        path:'/round2//:courseid/:round/:limit',
        name:'round2',
        component:round2,
        
      },
      {
        path:'/round3//:courseid/:round/:limit',
        name:'round3',
        component:round3,
        
      },
      
    ]
    },
    { path:'/Student',
    name:'Student',
    component:Student,
    children:[
        {
          path:'/studentpersonal',
          name:'studentpersonal',
          component:studentpersonal,
        },
        {
          path:'/courselist',
          name:'courselist',
          component:courselist,
        },
        {
          path:'/studentcourse/:courseid',
          name:'studentcourse',
          component:studentcourse,
          
        },
        {
          path:'/choosencourse',
          name:'choosencourse',
          component:choosencourse,
          
        }

        
      ]
    }

    

    /*{
      path:'/teacher',
      name:'teacher',
      components:{
        default:Teacher,
        main:personal,
        header:courseheader
      }
     
    }*/
  ]
});
  
export default router;