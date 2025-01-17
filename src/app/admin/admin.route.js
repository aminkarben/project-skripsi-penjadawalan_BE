import { Router } from "express"
import * as adminSchema from "./admin.request.js"
import * as adminService from "./admin.service.js"
import * as usersSchema from "../users/users.request.js"
import * as usersService from "../users/users.service.js"
import { validateRequest } from "../../middleware/validate-request.js";

const route = Router()

route.get('/dashboard', adminService.getStatisticDashboard);
route.get('/guru', adminService.getAllGuru);
route.get('/siswa', adminService.getAllSiswa);
route.get('/kelas', adminService.getAllKelas);
route.patch('/kelas/:id/guru', validateRequest(adminSchema.addGuruToKelasSchema), adminService.addGuruToKelas);
route.post('/kelas/:id/jadwal', validateRequest(adminSchema.jadwalKelasSchema), adminService.createJadwalKelas);
route.put('/kelas/:id/jadwal', validateRequest(adminSchema.jadwalKelasSchema), adminService.updateJadwalKelas);
route.post('/kelas', validateRequest(adminSchema.createKelasSchema), adminService.createClass);
route.post('/guru/register/:role_id', validateRequest(usersSchema.createUserSchema), usersService.createUser);
route.post('/guru/mata-pelajaran', validateRequest(adminSchema.assignGuruToMataPelajaranSchema), adminService.assignGuruToMataPelajaran);

export default route    
