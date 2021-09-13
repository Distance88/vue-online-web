
<template>
    <div class="ui container">
        <div class="my-table">
            <div class="ui container">
                <el-table
                    ref="multipleTable"
                    :data="examReviewList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    align="center"
                    stripe>
                    <el-table-column type="selection" width="55" > </el-table-column>
                    <el-table-column label="ID" prop="id" width="80" align="center"></el-table-column>
                    <el-table-column label="试卷名称" prop="examTitle"  width="240" align="center"></el-table-column>
                    <el-table-column label="单选题得分" prop="singleTotal"  width="160" align="center"></el-table-column>
                    <el-table-column label="填空题得分" prop="fillTotal"  width="160" align="center"></el-table-column>
                    <el-table-column label="应用题得分" prop="solveTotal"  width="160" align="center"></el-table-column>
                    <el-table-column label="试卷总分" prop="totalScore"  width="160" align="center"></el-table-column>
                    <el-table-column label="试卷状态" prop="status"  width="160" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.status === '未批阅'" @click="handleExamDetail(scope.row)" disabled>查看详情</el-button>
                        <el-button size="mini" v-if="scope.row.status === '已批阅'" @click="handleExamDetail(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <div class="ui container right aligned block" style="margin-top:20px">
                    <el-pagination
                    @current-change="getExamReviewByCondition"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.ui.container {
  width: 100%;
  padding: 20px;
  height: 100vh;
}
.my-search {
  height: 50px;
}
</style>
<script>
import examReviewApi from '@api/examReview'
export default {
  inject:['reload'],
  data() {
    return {
      condition:{
        status:'',
      },
      current:1,
      examReviewList: [],
      total:0,
      isByCondition:false
    };
  },
  methods: {
    getExamReviewByCondition(current){
      
      let params = this.$qs.stringify({
        studentId:JSON.parse(sessionStorage.getItem('student')).studentid,
        current:current
      })
      const _this = this
      examReviewApi.getExamReviewByCondition(params).then(req=>{
        _this.total = req.data.total
        _this.examReviewList = req.data.records
      })
    },
    handleExamDetail(row){
      let score = {
        status:row.status,
        fillScore: row.fillScore,
        solveScore: row.solveScore,
        totalScore: row.totalScore
      }
      this.$router.push({name:'detail',params:{id:row.id,examId:row.examId,score:score}})
    },
  },
  created() {
      this.getExamReviewByCondition(1)
  }
};
</script>