"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const employeesRoutes_1 = __importDefault(require("./routes/employeesRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const providersRoutes_1 = __importDefault(require("./routes/providersRoutes"));
const customersRoutes_1 = __importDefault(require("./routes/customersRoutes"));
const branchOfficesRoutes_1 = __importDefault(require("./routes/branchOfficesRoutes"));
const employmentsRoutes_1 = __importDefault(require("./routes/employmentsRoutes"));
const salesRoutes_1 = __importDefault(require("./routes/salesRoutes"));
const purchasesRoutes_1 = __importDefault(require("./routes/purchasesRoutes"));
const InventoryRoutes_1 = __importDefault(require("./routes/InventoryRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3030);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/employees', employeesRoutes_1.default);
        this.app.use('/api/products', productsRoutes_1.default);
        this.app.use('/api/providers', providersRoutes_1.default);
        this.app.use('/api/customers', customersRoutes_1.default);
        this.app.use('/api/branchoffice', branchOfficesRoutes_1.default);
        this.app.use('/api/employments', employmentsRoutes_1.default);
        this.app.use('/api/sales', salesRoutes_1.default);
        this.app.use('/api/purchases', purchasesRoutes_1.default);
        this.app.use('/api/inventory', InventoryRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ' + this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
