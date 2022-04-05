<template>
    <div>
        <div class="table-view">
            <el-table :data="tableData" style="width: 100%" align="center">
                <el-table-column prop="relation_no" label="卡号"></el-table-column>
                <el-table-column prop="pay_tpe_name" label="支付方式"></el-table-column>
                <el-table-column prop="money" label="金额"></el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
                <el-table-column prop="pay_at" label="支付时间"></el-table-column>
                <el-table-column prop="audit_at" label="审核时间"></el-table-column>
                <el-table-column prop="audit_user" label="审核人"></el-table-column>
                <el-table-column prop="audit_name" label="状态"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="detail(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination class="page" background layout="total,prev, pager, next" :total="total"
                       @current-change="currentChange"></el-pagination>
        <el-dialog title="信息" :visible.sync="dialogVisible" width="400px" append-to-body>
            <div class="detail-item">
                <div>支付类型</div>
                <div>{{data.pay_tpe_name}}</div>
            </div>
            <div class="detail-item" v-if="data.pay_type===4">
                <div>银行</div>
                <div>{{data.bank_type_name}}</div>
            </div>
            <div class="detail-item">
                <div>金额</div>
                <div class="price">{{data.money}}</div>
            </div>
            <div class="detail-item">
                <div>创建时间</div>
                <div>{{data.created_at}}</div>
            </div>
            <div class="detail-item">
                <div>支付时间</div>
                <div>{{data.pay_at}}</div>
            </div>
            <div class="detail-item">
                <div>卡号</div>
                <div>{{data.relation_no}}</div>
            </div>
            <div class="detail-item">
                <div>支付凭证</div>
                <div>
                    <el-image class="file-image" v-for="item in data.file" :key="item" :src="item"
                              :preview-src-list="data.file" fit="cover" z-index="20000"></el-image>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" v-if="data.audit_name==='待审核'"
                           @click="verifyVisible=true">审 核</el-button>
            </span>
        </el-dialog>

        <el-dialog title="审核" :visible.sync="verifyVisible" width="400px" append-to-body>
            <el-radio-group v-model="verify">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="3">拒绝</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="save">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {recharge_list, recharge_verify} from "../../api/member";

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

                    }],
                dialogVisible: false,
                verifyVisible: false,
                data: {},
                verify: 1
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
            detail(data) {
                this.dialogVisible = true;
                this.data = data;
            },
            save() {
                recharge_verify({id: this.data.id, audit_status: this.verify}).then(() => {
                    this.$message.success("审核成功");
                    this.dialogVisible = false;
                    this.verifyVisible = false;
                })
            }
        }
    }
</script>

<style scoped>
    .detail-item {
        display: flex;
        margin-top: 10px;
    }

    .detail-item div:nth-child(1) {
        width: 80px;
    }

    .price {
        color: #ff4d51;
    }

    .price::before {
        content: '¥';
    }

    .file-image {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        margin-left: 5px;
        padding: 2px;
        border: 1px dashed #e9e9eb;
    }


</style>