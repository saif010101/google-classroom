import { db } from "../utils/db.js";

class ClassService {
    async getClasses() {
        return await db.query(`select t1.role,t1.class_code,t1.class_name, t1.section, t2.teacher_name from 
                          (select e.role,c.class_code, c.name as class_name, c.section 
                          from enrollment as e inner join classes as c
                          on c.class_code = e.class_code where e.user_id = 2) as t1
                          inner join
                          (select e.class_code,u.first_name || ' ' || u.last_name as teacher_name 
                          from users u inner join enrollment e
                          on u.user_id = e.user_id where e.role = 'teacher') as t2
                          on t1.class_code = t2.class_code`)
    }
}




export default new ClassService()