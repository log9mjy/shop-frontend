<template>
    <div>
        <div class="table-view">
            <el-table :data="tableData" style="width: 100%" align="center">
                <el-table-column prop="relation_no" label="卡号"></el-table-column>
                <el-table-column prop="pay_tpe_name" label="支付方式"></el-table-column>
                <el-table-column prop="money" label="金额"></el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
                <el-table-column prop="created_at" label="支付时间"></el-table-column>
                <el-table-column prop="audit_name" label="状态"></el-table-column>
            </el-table>
        </div>
        <el-pagination class="page" background layout="total,prev, pager, next" :total="total"
                       @current-change="currentChange"></el-pagination>
    </div>
</template>

<script>
    import {recharge_list} from "../../api/member";

    export default {
        name: "index",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNumber: 1,
                searchForm: {
                    name: '',
                    brand_id: '',
                    audit_status: '',
                    category: []
                },
                brandOptions: [],
                categoryOptions: [],
                auditOptions: [
                    {
                        "code": "1",

                        "name": "审核通过"
                    },
                    {
                        "code": "2",

                        "name": "待审核"

                    },
                    {
                        "code": "3",

                        "name": "已驳回"

                    }]
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                let params = {
                    page: this.pageNumber,
                };
                recharge_list(params).then(res => {
                    this.tableData = res.list;
                    this.total = res.data.count;
                })
            },
            currentChange(e) {
                this.pageNumber = e;
                this.getData();
            },
        }
    }
</script>

<style scoped>

</style>